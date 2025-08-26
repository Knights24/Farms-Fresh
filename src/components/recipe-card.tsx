'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  suggestIngredientSubstitutions,
  type IngredientSubstitutionOutput,
} from '@/ai/flows/ingredient-substitution';
import { Loader2, Replace } from 'lucide-react';
import type { RecipeSuggestionsOutput } from '@/ai/flows/recipe-suggestions';

interface RecipeCardProps {
  recipe: RecipeSuggestionsOutput['recipes'][0];
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [substitutions, setSubstitutions] = useState<
    IngredientSubstitutionOutput['substitutedIngredients']
  >([]);
  const [isLoadingSubstitutions, setIsLoadingSubstitutions] = useState(false);

  const handleCheckboxChange = (ingredient: string, checked: boolean) => {
    setSelectedIngredients((prev) =>
      checked ? [...prev, ingredient] : prev.filter((i) => i !== ingredient)
    );
  };

  const handleFindSubstitutions = async () => {
    setIsLoadingSubstitutions(true);
    setSubstitutions([]);
    try {
      const result = await suggestIngredientSubstitutions({
        recipeName: recipe.name,
        ingredients: recipe.ingredients,
        unavailableIngredients: selectedIngredients,
      });
      setSubstitutions(result.substitutedIngredients);
    } catch (error) {
      console.error('Failed to get substitutions', error);
    } finally {
      setIsLoadingSubstitutions(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{recipe.name}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Replace className="mr-2 h-4 w-4" />
            Find Ingredient Substitutions
          </Button>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Ingredients</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-1 pl-5">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Instructions</AccordionTrigger>
              <AccordionContent className="whitespace-pre-line leading-relaxed">
                {recipe.instructions}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Find Substitutions</DialogTitle>
            <DialogDescription>
              Select the ingredients you don't have for {recipe.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {recipe.ingredients.map((ingredient, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox
                  id={`ing-${i}`}
                  onCheckedChange={(checked) => handleCheckboxChange(ingredient, !!checked)}
                />
                <Label htmlFor={`ing-${i}`}>{ingredient}</Label>
              </div>
            ))}
          </div>
          {substitutions.length > 0 && (
            <div className="space-y-4 rounded-md border p-4">
              <h4 className="font-semibold">Suggestions:</h4>
              <ul className="space-y-2">
                {substitutions.map((sub, i) => (
                  <li key={i}>
                    <p>
                      <strong>For {sub.originalIngredient}:</strong> try{' '}
                      <Badge variant="secondary">{sub.suggestedSubstitution}</Badge>
                    </p>
                    <p className="text-sm text-muted-foreground">{sub.reason}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={handleFindSubstitutions}
              disabled={selectedIngredients.length === 0 || isLoadingSubstitutions}
            >
              {isLoadingSubstitutions ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Replace className="mr-2 h-4 w-4" />
              )}
              Find Substitutions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
