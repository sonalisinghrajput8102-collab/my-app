// server.js
import express from "express";
import cors from "cors";
import crypto from "crypto";
import Razorpay from "razorpay";

const app = express();

app.use(cors());
app.use(express.json());

// Apna Razorpay test key-secret yahan daal do (dashboard se)
const razorpay = new Razorpay({
    key_id: "rzp_test_XXXXXXXXXXXX", // ← apna daalo
    key_secret: "YOUR_SECRET_KEY_HERE", // ← apna daalo
});

app.post("/api/create-razorpay-order", async(req, res) => {
    try {
        const { amount, currency = "INR", receipt } = req.body;

        const order = await razorpay.orders.create({
            amount, // paise mein (example: 325000 for ₹3250)
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
        });

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Order creation failed" });
    }
});

// Optional: Payment verification (security ke liye baad mein proper add karna)
app.post("/api/verify-payment", (req, res) => {
    res.json({ success: true }); // temporary
});

// Zego Token Generation
const ZEGO_APP_ID = 724789503; // Same as in VideoCall.jsx
const ZEGO_APP_SIGN = "YOUR_ZEGO_APP_SIGN_HERE"; // Replace with your actual app sign from Zego console

function generateZegoToken(userID, roomID) {
    const appId = ZEGO_APP_ID;
    const serverSecret = ZEGO_APP_SIGN;
    const effectiveTimeInSeconds = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const expireTimeInSeconds = effectiveTimeInSeconds + 3600; // Token expires in 1 hour

    // Create payload
    const payload = {
        app_id: appId,
        user_id: userID,
        room_id: roomID,
        privilege: {
            1: 1, // Login room
            2: 1 // Publish stream
        },
        expire_time: expireTimeInSeconds,
        nonce: Math.floor(Math.random() * 2147483647)
    };

    // Convert payload to JSON string
    const payloadStr = JSON.stringify(payload);

    // Create signature
    const signature = crypto.createHmac('sha256', serverSecret).update(payloadStr).digest('hex');

    // Create token
    const token = {
        version: 4,
        signature: signature,
        payload: payload
    };

    return {
        token: btoa(JSON.stringify(token)),
        expire_time: expireTimeInSeconds
    };
}

app.post("/api/zego-token", (req, res) => {
    try {
        const { userID, roomID } = req.body;

        if (!userID || !roomID) {
            return res.status(400).json({ error: "userID and roomID are required" });
        }

        const tokenData = generateZegoToken(userID, roomID);
        res.json(tokenData);
    } catch (error) {
        console.error("Token generation failed:", error);
        res.status(500).json({ error: "Token generation failed" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});