'use client';

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { getRecipeSuggestions, type RecipeSuggestionsOutput } from '@/ai/flows/recipe-suggestions';
import { Lightbulb, Loader2 } from 'lucide-react';
import RecipeCard from './recipe-card';
import { Card, CardContent } from './ui/card';

export default function RecipeGenerator() {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<RecipeSuggestionsOutput['recipes']>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipes = async () => {
    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const result = await getRecipeSuggestions({
        cartItems: cartItems.map((item) => `${item.quantity}x ${item.name}`),
      });
      setRecipes(result.recipes);
    } catch (e) {
      setError('Sorry, we couldn\'t generate recipes at this time. Please try again later.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const hasItems = cartItems.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6 text-center">
            {!hasItems ? (
                 <p className="text-muted-foreground">Add items to your cart to get recipe suggestions.</p>
            ) : (
                <Button onClick={handleGenerateRecipes} disabled={loading || !hasItems}>
                {loading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                    </>
                ) : (
                    <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Suggest Recipes
                    </>
                )}
                </Button>
            )}
        </CardContent>
      </Card>
      
      {error && <p className="text-destructive text-center mt-4">{error}</p>}

      {recipes.length > 0 && (
        <div className="mt-8 space-y-6">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
