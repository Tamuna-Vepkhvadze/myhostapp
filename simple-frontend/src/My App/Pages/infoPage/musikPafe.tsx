const MusicContent = () => {
  const contentItems = [
    {
      image: "https://images.pexels.com/photos/164660/pexels-photo-164660.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Uplift Your Mood",
      description: "Listening to music boosts your mood, reduces stress, and sparks joy. Play your favorite tunes today!",
    },
    {
      image: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Enhance Creativity",
      description: "Music inspires creativity and focus. Let the rhythm guide your day with energy and inspiration!",
    },
  ];

  return (
    <div className="pt-10 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Main Content Section */}
      <div className="mt-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Listen to Music
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Music is a powerful way to uplift your spirit, boost creativity, and find calm. 
          Incorporate listening to your favorite songs into your daily routine for a happier you!
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
              Make Music a Habit
            </h3>
            <p className="text-gray-600 mt-2">
              Take a moment each day to listen to music. It’s a simple way to stay inspired, relaxed, and energized!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicContent;