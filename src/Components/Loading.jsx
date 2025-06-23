import React from 'react';
import { Circles, InfinitySpin, ThreeDots } from 'react-loader-spinner';

const Loading = () => {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
      <ThreeDots height="90" width="90" color="#FF0070"  ariaLabel="loading"
      />
    </div>
    );
};

export default Loading;