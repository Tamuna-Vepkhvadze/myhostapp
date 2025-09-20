

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex flex-col items-center p-8">
      
      {/* Hero Section */}
      <div className="w-full max-w-5xl text-center py-16">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 drop-shadow-lg">
          Welcome to FunZone!
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Discover daily tips, fun activities, and interactive content curated just for you.
          Stay entertained, learn something new, and enjoy every moment.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all">
            Explore Tips
          </button>
          <button className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-all">
            Fun Activities
          </button>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold text-indigo-600 mb-2">Daily Tips</h3>
          <p className="text-gray-600">Stay hydrated, stretch, and take small breaks to keep your mind fresh.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold text-pink-500 mb-2">Fun Activities</h3>
          <p className="text-gray-600">Interactive challenges, mini-games, and creative exercises to brighten your day.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold text-indigo-500 mb-2">Community</h3>
          <p className="text-gray-600">Connect with like-minded people, share your experiences, and learn together.</p>
        </div>
      </div>

      {/* Fun Illustration Section */}
      <div className="w-full max-w-4xl mt-16 flex flex-col items-center text-center">
        <img
          src="https://picsum.photos/600/300?random=10"
          alt="Fun illustration"
          className="rounded-2xl shadow-xl mb-6 object-cover w-full h-64"
        />
        <p className="text-gray-700 text-lg">
          At FunZone, we make learning and relaxing a joyful experience. Explore our activities and tips to keep your day bright and productive.
        </p>
      </div>
    </div>
  )
}

export default AboutPage
