export interface Member {
  id: number;
  nickName: string;
}

export interface Recipe {
  author: DetailRecipe['author'];
  createdAt: string;
  id: number;
  imageUrl: string;
  reviewCount: number;
  summary: string;
  title: string;
  viewCount: number;
}

export interface DetailRecipe {
  author: {
    id: number;
    nickname: string;
    role: string;
  };
  bookmarkCount: number;
  createAt: string;
  id: number;
  recipeImageUrl: string;
  recipeIngredients: {
    name: string;
    amount: string;
  };
  recipeSteps: {
    stepDescription: string;
    stepImageUrl: string;
    stepNo: number;
    stepTip: string;
  };
  reportCount: number;
  reviewCount: number;
  summary: string;
  title: string;
  viewCount: number;
}

export type RecipeSteps = DetailRecipe['recipeSteps'];
export type Ingredient = DetailRecipe['recipeIngredients'];
