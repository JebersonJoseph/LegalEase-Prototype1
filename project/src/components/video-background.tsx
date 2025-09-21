
'use client';

import { useEffect, useRef, memo } from 'react';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

function VideoBackground({ 
  src, 
  className = "absolute z-0 w-full h-full object-cover",
  overlay = true,
  overlayOpacity = 0.6
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure video plays smoothly
      video.play().catch(console.error);
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`${className} video-background`}
        style={{
          filter: 'brightness(0.8) contrast(1.1)',
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {overlay && (
        <div 
          className="absolute z-10 inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </>
  );
}

export default memo(VideoBackground);
