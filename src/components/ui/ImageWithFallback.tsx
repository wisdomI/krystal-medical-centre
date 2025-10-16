'use client';

import React from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  [key: string]: unknown;
}

const DEFAULT_FALLBACK = '/api/placeholder/400/300';

export function ImageWithFallback({ 
  fallbackSrc = DEFAULT_FALLBACK, 
  src, 
  alt = 'image', 
  width, 
  height,
  fill = false,
  className,
  ...rest 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = React.useState<string | undefined>(typeof src === 'string' ? src : undefined);

  React.useEffect(() => {
    if (typeof src === 'string') setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc || fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}


