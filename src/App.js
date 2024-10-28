import React from 'react';
import Explore from './components/Explore';
import CategoryGrid from './components/CategoryGrid';
import RestaurantList from './components/RestaurantList';
import { useSpring, animated } from 'react-spring';

const App = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 },
  });

  return (
    <div className="home-screen">
      <animated.div style={fadeIn}>
        <Explore />
        <CategoryGrid />
        <RestaurantList />
      </animated.div>
    </div>
  );
};

export default App;
