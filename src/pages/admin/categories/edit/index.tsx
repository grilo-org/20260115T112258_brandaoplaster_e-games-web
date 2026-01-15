import CategoryForm from "@/components/admin/category-form";
import AdminComponent from "@/components/shared/admin-component";
import TitlePath from "@/components/shared/admin-subheader/title-path";
import withAuthAdmin from "@/components/with-auth-admin";
import Category from "@/dtos/category";
import CategoriesService from "@/services/categories";
import { clearCategoryToEdit } from "@/store/modules/admin/category/reducer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Edit: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (category: Category): Promise<void> => {
    try {
      await CategoriesService.update(category);

      toast.info("Category updated successfully!");
      dispatch(clearCategoryToEdit());

      router.back();
    } catch (error) {
      toast.error("Error updating category!");
    }
  };

  return (
    <AdminComponent>
      <TitlePath
        title="Update Category"
        path="dashboard > categories > update category"
      />
      <CategoryForm handleSubmit={handleSubmit} action="update" />
    </AdminComponent>
  );
};

export default withAuthAdmin(Edit);
