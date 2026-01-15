import AdminComponent from "@/components/shared/admin-component";
import AdminDeleteModal from "@/components/shared/admin-delete-modal";
import AdminListTable from "@/components/shared/admin-list-table";
import AdminSubHeader from "@/components/shared/admin-subheader";
import TitlePath from "@/components/shared/admin-subheader/title-path";
import NoData from "@/components/shared/no-data";
import withAuthAdmin from "@/components/with-auth-admin";
import Product from "@/dtos/product";
import UrlService from "@/libs/urlservice";
import ProductService from "@/services/product";
import { setProductToEdit } from "@/store/modules/admin/product/reducer";
import { faEdit, faGamepad, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";

const List: React.FC = () => {
  const defaultUrl = "/admin/v1/products";

  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [productToRemove, setProductToRemove] = useState(0);

  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, error, mutate } = useSWR(url, ProductService.index);

  useEffect(() => {
    setUrl(
      defaultUrl + UrlService.execute({ page: router.query.page || "", search })
    );
  }, [search, router.query.page]);

  const handleShow = (id: number) => {
    setShow(true);
    setProductToRemove(id);
  };

  const handleClose = async (sucess: boolean): Promise<void> => {
    setShow(false);
    if (!sucess) return;

    try {
      await ProductService.delete(productToRemove);
      toast.info("Product removed with success!");
      mutate();
    } catch (error) {
      toast.error("Error removing product!");
    }
  };

  const handleEdit = (product: Product): void => {
    dispatch(setProductToEdit(product));
    router.push("/admin/products/edit");
  };

  if (error) {
    toast.error("Error listing products");
  }

  return (
    <AdminComponent>
      <AdminSubHeader
        title="Products"
        path="dashboard > products"
        icon={faGamepad}
        newPath="/admin/products/new"
      />

      <AdminDeleteModal
        handleClose={handleClose}
        show={show}
        target="products"
      />

      {data && data.products && data.products.length > 0 ? (
        <AdminListTable
          fifth_title="Name"
          second_title="Category"
          third_title="Code"
          fourth_title="Status"
          meta={data.meta}
        >
          {data.products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                {product.categories.map(
                  (category, index) =>
                    `${
                      category.name +
                      (index === product.categories.length - 1 ? "" : ", ")
                    }`
                )}
              </td>
              <td>{`#${product.id}`}</td>
              <td>
                {product.status === "available" ? "Disponível" : "Indisponível"}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => handleEdit(product)}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleShow(product.id)}
                />
              </td>
            </tr>
          ))}
        </AdminListTable>
      ) : (
        <NoData />
      )}
    </AdminComponent>
  );
};

export default withAuthAdmin(List);
