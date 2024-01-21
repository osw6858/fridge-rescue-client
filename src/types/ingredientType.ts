export interface FridgeIngredient {
  id: number;
  name: string;
  expiredAt: string;
  memo: string;
}

export interface Ingredient {
  message: string;
  data: {
    fridgeIngredientInfoList: FridgeIngredient[];
    id: number;
  };
}

export type Suggest = string[];

export interface IngredientEditList {
  id: number;
  memo: string;
}
