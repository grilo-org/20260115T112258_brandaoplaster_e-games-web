import Category from "./category";
import SystemRequirement from "./systemRequirement";

export default interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  image_url: string;
  productable: string;
  mode: string;
  developer: string;
  release_date: string;
  featured: string;
  categories: Category[];
  system_requirements: SystemRequirement;
}
