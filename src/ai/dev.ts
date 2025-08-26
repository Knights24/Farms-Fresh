import { config } from 'dotenv';
config();

import '@/ai/flows/recipe-suggestions.ts';
import '@/ai/flows/ingredient-substitution.ts';
import '@/ai/flows/image-generation.ts';
