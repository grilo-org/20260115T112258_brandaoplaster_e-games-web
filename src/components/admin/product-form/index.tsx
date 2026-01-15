import Product from "@/dtos/product";
import CategoriesService from "@/services/categories";
import SystemRequirementsService from "@/services/systemrequirements";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";
import styles from "./styles.module.css";
import { Col, Form, Row } from "react-bootstrap";
import ProductImage from "./product-image";
import StyleButton from "@/components/shared/style-button";
import { faGamepad, faTimes } from "@fortawesome/free-solid-svg-icons";

import { clearProductToEdit } from "@/store/modules/admin/product/reducer";

interface ProductFormProps {
  handleSubmit: (product: FormData) => Promise<void>;
  action?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  handleSubmit,
  action = "Add",
}) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState("false");
  const [categories, setCategories] = useState<number[]>([]);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("available");
  const [image, setImage] = useState<File>();

  const [mode, setMode] = useState("pve");
  const [releaseDate, setReleaseDate] = useState("");
  const [developer, setDeveloper] = useState("");

  const [systemRequirement, setSystemRequirement] = useState(1);

  const [productImage, setProductImage] = useState("");

  const product: Product = useSelector((state) => state.product);

  const router = useRouter();
  const dispatch = useDispatch();

  const { data, error } = useSWR(
    "/admin/v1/categories?length=999",
    CategoriesService.index
  );

  const { data: systemRequirementsData, error: systemRequirementsError } =
    useSWR(
      "/admin/v1/system_requirements?length=999",
      SystemRequirementsService.index
    );

  useEffect(() => {
    if (product && router.pathname.includes("edit")) {
      setName(product.name);
      setId(product.id);
      setDescription(product.description);
      setMode(product.mode);
      setDeveloper(product.developer);
      setReleaseDate(product.release_date.split("T")[0]);
      setPrice(product.price);
      setStatus(product.status);
      setProductImage(product?.image_url);
      setFeatured(product.featured);

      setCategories(product.categories.map((category) => category.id));
      setSystemRequirement(product?.system_requirements?.id ?? 1);
    }
  }, [product, router.pathname]);

  const handleFormSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    const formData = new FormData();

    formData.append("product[id]", id.toString());
    formData.append("product[name]", name);
    formData.append("product[description]", description);
    formData.append("product[price]", price.toString());
    formData.append("product[status]", status);
    formData.append("product[mode]", mode);
    formData.append("product[developer]", developer);
    formData.append("product[release_date]", releaseDate);
    formData.append("product[featured]", featured);
    formData.append(
      "product[system_requirement_id]",
      systemRequirement.toString()
    );
    formData.append("product[productable]", "game");

    categories.forEach((category) => {
      formData.append("product[category_ids][]", category.toString());
    });

    if (image) formData.append("product[image]", image);

    handleSubmit(formData);
  };

  const handleCategoriesSelect = (
    evt: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const options = evt.target.selectedOptions;
    if (options) {
      let selectedCategories: number[] = [];
      for (let i = 0; i < options.length; i++) {
        selectedCategories.push(parseInt(options[i].value));
      }
      setCategories(selectedCategories);
    }
  };

  if (error || systemRequirementsError) {
    toast.error("Error fetching data");
  }

  return (
    <div className={styles.admin_panel}>
      <Form className={styles.new_form} onSubmit={handleFormSubmit}>
        <Row>
          <ProductImage setImage={setImage} productImage={productImage} />

          <Col lg={8}>
            <Form.Row>
              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  className={styles.secundary_input}
                  value={name}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setName(evt.target.value)
                  }
                />
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product ID"
                  className={styles.secundary_input}
                  value={id}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setId(Number(evt.target.value))
                  }
                />
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Product description"
                  className={styles.secundary_input}
                  value={description}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription(evt.target.value)
                  }
                />
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>Categories</Form.Label>
                <Form.Control
                  as="select"
                  className={styles.secundary_input}
                  onChange={handleCategoriesSelect}
                  value={categories}
                  multiple
                  required
                >
                  {data?.categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>Mode</Form.Label>
                <Form.Control
                  as="select"
                  className={styles.secundary_input}
                  value={mode}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
                    setMode(evt.target.value)
                  }
                  required
                >
                  <option value="pve">PVE</option>
                  <option value="pvp">PVP</option>
                  <option value="both">Both</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>Featured</Form.Label>
                <Form.Control
                  as="select"
                  className={styles.secundary_input}
                  value={featured}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
                    setFeatured(evt.target.value)
                  }
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>Release Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Release Date"
                  className={styles.secundary_input}
                  value={releaseDate}
                  required
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setReleaseDate(evt.target.value)
                  }
                />
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Price"
                  className={styles.secundary_input}
                  value={price}
                  required
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setPrice(Number(evt.target.value))
                  }
                />
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  className={styles.secundary_input}
                  value={status}
                  required
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setStatus(evt.target.value)
                  }
                >
                  <option value="available">Disponíveloption</option>
                  <option value="unavailable">Indisponíveloption</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>Developer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Developer"
                  className={styles.secundary_input}
                  value={developer}
                  required
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setDeveloper(evt.target.value)
                  }
                />
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} className="p-2">
                <Form.Label>System Requirement</Form.Label>
                <Form.Control
                  as="select"
                  className={styles.secundary_input}
                  value={systemRequirement}
                  required
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
                    setSystemRequirement(Number(evt.target.value))
                  }
                >
                  {systemRequirementsData?.system_requirements.map(
                    (systemRequirement) => (
                      <option
                        value={systemRequirement.id}
                        key={systemRequirement.id}
                      >
                        {systemRequirement.name}
                      </option>
                    )
                  )}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <div className={styles.details_button}>
          <StyleButton
            icon={faGamepad}
            action={action}
            type_button="blue"
            type="submit"
          />

          <StyleButton
            icon={faTimes}
            action={"Cancel"}
            type_button="red"
            onClick={() => {
              dispatch(clearProductToEdit());
              router.back();
            }}
          />
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
