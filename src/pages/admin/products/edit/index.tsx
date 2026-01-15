import withAuthAdmin from "@/components/with-auth-admin";
import ProductService from "@/services/product";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearProductToEdit } from "@/store/modules/admin/product/reducer";
import AdminComponent from "@/components/shared/admin-component";
import TitlePath from "@/components/shared/admin-subheader/title-path";
import ProductForm from "@/components/admin/product-form";

const Edit: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (product: FormData): Promise<void> => {
    try {
      await ProductService.update(product);

      toast.info("Product updated successfully");
      dispatch(clearProductToEdit());
      router.back();
    } catch (error) {
      toast.error("Error updating product, try again.");
    }
  };

  return (
    <AdminComponent>
      <TitlePath title="Edit Product" path="dashboard > products > edit" />
      <ProductForm handleSubmit={handleSubmit} />
    </AdminComponent>
  );
};

export default withAuthAdmin(Edit);
