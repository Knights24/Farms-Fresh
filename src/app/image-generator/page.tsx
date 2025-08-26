'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { generateImage } from '@/ai/flows/image-generation';
import Image from 'next/image';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateImage = async () => {
    if (!prompt) {
        toast({
            variant: 'destructive',
            title: 'Prompt is required',
            description: 'Please enter a description for the image.',
        });
        return;
    }

    setLoading(true);
    setGeneratedImage(null);

    try {
      const result = await generateImage({ prompt });
      setGeneratedImage(result.imageUrl);
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Image generation failed',
        description: 'Sorry, we couldn\'t generate an image at this time. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
       <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary-foreground tracking-tight">
          Produce Image Generator
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Create stunning images of fresh produce with the power of AI.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Describe the Produce</CardTitle>
            <CardDescription>Enter a description of the fruit or vegetable you want to generate.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A bunch of ripe red tomatoes on a vine'"
            disabled={loading}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateImage} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Image
          </Button>
        </CardFooter>
      </Card>
      
      {loading && (
        <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Generating your image...</p>
        </div>
      )}

      {generatedImage && (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>Generated Image</CardTitle>
            </CardHeader>
          <CardContent>
            <div className="aspect-video relative">
                <Image
                    src={generatedImage}
                    alt={prompt}
                    fill
                    className="object-contain rounded-md"
                />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
