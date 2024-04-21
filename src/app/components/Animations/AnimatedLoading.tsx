'use client';
import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from 'public/animations/loading_animation.json';
const AnimatedLoading = () => {
  return (
    <div className="animatedLoading">
      <Lottie
        className="animatedLoading__animation"
        autoplay
        animationData={loadingAnimation}
        loop
      />
    </div>
  );
};

export default AnimatedLoading;
