// AI Image Generation Utilities
// This file contains utilities for generating product images using various AI services

interface ImageGenerationConfig {
  service: 'openai' | 'stability' | 'replicate' | 'placeholder';
  apiKey?: string;
  model?: string;
  size?: string;
  quality?: 'standard' | 'hd';
}

interface ImageGenerationRequest {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  guidance?: number;
}

export class ImageGenerator {
  private config: ImageGenerationConfig;

  constructor(config: ImageGenerationConfig) {
    this.config = config;
  }

  async generateImage(request: ImageGenerationRequest): Promise<string> {
    switch (this.config.service) {
      case 'openai':
        return this.generateWithOpenAI(request);
      case 'stability':
        return this.generateWithStability(request);
      case 'replicate':
        return this.generateWithReplicate(request);
      default:
        return this.generatePlaceholder(request);
    }
  }

  private async generateWithOpenAI(request: ImageGenerationRequest): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('OpenAI API key is required');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model || 'dall-e-3',
          prompt: request.prompt,
          n: 1,
          size: this.config.size || '1024x1024',
          quality: this.config.quality || 'standard',
          response_format: 'url'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate image');
      }

      return data.data[0].url;
    } catch (error) {
      console.error('OpenAI generation error:', error);
      throw error;
    }
  }

  private async generateWithStability(request: ImageGenerationRequest): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('Stability AI API key is required');
    }

    try {
      const formData = new FormData();
      formData.append('text_prompts[0][text]', request.prompt);
      formData.append('text_prompts[0][weight]', '1');
      
      if (request.negativePrompt) {
        formData.append('text_prompts[1][text]', request.negativePrompt);
        formData.append('text_prompts[1][weight]', '-1');
      }
      
      formData.append('cfg_scale', (request.guidance || 7).toString());
      formData.append('height', (request.height || 1024).toString());
      formData.append('width', (request.width || 1024).toString());
      formData.append('samples', '1');
      formData.append('steps', (request.steps || 30).toString());

      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate image');
      }

      // Convert base64 to blob URL for preview
      const base64Image = data.artifacts[0].base64;
      const blob = this.base64ToBlob(base64Image, 'image/png');
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Stability AI generation error:', error);
      throw error;
    }
  }

  private async generateWithReplicate(request: ImageGenerationRequest): Promise<string> {
    // Placeholder for Replicate integration
    // You would need to implement Replicate API calls here
    throw new Error('Replicate integration not implemented yet');
  }

  private async generatePlaceholder(request: ImageGenerationRequest): Promise<string> {
    // Generate a high-quality placeholder image from Unsplash
    // This is useful for development and testing
    const keywords = this.extractKeywords(request.prompt);
    const query = keywords.join(',');
    
    return `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1024&h=1024&fit=crop&auto=format&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&${encodeURIComponent(query)}`;
  }

  private extractKeywords(prompt: string): string[] {
    // Simple keyword extraction from prompt
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    
    return prompt
      .toLowerCase()
      .split(/[^a-zA-Z0-9]+/)
      .filter(word => word.length > 2 && !commonWords.includes(word))
      .slice(0, 3);
  }

  private base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }
}

// Product-specific prompt templates
export const ProductPromptTemplates = {
  vegetables: (name: string, description: string) => 
    `Professional product photography of ${name}, ${description}, fresh organic vegetables, vibrant natural colors, clean white background, studio lighting, high resolution, commercial quality, photorealistic, centered composition, no text or labels, square aspect ratio 1:1`,
  
  fruits: (name: string, description: string) => 
    `Professional product photography of ${name}, ${description}, ripe fresh fruits, juicy appearance, natural shine, clean white background, studio lighting, high resolution, commercial quality, photorealistic, centered composition, no text or labels, square aspect ratio 1:1`,
  
  herbs: (name: string, description: string) => 
    `Professional product photography of ${name}, ${description}, fresh green herbs, aromatic leaves, garden fresh, clean white background, studio lighting, high resolution, commercial quality, photorealistic, centered composition, no text or labels, square aspect ratio 1:1`,
  
  dairy: (name: string, description: string) => 
    `Professional product photography of ${name}, ${description}, premium dairy products, clean packaging, farm fresh quality, clean white background, studio lighting, high resolution, commercial quality, photorealistic, centered composition, no text or labels, square aspect ratio 1:1`
};

// Configuration for different environments
export const getImageGeneratorConfig = (): ImageGenerationConfig => {
  const openaiKey = process.env.OPENAI_API_KEY;
  const stabilityKey = process.env.STABILITY_API_KEY;
  
  if (openaiKey) {
    return {
      service: 'openai',
      apiKey: openaiKey,
      model: 'dall-e-3',
      size: '1024x1024',
      quality: 'hd'
    };
  }
  
  if (stabilityKey) {
    return {
      service: 'stability',
      apiKey: stabilityKey
    };
  }
  
  // Fallback to placeholder service for development
  return {
    service: 'placeholder'
  };
};
