import CategoryForm from "@/components/admin/category-form";
import AdminComponent from "@/components/shared/admin-component";
import TitlePath from "@/components/shared/admin-subheader/title-path";
import withAuthAdmin from "@/components/with-auth-admin";
import Category from "@/dtos/category";
import CategoriesService from "@/services/categories";
import { useRouter } from "next/router";
import { toast } from "react-toastify";


const New: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async ({ name }: Category): Promise<void> => {
    try {
      await CategoriesService.create(name);
      toast.info("Category created successfully!");
      router.back();
    } catch (error) {
      toast.error("Error creating category!");
    }
  }

  return (
    <AdminComponent>
      <TitlePath title="Add Category" path="dashboard > categories > add category" />
      <CategoryForm handleSubmit={handleSubmit} action="Add" />
    </AdminComponent>
  )
}

export default withAuthAdmin(New);