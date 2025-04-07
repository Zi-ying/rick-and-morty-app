import { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
}
const Image = ({ src, alt }: ImageProps) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const fallbackImage = '../../../public/oops.svg';

  return (
    <img
      src={imageError ? fallbackImage : src}
      alt={alt}
      className="rounded-xl"
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
};

export default Image;
