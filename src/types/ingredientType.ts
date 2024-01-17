export interface AddIngredient {
  name: string;
  expiredAt: string;
  memo: string;
}

export interface Ingredient extends AddIngredient {
  id: number;
}

// TODO: api 명세서에 suggest api 추가되면 작성할것
export interface Suggest {}

export interface IngredientEditList {
  id: number;
  memo: string;
}
