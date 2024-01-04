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
