import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Category from "@/dtos/category"
import { clearCategoryToEdit } from "@/store/modules/admin/category/reducer";
import { faGhost, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";
import StyleButton from "@/components/shared/style-button";

interface CategoryFormProps {
  handleSubmit: (category: Category) => Promise<void>;
  action?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ handleSubmit, action = 'Add' }) => {
  const [name, setName] = useState('');
  const category = useSelector(state => state.category);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (category && router.pathname.includes('Edit')) {
      setName(category.name);
    }
  }, [category, router.pathname]);

  const handleFormSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();
    await handleSubmit({ id: category?.id, name });
  }

  return (
    <div className={styles.admin_panel}>
      <Form className={styles.new_form} onSubmit={handleFormSubmit}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category name"
          value={name}
          className={styles.secundary_input}
          required
          onChange={
            (evt: React.ChangeEvent<HTMLInputElement>) => setName(evt.target.value)
          }
        />

        <div className={styles.details_button}>
          <StyleButton
            icon={faGhost}
            action={action}
            type_button="blue"
            type="submit"
          />

          <StyleButton
            icon={faTimes}
            action={"Cancel"}
            type_button="red"
            onClick={() => {
              dispatch(clearCategoryToEdit());
              router.back();
            }}
          />
        </div>
      </Form>
    </div>
  )
}

export default CategoryForm;