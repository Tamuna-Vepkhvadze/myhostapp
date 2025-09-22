const NapContent = () => {
  const contentItems = [
    {
      image: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Recharge Your Energy",
      description: "A short nap boosts energy, improves focus, and refreshes your mind. Take a quick rest to power through your day!",
    },
    {
      image: "https://images.pexels.com/photos/935985/pexels-photo-935985.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      title: "Reduce Stress",
      description: "Napping soothes your mind and body, reducing stress and promoting calm. Make time for a brief nap daily!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Main Content Section */}
      <div className="mt-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Take a Short Nap
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          A short nap is a powerful way to recharge, reduce stress, and boost productivity. 
          Incorporate brief naps into your day for a refreshed and energized you!
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
              Make Napping a Habit
            </h3>
            <p className="text-gray-600 mt-2">
              Take a 10-20 minute nap each day to recharge your energy and stay focused. It’s a simple way to feel refreshed!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NapContent;
