import React from "react"

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex flex-col items-center p-8">
      
      {/* Hero Section */}
      <div className="w-full max-w-5xl text-center py-16">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 drop-shadow-lg">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Have questions, suggestions, or just want to say hi? We’d love to hear from you!
        </p>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 mb-12">
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition resize-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Fun Illustration */}
      <div className="w-full max-w-4xl flex flex-col items-center text-center">
        <img
          src="https://picsum.photos/600/300?random=20"
          alt="Fun illustration"
          className="rounded-2xl shadow-xl mb-6 object-cover w-full h-64"
        />
        <p className="text-gray-700 text-lg">
          We’re here to make your experience fun and seamless. Reach out anytime, and we’ll get back to you as soon as possible!
        </p>
      </div>
    </div>
  )
}

export default ContactPage
