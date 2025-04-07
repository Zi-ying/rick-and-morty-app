import { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}
const Image = ({ src, alt, className }: ImageProps) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const fallbackImage = '../../../public/oops.svg';

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
