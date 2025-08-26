# AI Product Image Generation

The Farm Fresh website includes an AI-powered product image generation system that allows you to create high-quality product images using various AI services.

## Features

- **Multiple AI Services**: Support for OpenAI DALL-E, Stability AI, and other providers
- **Product-Specific Prompts**: Optimized prompts for different product categories
- **Style Options**: Realistic, stylized, and minimal image styles
- **Quick Product Selection**: Pre-fill forms from existing product catalog
- **Image Download**: Save generated images locally
- **URL Generation**: Get shareable image URLs

## Accessing the Generator

1. Navigate to `/generate-images` in your browser
2. Or click "AI Images" in the navigation menu
3. The generator is available at: http://localhost:9002/generate-images

## How to Use

### 1. Quick Start with Existing Products
- Select a product from the "Quick Select" dropdown
- The form will auto-fill with product details
- Choose your preferred style
- Click "Generate Image"

### 2. Custom Product Images
- Enter a product name (e.g., "Organic Tomatoes")
- Select the appropriate category
- Write a detailed description
- Choose the image style
- Click "Generate Image"

### 3. Download and Use
- Once generated, you can download the image
- Copy the image URL for use in your product catalog
- Images are optimized for 1:1 aspect ratio (square format)

## AI Service Configuration

### For Development (Default)
The system uses high-quality placeholder images from Unsplash when no API keys are configured.

### For Production with OpenAI DALL-E (Recommended)
1. Get an API key from [OpenAI Platform](https://platform.openai.com)
2. Add to your `.env.local` file:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
3. The system will automatically use DALL-E 3 for high-quality images

### For Production with Stability AI
1. Get an API key from [Stability AI](https://platform.stability.ai)
2. Add to your `.env.local` file:
   ```
   STABILITY_API_KEY=your_api_key_here
   ```
3. The system will use Stable Diffusion XL

## Image Styles

### Realistic
- Photorealistic product shots
- Natural colors and lighting
- Professional studio appearance

### Stylized
- Artistic interpretation
- Vibrant, enhanced colors
- Creative lighting effects

### Minimal
- Clean, simple composition
- Soft shadows
- Minimalist aesthetic

## Categories Supported

- **Vegetables**: Fresh organic vegetables with vibrant colors
- **Fruits**: Ripe fruits with natural shine and juicy appearance
- **Herbs**: Fresh green herbs with aromatic leaf details
- **Dairy**: Premium dairy products with clean packaging

## API Endpoints

### Generate Image
- **POST** `/api/generate-image`
- Body: `{ productName, category, description, style }`
- Returns: `{ success, imageUrl, prompt, productName, category }`

### Get Configuration
- **GET** `/api/generate-image`
- Returns available styles, categories, and service status

## Tips for Better Results

1. **Detailed Descriptions**: Include specific details about appearance, freshness, and quality
2. **Category Selection**: Choose the correct category for optimized prompts
3. **Style Matching**: Use "realistic" for e-commerce, "stylized" for marketing
4. **Iteration**: Try different descriptions if the first result isn't perfect

## Troubleshooting

- **Image not generating**: Check API key configuration and network connection
- **Poor quality**: Try more detailed descriptions or different styles
- **Service unavailable**: The system falls back to placeholder images in development

## Cost Considerations

- **OpenAI DALL-E**: ~$0.040 per image (1024x1024, standard quality)
- **Stability AI**: ~$0.01-0.03 per image (varies by model)
- **Development**: Free (uses placeholder images)

## Integration with Product Catalog

Generated images can be easily integrated into your product catalog by:
1. Generating the image
2. Downloading or copying the URL
3. Updating the product's `imageUrl` in the data file
4. The product cards will automatically display the new image

---

*Note: AI image generation requires API keys from supported services. The system works with placeholder images during development.*
