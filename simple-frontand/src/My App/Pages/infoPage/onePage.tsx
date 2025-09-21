

const HydrationContent = () => {
  const contentItems = [
    {
      image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Stay Hydrated, Stay Vibrant",
      description: "Drinking water every hour boosts your energy, improves focus, and keeps your body functioning at its best. Make hydration a habit!",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Hydration for Health",
      description: "Regular water intake supports digestion, enhances skin health, and promotes overall well-being. Sip water throughout the day!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Main Content Section */}
      <div className="mt-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Drink Water Every Hour
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Water is the essence of life. Drinking water every hour keeps you energized, focused, and healthy. 
          Discover why this simple habit can transform your daily routine and stay motivated!
        </p>

        {/* Content Items with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {contentItems.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-70 p-4 flex flex-col justify-center items-center rounded-b-2xl">
                <h3 className="text-xl font-bold text-white text-center">
                  {item.title}
                </h3>
                <p className="text-sm text-white text-center mt-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Static Content Section */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg text-center">
            <h3 className="text-lg font-bold text-gray-800">
              Make Hydration a Habit
            </h3>
            <p className="text-gray-600 mt-2">
              Set a reminder to drink a glass of water every hour. Your body will thank you with more energy, better focus, and glowing health!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HydrationContent;