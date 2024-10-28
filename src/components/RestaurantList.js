import React from 'react';
import { useTrail, animated } from 'react-spring';

const restaurants = [
  { name: 'EX Rest 1', rating: 4.5, imageUrl: 'https://via.placeholder.com/400' },
  { name: 'EX Rest 2', rating: 4.8, imageUrl: 'https://via.placeholder.com/400' },
  { name: 'EX Rest 3', rating: 4.9, imageUrl: 'https://via.placeholder.com/400' },
];

const RestaurantList = () => {
  const trail = useTrail(restaurants.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

  return (
    <div className="restaurant-list">
      {trail.map((style, index) => (
        <animated.div key={index} className="restaurant-card" style={style}>
          <img src={restaurants[index].imageUrl} alt={restaurants[index].name} />
          <h2>{restaurants[index].name}</h2>
          <p>Rating: {restaurants[index].rating} / 5</p>
        </animated.div>
      ))}
    </div>
  );
};

export default RestaurantList;
