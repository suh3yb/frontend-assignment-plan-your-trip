import React, { useRef, useState } from 'react';
import { useIntersection } from '../hooks/useIntersection';

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

const LazyImg: React.FC<Props> = ({ src, alt, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  useIntersection<HTMLDivElement>(containerRef, () => {
    setIsInView(true);
  });

  return (
    <div ref={containerRef}>
      {isInView ? (
        <img className={className} src={src} alt={alt} />
      ) : (
        <div className={`${className}__placeholder`} />
      )}
    </div>
  );
};

export default LazyImg;
