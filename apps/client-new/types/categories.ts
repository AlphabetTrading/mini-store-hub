export interface Category {
  id: string;
  name: string;
  description: string;
  amharicName: string;
  amharicDescription: string;
  parentId: string;
  products: {
    id: string;
    name: string;
    description: string;
    amharicName: string;
    amharicDescription: string;
  };
  createdAt: string;
  updatedAt: string;
}
