import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faGhost } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryToEdit } from "@/store/modules/admin/category/reducer";
import { useRouter } from 'next/router';
import AdminComponent from '@/components/shared/admin-component';
import UrlService from '@/libs/urlservice';
import Category from '@/dtos/category';
import NoData from '@/components/shared/no-data';
import AdminSubHeader from '@/components/shared/admin-subheader';
import AdminDeleteModal from '@/components/shared/admin-delete-modal';
import withAuthAdmin from '@/components/with-auth-admin';
import CategoriesService from '@/services/categories';
import AdminListTable from '@/components/shared/admin-list-table';
import useSWR from "swr";

const defaultUrl = '/admin/v1/categories';

const List: React.FC = () => {
  const [show, setShow] = useState(false);
  const [categoryToRemove, setCategoryToRemove] = useState(0);
  const [url, setUrl] = useState(defaultUrl);
  const { data, error, mutate } = useSWR(url, CategoriesService.index);

  const search = useSelector(state => state.search);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setUrl(
      defaultUrl +
      UrlService.execute({ page: router.query.page || '', search })
    )
  }, [search, router.query.page]);

  const handleShow = (id: number): void => {
    setShow(true);
    setCategoryToRemove(id);
  }

  const handleClose = async (success: boolean): Promise<void> => {
    setShow(false);

    if (!success) return;

    try {
      await CategoriesService.delete(categoryToRemove);
      toast.info('Categoria removida com sucesso!');
      mutate();
    } catch (err) {
      toast.error('Ocorreu um erro ao remover uma categoria, tente novamente.');
    }
  }

  const handleEdit = (category: Category): void => {
    dispatch(setCategoryToEdit(category));
    router.push('/Admin/Categories/Edit');
  }

  if (error) {
    toast.error('Erro ao listar categorias');
  }

  return (
    <AdminComponent>
      <AdminSubHeader
        title="Categorias"
        path="Dashboard > Categorias"
        icon={faGhost}
        newPath="/Admin/Categories/New"
      />

      <AdminDeleteModal handleClose={handleClose} show={show} target="categoria" />

      {
        data && data.categories && data.categories.length > 0 ? (
          <AdminListTable first_title="Category Name" meta={data.meta}>
            {
              data.categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <div>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => handleEdit(category)}
                      />
                    </div>
                  </td>

                  <td>
                    <div>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleShow(category.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </AdminListTable>
        ) : (
          <NoData />
        )
      }
    </AdminComponent>
  )
}

export default withAuthAdmin(List);