import { useState, useEffect } from "react";

const ReadingHourContent = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/374720/pexels-photo-374720.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
  ];

  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    // თავდაპირველი შემთხვევითი ფონური სურათი
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBgImage(backgroundImages[randomIndex]);

    // 5 წამში ერთხელ სურათის შეცვლა
    const interval = setInterval(() => {
      let newIndex: number;
      do {
        newIndex = Math.floor(Math.random() * backgroundImages.length);
      } while (backgroundImages[newIndex] === bgImage);
      setBgImage(backgroundImages[newIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [bgImage]);

  const contentItems = [
    {
      image: "https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
      title: "Spark Imagination",
      description:
        "Dive into a new book to ignite your creativity and explore endless worlds. Reading fuels your imagination and opens new perspectives.",
    },
    {
      image: "https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Find Relaxation",
      description:
        "A reading hour offers a peaceful escape, reducing stress and calming the mind. Lose yourself in a story to unwind and recharge.",
    },
    {
      image: "https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
      title: "Expand Knowledge",
      description:
        "Books are gateways to learning, offering insights and wisdom. Discover new ideas and grow with every page you turn.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-6">
          Reading Hour
        </h1>
        <p className="text-lg text-gray-200 text-center max-w-3xl mx-auto mb-16">
          A reading hour is a gift to yourself — a moment to explore new worlds, 
          gain knowledge, and find calm. Whether you’re diving into fiction, 
          non-fiction, or poetry, reading enriches your mind and soul. 
          Discover a new book and let it transform your perspective.
        </p>

        {/* ქარდები */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {contentItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mt-3">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800">
            Make Reading a Daily Ritual
          </h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Set aside 15–30 minutes each day to read a book that inspires you. 
            Create a cozy space, sip a warm drink, and let the pages transport you. 
            Reading isn’t just about finishing a book — it’s about savoring the journey 
            and enriching your life with every story or idea you encounter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReadingHourContent;
