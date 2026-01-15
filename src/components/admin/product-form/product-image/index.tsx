import { SetStateAction, useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { Dispatch } from "redux";
import styles from "./styles.module.css";
import StyleButton from "@/components/shared/style-button";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface ProductImageProps {
  productImage: string;
  setImage: Dispatch<SetStateAction<File>>;
}

const ProductImage: React.FC<ProductImageProps> = ({
  setImage,
  productImage,
}) => {
  const [imageToShow, setImageToShow] = useState("/assets/product-image.png");
  const imageInputRef = useRef(null);

  useEffect(() => {
    if (productImage) {
      setImageToShow(productImage);
    }
  }, [productImage]);

  const handleUpdateImage = (): void => {
    if (imageInputRef) {
      imageInputRef.current.click();
    }
  };

  const handleSetImage = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files[0];

    setImage(file);
    setImageToShow(URL.createObjectURL(file));
  };

  return (
    <Col lg={4}>
      <label htmlFor="image" className={styles.image_label}>
        <Image src={imageToShow} alt="Product image" className={styles.image} />

        <input
          type="file"
          id="image"
          name="product_image"
          hidden
          ref={imageInputRef}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            handleSetImage(evt)
          }
        />
      </label>

      <div className={styles.details_button}>
        <StyleButton
          icon={faArrowUp}
          action={"Update"}
          type_button="blue"
          onClick={handleUpdateImage}
        />
      </div>
    </Col>
  );
};

export default ProductImage;
