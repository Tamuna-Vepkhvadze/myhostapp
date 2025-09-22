import { Link } from "react-router-dom"

const HomePage = () => {
  const tips = [
    { icon: "https://picsum.photos/50/50?random=1", text: "Drink water every hour",  url: "/HydrationContent"},
    { icon: "https://picsum.photos/50/50?random=2", text: "Take a 5-min walk",  url: "/WalkingContent" },
    { icon: "https://picsum.photos/50/50?random=3", text: "Practice deep breathing",  url: "/BreathingContent" },
    { icon: "https://picsum.photos/50/50?random=4", text: "Stretch your body",  url: "/StretchingContent" },
    { icon: "https://picsum.photos/50/50?random=5", text: "Listen to music",  url: "/MusicContent" },
    { icon: "https://picsum.photos/50/50?random=6", text: "Take a short nap",  url: "/NapContent" },
  ]

  const activities = [
    { image: "https://picsum.photos/400/200?random=1", title: "Yoga Session", description: "Relax your mind and body",  url: "/YogaSessiondinamic" },
    { image: "https://picsum.photos/400/200?random=2", title: "Cooking Fun", description: "Try a new recipe today",  url: "/CookingFun" },
    { image: "https://picsum.photos/400/200?random=3", title: "Reading Hour", description: "Discover a new book",  url: "/ReadingHourContent" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Hero Section */}
      <div className="w-full h-96 flex flex-col justify-center items-center text-center rounded-b-3xl shadow-lg bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300 px-4">
        <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">Welcome to FunZone!</h1>
        <p className="text-lg sm:text-xl text-white mt-2 drop-shadow-md">Discover daily tips, fun activities & news</p>
        <div className="mt-6 flex space-x-4">
          <Link 
            to={"/Registracion"}  
            className="py-2 px-4 sm:py-3 sm:px-6 bg-white text-indigo-500 font-semibold rounded-full shadow hover:scale-105 transition-transform"
          >
            Sign Up
          </Link>
          <Link 
            to={"/LogIn"} 
            className="py-2 px-4 sm:py-3 sm:px-6 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>

      {/* Daily Tips */}
      <div className="mt-16 px-4">
        {/* Grid: mobile = 1, sm = 2, md = 3, lg = 6 (ensures 6 cards together on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {tips.map((tip, idx) => (
            <Link 
              to={tip.url}
              key={idx}
              className="bg-gray-700 rounded-xl shadow-lg overflow-hidden relative hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={tip.icon}
                alt=""
                className="w-full h-40 object-cover filter brightness-90"
              />
              <div className="absolute bottom-0 w-full bg-gray-700 bg-opacity-50 p-3 flex justify-center items-center rounded-b-xl">
                <p className="text-center text-white font-medium">{tip.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Fun Activities */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-10">
        {activities.map((act, idx) => (
          <Link 
            to={act.url}
            key={idx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
          >
            <img src={act.image} alt="" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{act.title}</h3>
              <p className="text-gray-600 mt-1">{act.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage
