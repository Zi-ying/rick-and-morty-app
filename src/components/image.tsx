import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import fallbackImage from '@/assets/oops.svg';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  errorMessage?: string;
}

const Image = ({
  src,
  alt,
  className,
  fallbackSrc = fallbackImage,
  width,
  height,
  errorMessage = 'Failed to load image',
  ...props
}: ImageProps) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <img
      src={imageError ? fallbackSrc : src}
      alt={alt}
      className={twMerge(className)}
      onError={() => setImageError(true)}
      loading="lazy"
      width={width}
      height={height}
      role="img"
      aria-label={alt}
      {...(imageError && { 'aria-label': `${alt} - ${errorMessage}` })}
      {...props}
    />
  );
};

export default Image;
