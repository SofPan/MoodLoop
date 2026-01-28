import { useState } from 'react';

const ComingSoon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const upcomingFeatures = [
    'User Accounts',
    'Activity Analysis Chart',
    'Average Sleep',
  ];

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-2 right-2 md:top-4 md:right-4 px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition shadow-md text-sm font-medium z-40"
      >
        Coming Soon ✨
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-md w-3/4 md:w-full mx-4 z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-stone-700">Coming Soon</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <p className="text-stone-600 mb-4">
              Exciting features in development:
            </p>
            
            <ul className="space-y-2">
              {upcomingFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-stone-700">
                  <span className="text-sage-600 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-sm text-stone-500 mt-4 italic">
              Have a feature request? Let me know!
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default ComingSoon;