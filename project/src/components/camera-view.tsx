
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Camera, RefreshCw } from 'lucide-react';

interface CameraViewProps {
  onCapture: (imageData: string) => void;
  onRetake: () => void;
  capturedImage: string | null;
}

export default function CameraView({ onCapture, onRetake, capturedImage }: CameraViewProps) {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    let videoElement: HTMLVideoElement | null = null;

    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access. Please try a different browser.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoElement = videoRef.current;
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [toast]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        onCapture(dataUri);
      }
    }
  };

  if (hasCameraPermission === undefined) {
    return (
      <div className="flex items-center justify-center p-8 h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Initializing camera...</p>
      </div>
    );
  }

  if (hasCameraPermission === false) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Camera Access Required</AlertTitle>
        <AlertDescription>
          Please allow camera access in your browser to use this feature.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 p-4 h-full flex flex-col justify-between">
      <div className="relative flex-grow">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover rounded-md bg-secondary ${
            capturedImage ? 'hidden' : 'block'
          }`}
          autoPlay
          muted
          playsInline
        />
        <canvas ref={canvasRef} className="hidden" />
        {capturedImage && (
          <Image
            src={capturedImage}
            alt="Captured document"
            width={400}
            height={300}
            className="w-full h-full object-contain rounded-md"
          />
        )}
      </div>
      <div className="flex justify-center gap-4 pt-4">
        {!capturedImage ? (
          <Button onClick={handleCapture}>
            <Camera className="mr-2" />
            Capture
          </Button>
        ) : (
          <Button variant="outline" onClick={onRetake}>
            <RefreshCw className="mr-2" />
            Retake
          </Button>
        )}
      </div>
    </div>
  );
}
