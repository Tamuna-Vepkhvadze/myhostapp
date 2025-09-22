const BreathingContent = () => {
  const contentItems = [
    {
      image: "https://images.pexels.com/photos/3822773/pexels-photo-3822773.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Calm Your Mind",
      description: "Deep breathing reduces stress, promotes relaxation, and restores inner peace. Take a moment to breathe deeply!",
    },
    {
      image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Enhance Focus",
      description: "Regular deep breathing improves concentration and mental clarity. Practice it to stay centered throughout the day!",
    },
  ];

  return (
    <div className="pt-10 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Main Content Section */}
      <div className="mt-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Practice Deep Breathing
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Deep breathing is a simple yet powerful way to reduce stress, improve focus, and boost your well-being. 
          Incorporate it into your daily routine to feel calm and centered!
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
              Make Deep Breathing a Habit
            </h3>
            <p className="text-gray-600 mt-2">
              Take a few moments each hour to practice deep breathing. It’s a simple way to stay calm, focused, and energized!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingContent;