'use server';
/**
 * @fileOverview A flow that generates an image based on a text prompt.
 *
 * - generateImage - A function that handles the image generation process.
 * - ImageGenerationInput - The input type for the generateImage function.
 * - ImageGenerationOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageGenerationInputSchema = z.object({
  prompt: z.string().describe('A text description of the image to generate.'),
});
export type ImageGenerationInput = z.infer<typeof ImageGenerationInputSchema>;

const ImageGenerationOutputSchema = z.object({
  imageUrl: z.string().describe("The data URI of the generated image. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type ImageGenerationOutput = z.infer<typeof ImageGenerationOutputSchema>;


export async function generateImage(input: ImageGenerationInput): Promise<ImageGenerationOutput> {
    return imageGenerationFlow(input);
}


const imageGenerationFlow = ai.defineFlow(
  {
    name: 'imageGenerationFlow',
    inputSchema: ImageGenerationInputSchema,
    outputSchema: ImageGenerationOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `A high-quality, vibrant photograph of ${input.prompt}, on a clean white background.`,
      });
    
    if (!media.url) {
        throw new Error('Image generation failed.');
    }

    return {
        imageUrl: media.url,
    };
  }
);
