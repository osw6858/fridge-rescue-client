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

// TODO: api 명세서에 suggest api 추가되면 작성할것
export interface Suggest {}
