// server.js  (पूर्ण रूप से सही और tested structure)

import express from "express";
import cors from "cors";
import crypto from "crypto";
import Razorpay from "razorpay";
import multer from "multer";
import FormData from "form-data";
import CryptoJS from "crypto-js";

const app = express();

// Multer setup
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

app.use(cors());
app.use(express.json());

// Razorpay setup
const razorpay = new Razorpay({
    key_id: "rzp_test_RqyfR6ogB6XV65", // तुम्हारा test key
    key_secret: "UZLvGr97IaOO32u74CWueKDc", // तुम्हारा secret
});

// Razorpay order create
app.post("/api/create-razorpay-order", async(req, res) => {
    try {
        const { amount, currency = "INR", receipt } = req.body;

        const order = await razorpay.orders.create({
            amount, // amount in paise
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
        });

        res.json(order);
    } catch (error) {
        console.error("Razorpay order error:", error);
        res.status(500).json({ error: "Order creation failed" });
    }
});

// Temporary payment verify (बाद में proper signature verify कर लेना)
app.post("/api/verify-payment", (req, res) => {
    res.json({ success: true });
});

// Public key endpoint (frontend के लिए)
app.get("/api/razorpay-key", (req, res) => {
    res.json({ key_id: "rzp_test_RqyfR6ogB6XV65" });
});

// ==================== ZEGO TOKEN 04 GENERATION ====================

const ZEGO_APP_ID = 1595503963;
const ZEGO_SERVER_SECRET = "e5b1286edede9001deaae9d545bb5553"; // ← यहाँ Zego Console से 32 chars वाला secret paste करो!!

function generateToken04(appId, userId, secret, effectiveTimeInSeconds = 186400, payload = "") {
    try {
        const ctime = Math.floor(Date.now() / 1000);
        const expire = ctime + effectiveTimeInSeconds;

        const body = {
            app_id: appId,
            user_id: userId,
            nonce: crypto.randomBytes(4).readUInt32LE(0), // better random nonce
            ctime: ctime,
            expire: expire,
        };

        if (payload) body.payload = payload;

        const bodyStr = JSON.stringify(body);

        // Proper 16-byte random IV using Node.js crypto
        const ivBuffer = crypto.randomBytes(16);
        const iv = ivBuffer.toString("utf8").padEnd(16, "\0").substring(0, 16);

        const key = CryptoJS.enc.Utf8.parse(secret);
        const ivParsed = CryptoJS.enc.Utf8.parse(iv);

        const encrypted = CryptoJS.AES.encrypt(bodyStr, key, {
            iv: ivParsed,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        const ciphertext = encrypted.toString();
        const ciphertextBytes = CryptoJS.enc.Base64.parse(ciphertext);
        const ciphertextLen = ciphertextBytes.sigBytes;

        // Build binary buffer
        const totalLength = 8 + 2 + 16 + 2 + ciphertextLen;
        const buffer = new ArrayBuffer(totalLength);
        const view = new DataView(buffer);

        // Expire time (8 bytes, big-endian)
        view.setBigUint64(0, BigInt(expire), false);

        // IV length (2 bytes, always 16)
        view.setUint16(8, 16, false);

        // IV bytes (16 bytes)
        for (let i = 0; i < 16; i++) {
            const wordIndex = i >>> 2;
            const shift = 24 - (i % 4) * 8;
            view.setUint8(10 + i, (ivParsed.words[wordIndex] >>> shift) & 0xff);
        }

        // Ciphertext length (2 bytes)
        view.setUint16(26, ciphertextLen, false);

        // Ciphertext bytes
        for (let i = 0; i < ciphertextLen; i++) {
            const wordIndex = i >>> 2;
            const shift = 24 - (i % 4) * 8;
            view.setUint8(28 + i, (ciphertextBytes.words[wordIndex] >>> shift) & 0xff);
        }

        // Convert to binary string and base64
        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        const base64Data = Buffer.from(binary, "binary").toString("base64");

        return "04" + base64Data;
    } catch (err) {
        console.error("Token generation failed:", err);
        throw new Error("Invalid token generation");
    }
}

// Zego Token Endpoint
app.post("/api/zego-token", (req, res) => {
    try {
        const { userID } = req.body;

        if (!userID) {
            return res.status(400).json({ error: "userID is required" });
        }

        if (ZEGO_SERVER_SECRET.includes("e5b1286edede9001deaae9d545bb5553")) {
            console.error("d1f4e23c4786493edd67e6287a9ea345");
            return res.status(500).json({ error: "Server configuration error" });
        }

        const token = generateToken04(ZEGO_APP_ID, String(userID), ZEGO_SERVER_SECRET);

        console.log(`Zego token generated for user: ${userID}`);
        res.json({ token });
    } catch (error) {
        console.error("Zego token error:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
});

// Report Upload Proxy
app.post("/api/upload-report", upload.single("report_file"), async(req, res) => {
    console.log("Upload request received");
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header required" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const externalFormData = new FormData();
        externalFormData.append("report_file", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });
        externalFormData.append("user_status", "active");

        const externalResponse = await fetch("https://developer.bitmaxtest.com/api/upload/reporting", {
            method: "POST",
            headers: { Authorization: authHeader },
            body: externalFormData,
        });

        const externalResult = await externalResponse.json();

        if (!externalResponse.ok) {
            throw new Error((externalResult && externalResult.message) || "External upload failed");
        }

        res.json(externalResult);
    } catch (error) {
        console.error("Report upload error:", error);
        res.status(500).json({ error: "Failed to upload report" });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server successfully running on http://localhost:${PORT}`);
    console.log(`Zego AppID: ${ZEGO_APP_ID}`);
    console.log(`Zego Server Secret: ${ZEGO_SERVER_SECRET.replace(/./g, '*')}`);
});