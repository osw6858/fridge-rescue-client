export interface SearchKeyWord {
  author: {
    id: number;
    nickname: string;
    role: string;
  };
  createdAt: string;
  id: number;
  imageUrl: string;
  reviewCount: number;
  summary: string;
  title: string;
  viewCount: number;
}
