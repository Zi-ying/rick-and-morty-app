import { useState } from 'react';

import fallbackImage from '@/assets/oops.svg';

interface ImageProps {
  src: string;
  alt: string;
  isPending: boolean;
  className?: string;
}
const Image = ({ src, alt, isPending, className }: ImageProps) => {
  const [imageError, setImageError] = useState<boolean>(false);

  if (isPending) {
    <img src={fallbackImage} alt="Image is loading" />
  }

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
