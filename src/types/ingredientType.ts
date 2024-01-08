export interface AddIngredient {
  name: string;
  expiredAt: string;
  memo: string;
}

export interface Ingredient extends AddIngredient {
  id: number;
}
