const StretchingContent = () => {
  const contentItems = [
    {
      image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Increase Flexibility",
      description: "Regular stretching improves flexibility, reduces muscle tension, and enhances mobility. Start your day with a stretch!",
    },
    {
      image: "https://images.pexels.com/photos/4498600/pexels-photo-4498600.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Relieve Stress",
      description: "Stretching relaxes your body and mind, easing stress and promoting a sense of calm. Make it a daily ritual!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Main Content Section */}
      <div className="mt-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Stretch Your Body
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Stretching is a simple way to boost flexibility, relieve tension, and feel refreshed. 
          Incorporate short stretching sessions into your day for a healthier, happier you!
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
              Make Stretching a Habit
            </h3>
            <p className="text-gray-600 mt-2">
              Take a few minutes each day to stretch your body. It’s an easy way to stay flexible, relaxed, and energized!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StretchingContent;