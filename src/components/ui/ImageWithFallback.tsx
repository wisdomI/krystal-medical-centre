'use client';

import React from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = '/api/placeholder/400/300';

export function ImageWithFallback({ fallbackSrc = DEFAULT_FALLBACK, src, alt, ...rest }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = React.useState<string | undefined>(typeof src === 'string' ? src : undefined);

  React.useEffect(() => {
    if (typeof src === 'string') setImgSrc(src);
  }, [src]);

  return (
    <img
      {...rest}
      src={imgSrc || fallbackSrc}
      alt={alt || 'image'}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}


