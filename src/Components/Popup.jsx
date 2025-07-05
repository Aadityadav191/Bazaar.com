const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full text-center relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Sale Icon */}
        <div className="mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
            alt="Sale"
            className="w-16 h-16 mx-auto"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 Mega Sale Is Live!</h2>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          Enjoy <span className="text-red-500 font-semibold">up to 70% OFF</span> on top categories. Limited time only!
        </p>

        {/* CTA Button */}
        <a
          href="/sale"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full transition"
        >
          Grab the Deal
        </a>
      </div>
    </div>
  );
};

export default Popup;
