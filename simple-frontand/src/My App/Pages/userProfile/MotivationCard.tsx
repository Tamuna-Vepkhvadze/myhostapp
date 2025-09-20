import { useEffect, useState } from "react";

type Quote = {
  text: string;
  author?: string;
  image?: string;
};

// მარტივი mock მონაცემები (მცირე მასივი, კლიკზე შემთხვევითი არჩევანი)
const MOCK_QUOTES: Quote[] = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", image: "https://source.unsplash.com/80x80/?motivation1" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James", image: "https://source.unsplash.com/80x80/?success1" },
  { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett", image: "https://source.unsplash.com/80x80/?inspiration1" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman", image: "https://source.unsplash.com/80x80/?happiness1" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", image: "https://source.unsplash.com/80x80/?dream1" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", image: "https://source.unsplash.com/80x80/?effort1" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", image: "https://source.unsplash.com/80x80/?success2" },
  { text: "Keep going. Be all in.", author: "Bryan Hutchinson", image: "https://source.unsplash.com/80x80/?determination1" },
  { text: "Small steps every day.", author: "Unknown", image: "https://source.unsplash.com/80x80/?steps1" },
  { text: "Stay positive, work hard, make it happen.", author: "Unknown", image: "https://source.unsplash.com/80x80/?motivation2" },
  { text: "Dream big. Start small. Act now.", author: "Unknown", image: "https://source.unsplash.com/80x80/?dream2" },
  { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn", image: "https://source.unsplash.com/80x80/?happiness2" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky", image: "https://source.unsplash.com/80x80/?effort2" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll", image: "https://source.unsplash.com/80x80/?life1" },
  { text: "Do what you love, love what you do.", author: "Unknown", image: "https://source.unsplash.com/80x80/?love1" },
  { text: "Make each day your masterpiece.", author: "John Wooden", image: "https://source.unsplash.com/80x80/?day1" },
  { text: "The best way out is always through.", author: "Robert Frost", image: "https://source.unsplash.com/80x80/?nature1" },
  { text: "Opportunities don't happen, you create them.", author: "Chris Grosser", image: "https://source.unsplash.com/80x80/?opportunity1" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", image: "https://source.unsplash.com/80x80/?clock1" },
  { text: "Great things never come from comfort zones.", author: "Unknown", image: "https://source.unsplash.com/80x80/?comfort1" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown", image: "https://source.unsplash.com/80x80/?push1" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown", image: "https://source.unsplash.com/80x80/?hardwork1" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown", image: "https://source.unsplash.com/80x80/?dream3" },
  { text: "Stay humble. Work hard. Be kind.", author: "Unknown", image: "https://source.unsplash.com/80x80/?humble1" },
  { text: "Don’t stop until you’re proud.", author: "Unknown", image: "https://source.unsplash.com/80x80/?proud1" },
  { text: "Be fearless in the pursuit of what sets your soul on fire.", author: "Jennifer Lee", image: "https://source.unsplash.com/80x80/?fearless1" },
  { text: "You are capable of amazing things.", author: "Unknown", image: "https://source.unsplash.com/80x80/?capable1" },
  { text: "Work until your idols become your rivals.", author: "Unknown", image: "https://source.unsplash.com/80x80/?work1" },
  { text: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown", image: "https://source.unsplash.com/80x80/?success3" },
  { text: "Don’t wait for opportunity. Create it.", author: "Unknown", image: "https://source.unsplash.com/80x80/?create1" },
  { text: "Little things make big days.", author: "Unknown", image: "https://source.unsplash.com/80x80/?small1" },
  { text: "It’s going to be hard, but hard does not mean impossible.", author: "Unknown", image: "https://source.unsplash.com/80x80/?hard2" },
  { text: "Don’t limit your challenges. Challenge your limits.", author: "Unknown", image: "https://source.unsplash.com/80x80/?challenge1" },
  { text: "Great things take time.", author: "Unknown", image: "https://source.unsplash.com/80x80/?time1" },
  { text: "Dream bigger. Do bigger.", author: "Unknown", image: "https://source.unsplash.com/80x80/?dream4" },
  { text: "Success is not for the lazy.", author: "Unknown", image: "https://source.unsplash.com/80x80/?success4" },
  { text: "Don't wait. The time will never be just right.", author: "Napoleon Hill", image: "https://source.unsplash.com/80x80/?time2" },
  { text: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar", image: "https://source.unsplash.com/80x80/?start1" },
  { text: "The key to success is to focus on goals, not obstacles.", author: "Unknown", image: "https://source.unsplash.com/80x80/?key1" },
  { text: "Do something today that your future self will thank you for.", author: "Unknown", image: "https://source.unsplash.com/80x80/?future1" },
  { text: "Don’t stop when you’re tired. Stop when you’re done.", author: "Marilyn Monroe", image: "https://source.unsplash.com/80x80/?tired1" },
  { text: "Little progress is still progress.", author: "Unknown", image: "https://source.unsplash.com/80x80/?progress1" },
  { text: "Success is what happens after you have survived all your mistakes.", author: "Unknown", image: "https://source.unsplash.com/80x80/?mistakes1" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt", image: "https://source.unsplash.com/80x80/?limit1" },
  { text: "Don’t be busy, be productive.", author: "Unknown", image: "https://source.unsplash.com/80x80/?productive1" },
  { text: "The best revenge is massive success.", author: "Frank Sinatra", image: "https://source.unsplash.com/80x80/?revenge1" },
  { text: "Do it with passion or not at all.", author: "Rosa Nouchette Carey", image: "https://source.unsplash.com/80x80/?passion1" },
  { text: "The harder you fall, the higher you bounce.", author: "Unknown", image: "https://source.unsplash.com/80x80/?bounce1" },
  { text: "Your limitation—it’s only your imagination.", author: "Unknown", image: "https://source.unsplash.com/80x80/?imagination1" },
  { text: "Dream it. Believe it. Build it.", author: "Unknown", image: "https://source.unsplash.com/80x80/?build1" },
  { text: "Don’t quit. Suffer now and live the rest of your life as a champion.", author: "Muhammad Ali", image: "https://source.unsplash.com/80x80/?champion1" },
  { text: "Success is no accident.", author: "Pele", image: "https://source.unsplash.com/80x80/?success5" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", image: "https://source.unsplash.com/80x80/?wisdom1" },
];


export default function MotivationCard() {
  const [quote, setQuote] = useState<Quote | null>(null);

  const fetchQuote = () => {
    const randomIndex = Math.floor(Math.random() * MOCK_QUOTES.length);
    setQuote(MOCK_QUOTES[randomIndex]);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (!quote) return null;

  return (
    <div className="max-w-md my-15 w-[700px] mx-auto bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 p-6 rounded-3xl shadow-xl flex flex-col items-center text-center">
      <p className="text-lg font-semibold text-gray-800 mb-2">"{quote.text}"</p>
      <p className="text-sm text-gray-600">{quote.author ?? "Unknown"}</p>
      <button
        onClick={fetchQuote}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
      >
        New Quote
      </button>
    </div>
  );
}
