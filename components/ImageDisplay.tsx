
import React from 'react';

interface ImageDisplayProps {
  src: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src }) => {
  return (
    <div className="mt-2">
      <img src={src} alt="Generated" className="rounded-lg max-w-sm w-full shadow-lg" />
    </div>
  );
};

export default ImageDisplay;
