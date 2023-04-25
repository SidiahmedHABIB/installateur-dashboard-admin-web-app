export interface ImageModel {
  id: number;
  name: string;
  imageData: string;
  type: string;
  creatAt: Date;
  upadateAt: Date;
}
export interface PageImageModel {
  images: ImageModel[];
  totalPages: number;
}
