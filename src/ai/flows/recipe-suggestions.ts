'use server';
/**
 * @fileOverview Provides recipe suggestions based on items in the user's cart.
 *
 * - getRecipeSuggestions - A function that suggests recipes based on cart items.
 * - RecipeSuggestionsInput - The input type for the getRecipeSuggestions function.
 * - RecipeSuggestionsOutput - The return type for the getRecipeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeSuggestionsInputSchema = z.object({
  cartItems: z.array(
    z.string().describe('A list of items currently in the user\'s cart.')
  ).describe('The items in the user\'s cart.'),
});
export type RecipeSuggestionsInput = z.infer<typeof RecipeSuggestionsInputSchema>;

const RecipeSuggestionsOutputSchema = z.object({
  recipes: z.array(
    z.object({
      name: z.string().describe('The name of the recipe.'),
      ingredients: z.array(z.string()).describe('The list of ingredients required for the recipe.'),
      instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
    })
  ).describe('A list of recipe suggestions based on the cart items.'),
});
export type RecipeSuggestionsOutput = z.infer<typeof RecipeSuggestionsOutputSchema>;

export async function getRecipeSuggestions(input: RecipeSuggestionsInput): Promise<RecipeSuggestionsOutput> {
  return recipeSuggestionsFlow(input);
}

const recipeSuggestionsPrompt = ai.definePrompt({
  name: 'recipeSuggestionsPrompt',
  input: {schema: RecipeSuggestionsInputSchema},
  output: {schema: RecipeSuggestionsOutputSchema},
  prompt: `You are a recipe recommendation expert. Given the following list of items in the user's cart, suggest recipes that utilize these ingredients. If some items are missing, suggest common substitutions.

Cart Items:
{{#each cartItems}}- {{this}}
{{/each}}

Please provide a list of recipes with their names, ingredients, and instructions.`,
});

const recipeSuggestionsFlow = ai.defineFlow(
  {
    name: 'recipeSuggestionsFlow',
    inputSchema: RecipeSuggestionsInputSchema,
    outputSchema: RecipeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await recipeSuggestionsPrompt(input);
    return output!;
  }
);
