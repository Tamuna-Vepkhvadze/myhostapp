import React, { useState, useEffect, useRef } from "react";
import Recipes from "../Recipes/Recipes";
import Music from "../Musuc/Music";

type Category = {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  content: React.ReactNode;
  icon: string;
};

export default function CategoryExplorer() {
  const [active, setActive] = useState<string | null>(null);
  const [openCucis, setOpenCucis] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);


const recipesRef = useRef<HTMLDivElement | null>(null);
const musicRef = useRef<HTMLDivElement | null>(null);

 
 useEffect(() => {
  if (openCucis && recipesRef.current) {
    recipesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (openMusic && musicRef.current) {
    musicRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}, [openCucis, openMusic]);

const categories: Category[] = [
    {
      id: "culinary",
      title: "კულინარია",
      subtitle: "საუკეთესო რეცეპტები და გასტრონომია",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      icon: "🍳",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">კულინარია</h2>
          <p>
            აღმოაჩინე გემრიელი რეცეპტები, კულინარიული რჩევები და ინსტრუქციები. 🍰🥗
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>საუკეთესო სადილი 30 წუთში</li>
            <li>დესერტების რჩეული კოლექცია</li>
            <li>მსოფლიო საკვების რეცეპტები</li>
            <li>სეზონური ინგრედიენტების გამოყენება</li>
          </ul>
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80"
            alt="Culinary"
            className="w-full h-48 object-cover rounded-xl shadow"
          />
          <button
            onClick={() => setOpenCucis(true)}
            className="
              flex
              mx-auto
              mt-10
              relative
              px-12 py-4
              rounded-full
              font-bold
            text-gray-900
              bg-indigo-500
              border-4 border-transparent
              bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400
              bg-clip-border
              transition
              duration-300
              ease-in-out
              hover:scale-105
              active:scale-95
              hover:shadow-xl
              animate-pulse
            "
          >
            ეწვიეთ გვერდს
          </button>
        </div>
      ),
    },
    {
      id: "music",
      title: "მუსიკა",
      subtitle: "ტრენდული სიმღერები და არტისტები",
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      icon: "🎵",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">მუსიკა</h2>
          <p>გამოიკვლიე ახალი ტრენდული ალბომები, არტისტები და მუსიკის სიუჟეტები. 🎤🎧</p>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>პოპულარული ტრეკები კვირის მიხედვით</li>
            <li>შეხვედრა ნიჭიერ არტისტებთან</li>
            <li>გადაცემები და კონცერტების სიები</li>
          </ul>
          <img
            src="https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=600&q=80"
            alt="Music"
            className="w-full h-48 object-cover rounded-xl shadow"
          />


     
        <button
          onClick={() => { setOpenMusic(true); setOpenCucis(false); }}
          className="
            flex
            mx-auto
            mt-10
            relative
            px-12 py-4
            rounded-full
            font-bold
          text-gray-900
            bg-indigo-500
            border-4 border-transparent
            bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400
            bg-clip-border
            transition
            duration-300
            ease-in-out
            hover:scale-105
            active:scale-95
            hover:shadow-xl
            animate-pulse
          "
        >
          ეწვიეთ გვერდს
        </button>



        </div>
      ),
    },
    {
      id: "books",
      title: "წიგნები",
      subtitle: "ლიტერატურა, კლასიკა და ახალი გამოცემები",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
      icon: "📚",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">წიგნები</h2>
          <p>აღმოაჩინე ახალი გამოცემები, კლასიკა და ბესტსელერები. 📖</p>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>ბესტსელერები მსოფლიოს მიხედვით</li>
            <li>კლასიკური ლიტერატურის სერია</li>
            <li>ფანტასტიკა და დეტექტივები</li>
            <li>ლიტერატურული ინსპირაცია ბავშვებისთვის</li>
          </ul>
          <img
            src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80"
            alt="Books"
            className="w-full h-48 object-cover rounded-xl shadow"
          />
        </div>
      ),
    },
    {
      id: "news",
      title: "ახალი ამბები",
      subtitle: "მსოფლიო ამბები და მოვლენები",
      img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      icon: "📰",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">ახალი ამბები</h2>
          <p>გაიგე ბოლო მოვლენები, პოლიტიკური სიახლეები და ინოვაციები. 🌐</p>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>მსოფლიო პოლიტიკური სიახლეები</li>
            <li>ეკონომიკური ანალიზი</li>
            <li>ტექნოლოგიური ინოვაციები</li>
            <li>კულტურული მოვლენები</li>
          </ul>
          <img
            src="https://images.unsplash.com/photo-1508385082359-f1b02da5ed4b?auto=format&fit=crop&w=600&q=80"
            alt="News"
            className="w-full h-48 object-cover rounded-xl shadow"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto lg:flex gap-8">
          {/* Left: Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-1/2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer transform transition-all hover:scale-105
                  ${active === cat.id ? "ring-4 ring-indigo-400" : ""}
                `}
              >
                <img src={cat.img} alt={cat.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <h2 className="text-white text-xl font-bold">{cat.title}</h2>
                  <p className="text-white text-sm mt-1">{cat.subtitle}</p>
                </div>
                <div className="absolute top-4 right-4 text-3xl">{cat.icon}</div>
              </div>
            ))}
          </div>

          {/* Right: Selected Content */}
          <div className="lg:w-1/2 bg-white rounded-3xl shadow-2xl p-6 min-h-[600px]">
            {!active && (
              <p className="text-slate-500 text-center mt-24">
                აირჩიეთ კატეგორია ქარდზე, რომ ნახოთ დეტალები
              </p>
            )}
            {categories.map((cat) => active === cat.id && <div key={cat.id}>{cat.content}</div>)}
          </div>
        </div>
      </div>

      {/* Close button */}
      {openCucis && (
        <button
          onClick={() => setOpenCucis(false)}
          className="fixed cursor-pointer top-25 right-4 w-12 h-12 bg-red-500 text-white font-bold rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-all z-50"
        >
          X
        </button>
      )}
      {openMusic && (
        <button
          onClick={() => setOpenMusic(false)}
          className="fixed cursor-pointer top-25 right-4 w-12 h-12 bg-red-500 text-white font-bold rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-all z-50"
        >
          X
        </button>
      )}

      {/* Recipes Section */}
      {openCucis && (
        <div ref={recipesRef}>
          <Recipes />
        </div>
      )}
      {/* Recipes Section */}
      {openMusic && (
        <div ref={musicRef}>
          <Music />
        </div>
      )}
    </>
  );
}
