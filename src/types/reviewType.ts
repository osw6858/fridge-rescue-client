export interface Review {
  author: { id: number; nickname: string; role: string };
  contents: string;
  id: number;
  imageUrl: string;
  title: string;
  createdAt: string;
}
