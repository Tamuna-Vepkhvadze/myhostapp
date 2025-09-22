import { useState, useEffect } from "react";

const CookingFun = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    "https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg",
    "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  ];

  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    // პირველად შემთხვევითი ფონური სურათი
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBgImage(backgroundImages[randomIndex]);

    const interval = setInterval(() => {
      let newIndex: number;
      do {
        newIndex = Math.floor(Math.random() * backgroundImages.length);
      } while (backgroundImages[newIndex] === bgImage);
      setBgImage(backgroundImages[newIndex]);
    }, 15000); // 15 წამში ერთხელ შეცვლა

    return () => clearInterval(interval);
  }, [bgImage]);

  const contentItems = [
    {
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      title: "Easy Breakfasts",
      description:
        "Kickstart your morning with simple and fun breakfast recipes. From smoothies to pancakes, make mornings delicious!",
    },
    {
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      title: "Healthy Snacks",
      description:
        "Prepare tasty snacks that are good for your body and fun to make. Perfect for kids, adults, or a quick energy boost.",
    },
    {
      image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      title: "Dinner Ideas",
      description:
        "Explore creative dinner recipes that are easy, fun, and full of flavor. Cooking at home has never been more enjoyable!",
    },
  ];

  return (
    <div
      className="pt-10 min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-6">
          Cooking Fun
        </h1>
        <p className="text-lg text-gray-200 text-center max-w-3xl mx-auto mb-16">
          Cooking can be fun, creative, and rewarding! Explore easy recipes,
          tasty snacks, and colorful meals that make your time in the kitchen
          enjoyable. Discover new flavors and share delicious moments with
          family and friends.
        </p>

        {/* ქარდების განლაგება */}
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
            Make Cooking a Daily Fun
          </h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Try new recipes every day, experiment with flavors, and enjoy the
            process of creating meals. Cooking is not just about eating — it's
            about having fun, being creative, and sharing delicious moments
            with loved ones.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookingFun;
