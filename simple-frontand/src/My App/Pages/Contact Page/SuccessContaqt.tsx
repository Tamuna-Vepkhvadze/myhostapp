import { useNavigate } from 'react-router-dom';
import { userstate } from '../../../zustand/Uzerstate';

const SuccessContaqt = () => {
  const navigate = useNavigate();
  const {globalstate} =userstate()
  const nav = () => {
    if(globalstate){
      navigate("/UserProfaile")
    }else {
       navigate("/")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 text-center max-w-md w-full animate-fade-in">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 sm:w-20 sm:h-20 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          შეტყობინება მიღებულია!
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          მადლობა რომ ჩვენ აგვირჩიეთ — თქვენი აზრი ჩვენთვის ძალიან მნიშვნელოვანია.
        </p>

        {/* Button */}
        <button
          onClick={nav}
          className="w-full rounded-xl text-base sm:text-lg py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg transition-all"
        >
          {globalstate ? "პროფილზე დაბრუნება": "მთავარ გვერძე დაბრუნება" }
          
        </button>
      </div>

      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  )
}

export default SuccessContaqt;
