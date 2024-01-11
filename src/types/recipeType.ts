export interface Member {
  id: number;
  nickName: string;
}

export interface Recipe {
  id: number;
  title: string;
  summary: string;
  recipeImageUrl: string;
  reviewCount: number;
  createdAt: string;
  member: Member;
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
    stepContents: string;
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
