import { useState } from 'react';

import fallbackImage from '@/assets/oops.svg';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}
const Image = ({ src, alt, className }: ImageProps) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <img
      src={imageError ? fallbackImage : src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
};

export default Image;
