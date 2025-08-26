// ingredient-substitution.ts
'use server';

/**
 * @fileOverview A flow that suggests ingredient substitutions for a recipe.
 *
 * - suggestIngredientSubstitutions - A function that handles the ingredient substitution process.
 * - IngredientSubstitutionInput - The input type for the suggestIngredientSubstitutions function.
 * - IngredientSubstitutionOutput - The return type for the suggestIngredientSubstitutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IngredientSubstitutionInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.array(z.string()).describe('A list of ingredients in the recipe.'),
  unavailableIngredients: z.array(z.string()).describe('A list of ingredients that are not available.'),
});
export type IngredientSubstitutionInput = z.infer<typeof IngredientSubstitutionInputSchema>;

const IngredientSubstitutionOutputSchema = z.object({
  substitutedIngredients: z.array(
    z.object({
      originalIngredient: z.string().describe('The original unavailable ingredient.'),
      suggestedSubstitution: z.string().describe('The suggested substitution for the ingredient.'),
      reason: z.string().describe('The reason for the suggested substitution.'),
    })
  ).describe('A list of suggested ingredient substitutions.'),
});
export type IngredientSubstitutionOutput = z.infer<typeof IngredientSubstitutionOutputSchema>;

export async function suggestIngredientSubstitutions(input: IngredientSubstitutionInput): Promise<IngredientSubstitutionOutput> {
  return ingredientSubstitutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ingredientSubstitutionPrompt',
  input: {schema: IngredientSubstitutionInputSchema},
  output: {schema: IngredientSubstitutionOutputSchema},
  prompt: `You are a helpful recipe assistant. A user wants to make "{{recipeName}}", but some of the ingredients are not available. You will respond with ingredient substitutions.

Recipe Ingredients:
{{#each ingredients}}- {{this}}
{{/each}}

Unavailable Ingredients:
{{#each unavailableIngredients}}- {{this}}
{{/each}}

Suggest substitutions for the unavailable ingredients, and explain why each substitution works. Return the result as a JSON array of objects with "originalIngredient", "suggestedSubstitution", and "reason" fields.
`, // crucial new line
});

const ingredientSubstitutionFlow = ai.defineFlow(
  {
    name: 'ingredientSubstitutionFlow',
    inputSchema: IngredientSubstitutionInputSchema,
    outputSchema: IngredientSubstitutionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
