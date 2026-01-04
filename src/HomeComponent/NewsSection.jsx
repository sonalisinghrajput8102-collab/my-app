import React from 'react';

const NewsSection = () => {
  const highlights = [
    {
      title: "State-of-the-Art Infrastructure",
      text: "Modern architecture with cutting-edge diagnostic tools, advanced operation theaters, and the latest medical equipment for precise and effective care.",
      image: "../../public/assest/image/New1.webp"
    },
    {
      title: "Expert & Compassionate Team",
      text: "Highly qualified doctors, specialists, and caring nursing staff who treat every patient like family, ensuring personalized and empathetic treatment.",
      image: "../../public/assest/image/New6.jpg"
    },
    {
      title: "Serene Healing Environment",
      text: "Spacious, hygienic, and peacefully designed patient rooms with natural light and modern amenities to promote comfort and faster recovery.",
      image: "../../public/assest/image/New2.webp"
    },
    {
      title: "Advanced Treatment Technology",
      text: "From robotic surgery to high-precision imaging and laser therapies – we bring global-standard medical innovations right to you.",
      image: "../../public/assest/image/New3.jpg"
    },
    {
      title: "24/7 Emergency Care",
      text: "Round-the-clock emergency services with dedicated ICU, trauma team, and swift response to handle any critical situation with expertise.",
      image: "../../public/assest/image/New4.webp"
    },
    {
      title: "Trusted by Thousands",
      text: "Countless success stories, grateful patients, and years of excellence that have built unbreakable trust in our commitment to your health.",
      image: "../../public/assest/image/New5.jpeg"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Elegant Heading */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Experience Healthcare <span className="text-[#0B717A]">Redefined</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Where innovation, compassion, and trust come together to deliver exceptional care.
          </p>
          <div className="w-40 h-1.5 bg-gradient-to-r from-[#0B717A] to-teal-600 mx-auto mt-10 rounded-full"></div>
        </div>

        {/* Alternating Highlights with Zoom In Animation */}
        <div className="space-y-40">
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-16 lg:gap-28 zoom-in-animation`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-3xl group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition duration-1000 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-4xl md:text-5xl font-bold text-[#0B717A] mb-8 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xl md:text-2xl text-gray-700 leading-loose">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA */}
        <div className="text-center mt-32">
          <button className="px-14 py-6 bg-[#0B717A] text-white text-xl font-semibold rounded-full shadow-3xl hover:bg-[#094d53] hover:shadow-4xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
            Start Your Healing Journey Today
          </button>
        </div>
      </div>

      {/* Zoom In Animation CSS */}
      <style>{`
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(60px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .zoom-in-animation {
          opacity: 0;
          animation: zoomIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </section>
  );
};

export default NewsSection;