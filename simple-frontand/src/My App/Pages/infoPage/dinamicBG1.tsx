import { useState, useEffect } from "react";

const YogaSessiondinamic = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/4325470/pexels-photo-4325470.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/4325466/pexels-photo-4325466.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/3822816/pexels-photo-3822816.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/3823032/pexels-photo-3823032.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/3823035/pexels-photo-3823035.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/3823060/pexels-photo-3823060.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
  ];

  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    // თავიდან შემთხვევითი ფონური სურათი
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBgImage(backgroundImages[randomIndex]);

    // 15–20 წამში ერთხელ ფოტოს შეცვლა
    const interval = setInterval(() => {
      let newIndex: number;
      do {
        newIndex = Math.floor(Math.random() * backgroundImages.length);
      } while (backgroundImages[newIndex] === bgImage); // ძველი სურათი აღარ გაიმეოროს
      setBgImage(backgroundImages[newIndex]);
    }, 5000); // 17 წამი (შედეგი ~15–20 ს)

    return () => clearInterval(interval);
  }, [bgImage]);

  const contentItems = [
    {
      image:
        "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Morning Flow",
      description:
        "Start your day with a gentle yoga flow to awaken your body, clear your mind, and set a positive tone for the rest of the day.",
    },
    {
      image:
        "https://images.pexels.com/photos/4325466/pexels-photo-4325466.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Stress Relief",
      description:
        "Deep breathing and mindful poses help release tension from the body and reduce stress. Yoga provides balance for both body and mind.",
    },
    {
      image:
        "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Strength & Balance",
      description:
        "Build core strength and improve balance through steady postures. Consistent practice enhances both physical and inner stability.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-6">
          Yoga Session
        </h1>
        <p className="text-lg text-gray-200 text-center max-w-3xl mx-auto mb-16">
          Yoga is more than just exercise — it’s a practice that unites body,
          mind, and spirit. Whether you’re seeking flexibility, relaxation, or
          strength, yoga provides a pathway to balance and inner peace.
          Discover how just a few minutes of daily practice can completely
          transform your energy.
        </p>

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
                <h3 className="text-2xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-3">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Your Daily Practice
          </h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Begin with short sessions of 10–15 minutes each day. Focus on your
            breath and move gently between poses. Over time, increase your
            practice to deepen flexibility, strength, and mindfulness. Yoga is
            not about perfection — it’s about connecting with yourself and
            embracing the journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default YogaSessiondinamic;
