import { NextRequest, NextResponse } from 'next/server';
import { ImageGenerator, ProductPromptTemplates, getImageGeneratorConfig } from '@/lib/image-generator';

interface ImageGenerationRequest {
  productName: string;
  category: string;
  description: string;
  style?: 'realistic' | 'stylized' | 'minimal';
}

export async function POST(request: NextRequest) {
  try {
    const { productName, category, description, style = 'realistic' }: ImageGenerationRequest = await request.json();

    // Create a detailed prompt for high-quality product images
    const prompt = createProductImagePrompt(productName, category, description, style);

    // Initialize the image generator with configuration
    const config = getImageGeneratorConfig();
    const generator = new ImageGenerator(config);

    // Generate the image
    const imageUrl = await generator.generateImage({
      prompt,
      width: 1024,
      height: 1024,
      steps: 30,
      guidance: 7
    });

    return NextResponse.json({
      success: true,
      imageUrl,
      prompt,
      productName,
      category,
      service: config.service
    });

  } catch (error) {
    console.error('Error generating product image:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate product image' 
      },
      { status: 500 }
    );
  }
}

function createProductImagePrompt(
  productName: string, 
  category: string, 
  description: string, 
  style: string
): string {
  const baseTemplate = ProductPromptTemplates[category.toLowerCase() as keyof typeof ProductPromptTemplates];
  
  if (baseTemplate) {
    const basePrompt = baseTemplate(productName, description);
    
    const styleModifiers = {
      realistic: "photorealistic, natural colors, sharp details",
      stylized: "artistic, vibrant colors, slightly stylized, enhanced lighting",
      minimal: "minimalist, clean composition, soft shadows, simple background"
    };

    return `${basePrompt}, ${styleModifiers[style as keyof typeof styleModifiers] || styleModifiers.realistic}`;
  }
  
  // Fallback for unknown categories
  return `Professional product photography of ${productName}, ${description}, premium organic produce, clean white background, studio lighting, high resolution, commercial quality, photorealistic, centered composition, no text or labels, square aspect ratio 1:1`;
}

// GET endpoint to retrieve available styles, categories, and service status
export async function GET() {
  const config = getImageGeneratorConfig();
  
  return NextResponse.json({
    styles: ['realistic', 'stylized', 'minimal'],
    categories: ['Vegetables', 'Fruits', 'Herbs', 'Dairy'],
    supportedFormats: ['square', 'landscape', 'portrait'],
    maxResolution: '1024x1024',
    service: config.service,
    available: true
  });
}
