import Meta from "@/dtos/meta";
import Product from "@/dtos/product";
import api from "./api";

interface IProductIndexData {
  products: Product[];
  meta: Meta;
}

const ProductService = {
  index: (url: string) => {
    return api.get<IProductIndexData>(url).then((response) => response.data);
  },

  create: (product: FormData) => {
    return api.post<void>("admin/v1/products", product)
  },

  update: (product: FormData) => {
    return api.put<void>(`admin/v1/products/${product.get('product[id]')}`, product)
  },

  delete: (id: number) => {
    return api.delete(`admin/v1/products/${id}`)
  }
}

export default ProductService;
