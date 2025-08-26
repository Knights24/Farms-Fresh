import RecipeGenerator from "@/components/recipe-generator";

export default function RecipesPage() {
  return (
    <div className="space-y-8">
       <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary-foreground tracking-tight">
          Recipe Recommendations
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover delicious recipes based on the items in your cart. Let our AI chef inspire you!
        </p>
      </div>
      <RecipeGenerator />
    </div>
  );
}
