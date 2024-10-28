import React from 'react';

const categories = [
  { name: 'Preorder', icon: '🥘' },
  { name: 'Dine-In', icon: '🏠' },
  { name: 'Top Rated', icon: '⭐' },
  { name: 'Popular', icon: '🔥' },
];

const CategoryGrid = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="flex flex-wrap justify-between">
        {categories.map((category, index) => (
          <div
            key={index}
            className="w-1/2 px-2 mb-4"  // This ensures each card takes up half the width
          >
            <div
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out p-6 flex flex-col items-center justify-center min-h-[120px] cursor-pointer hover:-translate-y-1 animate-fadeIn"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <span className="text-4xl mb-3">{category.icon}</span>
              <p className="text-sm sm:text-base font-medium text-gray-800">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add keyframes animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
  }
`;
document.head.appendChild(style);

export default CategoryGrid;
