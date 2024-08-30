import React, { useState } from 'react';

const ImageCard = ({ image, onSelect }) => {
  return (
    <div className="cursor-pointer" onClick={() => onSelect(image)}>
      <img src={image} alt="Teacher's Day Card" className="w-full h-auto" />
    </div>
  );
};

export default ImageCard;
