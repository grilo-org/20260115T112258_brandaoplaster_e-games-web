import Category from "@/dtos/category";
import Meta from "@/dtos/meta";
import api from "./api";

interface CategoryIndexData {
  categories: Category[];
  meta: Meta;
}

const CategoriesService = {
  index: (url: string) => {
    return api.get<CategoryIndexData>(url).then((response) => response.data);
  },

  create: (name: string) => {
    return api.post<void>("/admin/v1/categories", { category: { name } });
  },

  update: ({ id, name }: Category) => {
    return api.put<void>(`/admin/v1/categories/${id}`, { category: { name } });
  },

  delete: (id: number) => {
    return api.delete<void>(`/admin/v1/categories/${id}`);
  },
};

export default CategoriesService;
