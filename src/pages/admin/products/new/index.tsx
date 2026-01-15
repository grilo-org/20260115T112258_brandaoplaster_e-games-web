import ProductForm from "@/components/admin/product-form";
import AdminComponent from "@/components/shared/admin-component";
import TitlePath from "@/components/shared/admin-subheader/title-path";
import withAuthAdmin from "@/components/with-auth-admin";
import ProductService from "@/services/product";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const New: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (product: FormData): Promise<void> => {
    try {
      if (!product.get("product[image]")) {
        toast.info("Image product is required");
        return;
      }

      await ProductService.create(product);
      toast.info("Product created successfully");
      router.back();
    } catch (error) {
      toast.error("Error saving product, try again.");
    }
  };
  return (
    <AdminComponent>
      <TitlePath title="New Product" path="dashboard > products > new" />

      <ProductForm handleSubmit={handleSubmit} />
    </AdminComponent>
  );
};

export default withAuthAdmin(New);
