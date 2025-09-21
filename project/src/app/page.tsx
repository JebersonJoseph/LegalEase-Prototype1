import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, FileText, Gamepad2, Columns, FileSignature, Camera } from 'lucide-react';
import VideoBackground from '@/components/video-background';
import LegalEaseAnimation from '@/components/LegalEaseAnimation';

const features = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Analyzer',
    description: 'Translate dense legal text into plain English. Just paste your document and get instant clarity.',
    href: '/analyzer',
  },
  {
    icon: <Camera className="h-8 w-8 text-primary" />,
    title: 'Scan Document',
    description: 'Use your camera to scan a physical document and get AI-powered insights and summaries.',
    href: '/scan',
  },
  {
    icon: <FileSignature className="h-8 w-8 text-primary" />,
    title: 'Custom Document',
    description: 'Generate tailored legal documents like NDAs or lease agreements with our AI-powered tool.',
    href: '/custom-document',
  },
  {
    icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    title: 'Test Your Knowledge',
    description: 'Put your legal knowledge to the test with our interactive, AI-generated quizzes.',
    href: '/game',
  },
  {
    icon: <Columns className="h-8 w-8 text-primary" />,
    title: 'Document Comparator',
    description: 'Easily spot changes between two versions of a document with our powerful diff tool.',
    href: '/compare',
  },
  {
    icon: <Scale className="h-8 w-8 text-primary" />,
    title: 'Legal Learning Center',
    description: 'Explore our curated articles on a wide range of legal topics, from contracts to intellectual property.',
    href: '/articles',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <VideoBackground 
          src="/videos/northern-lights-bg.mp4"
          overlayOpacity={0.6}
        />
        <div className="relative z-20 container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-white">
            Demystify the Law. Understand with Confidence.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            LegalEase is your AI-powered companion for navigating complex legal documents, learning key concepts, and testing your knowledge.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/analyzer">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
              <Link href="/articles">Explore Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      <LegalEaseAnimation />

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              Your All-in-One Legal Toolkit
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Powerful tools to make the law accessible to everyone.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.title} className="group">
                <Card className="h-full text-center flex flex-col items-center transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                  <CardHeader className="items-center">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl pt-2">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
