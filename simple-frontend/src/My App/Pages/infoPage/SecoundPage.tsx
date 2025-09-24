const WalkingContent = () => {
  const contentItems = [
    {
      image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Boost Your Mood",
      description: "A 5-minute walk can lift your spirits, reduce stress, and spark creativity. Step outside and feel the difference!",
    },
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      title: "Energize Your Day",
      description: "Short walks improve circulation, boost energy, and keep you active. Make it a daily habit!",
    },
  ];

  return (
    <div className="pt-10 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Main Content Section */}
      <div className="mt-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Take a 5-Minute Walk
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          A quick 5-minute walk can transform your day. It refreshes your mind, energizes your body, 
          and connects you with the world around you. Make short walks a part of your routine!
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
              Make Walking a Habit
            </h3>
            <p className="text-gray-600 mt-2">
              Take a 5-minute walk every few hours to stay active and refreshed. Your body and mind will thank you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkingContent;