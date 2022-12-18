import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import styles from "../../styles/Form.module.css";

interface IProductVariation {
  variation: string;
  price: number | null;
}

interface INewProduct {
  productName: string;
  product: IProductVariation[];
  productDetail: string;
  productImage: string[];
}

const ManageProducts = () => {
  const [newProduct, setNewProduct] = React.useState<INewProduct>({
    productName: "",
    product: [],
    productDetail: "",
    productImage: [],
  });

  const [variations, setVariations] = React.useState<IProductVariation>({
    variation: "",
    price: null,
  });

  const [previewImage, setPreviewImage] = React.useState<Array<string>>([]);

  const [hasVariation, setHasVariation] = React.useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      setNewProduct((prev: any) => {
        return {
          ...prev,
          product: [
            {
              variations: "",
              [name]: value,
            },
          ],
        };
      });
      return;
    }

    if (name === "productImage")
      if (e.target.files) {
        for (let i = 0; i < e.target.files.length; i++) {
          previewImage.push(URL.createObjectURL(e.target.files[i]));
        }
      }

    setNewProduct((prev) => {
      return {
        ...prev,
        [name]: name === "productImage" ? e.target.files : value,
      };
    });
  };

  const handleVariation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVariations((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addVariation = () => {
    setNewProduct((prev) => {
      return {
        ...prev,
        product: [...prev.product, variations],
      };
    });
    setVariations({
      variation: "",
      price: 0,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (
      newProduct.product.length == 0 ||
      !newProduct.productDetail ||
      newProduct.productImage.length == 0 ||
      !newProduct.productName
    ) {
      toast.error("Enter all the fields!");
      return;
    }

    const formData = new FormData();
    formData.append("productName", newProduct.productName);
    formData.append("product", JSON.stringify(newProduct.product));
    formData.append("productDetail", newProduct.productDetail);
    Object.values(newProduct.productImage).forEach((file) => {
      return formData.append("productImage", file);
    });

    try {
      await axios.post(`/product/?type=product`, formData);
      toast.success("Your product added!");
    } catch (e: any) {
      console.log(e);
      toast.error("Please enter all the fields!");
    }
  };

  return (
    <form
      style={{ marginTop: "50px", minHeight: "85vh" }}
      className={styles.form}
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 style={{ textAlign: "center" }}>Add Product</h1>

      <input
        onChange={(e) => handleChange(e)}
        type="text"
        name="productName"
        placeholder="Product Name"
      />

      <label className={styles.formLabel} htmlFor="files">
        Select Product Image
      </label>
      <input
        onChange={(e) => handleChange(e)}
        name="productImage"
        type="file"
        id="files"
        multiple
        style={{
          display: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {previewImage.length > 0 &&
          previewImage.map((image, index) => {
            return (
              <div
                style={{
                  position: "relative",
                }}
                key={index}
              >
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  src={image}
                  alt="img"
                />
                <p
                  style={{
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    position: "absolute",
                    left: "18px",
                    top: "8px",
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => {
                    previewImage.length > 0 &&
                      setPreviewImage((prev) => {
                        return prev.filter((el, ind) => ind !== index);
                      });
                    newProduct.productImage.length > 0 &&
                      setNewProduct((prev) => {
                        return {
                          ...prev,
                          productImage: Array.from(prev.productImage).filter(
                            (file, ind) => {
                              return ind !== index;
                            }
                          ),
                        };
                      });
                  }}
                >
                  DEL?
                </p>
              </div>
            );
          })}
      </div>

      <input
        onChange={(e) => handleChange(e)}
        type="text"
        name="productDetail"
        placeholder="Product Detail"
      />

      {hasVariation && (
        <>
          <input
            onChange={(e) => handleVariation(e)}
            type="text"
            name="variation"
            placeholder="variation"
            value={variations.variation}
          />
          <input
            onChange={(e) => handleVariation(e)}
            type="number"
            name="price"
            placeholder="price"
          />
        </>
      )}
      {hasVariation && (
        <p
          style={{
            color: "blueviolet",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={addVariation}
        >
          Add this Variation!
        </p>
      )}

      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {hasVariation &&
          newProduct.product.map((variation, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
                key={index}
              >
                <p>
                  <b>{variation.variation}</b>
                </p>
                <p>{variation.price}</p>
                <p
                  style={{
                    color: "red",
                    fontSize: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setNewProduct((prev) => {
                      return {
                        ...prev,
                        product: prev.product.filter(
                          (el, ind) => ind !== index
                        ),
                      };
                    });
                  }}
                >
                  DEL?
                </p>
              </div>
            );
          })}
      </div>

      {!hasVariation && (
        <input
          onChange={(e) => handleChange(e)}
          type="number"
          name="price"
          placeholder="price"
        />
      )}

      <p>
        {!hasVariation ? (
          <span>This product has variations?</span>
        ) : (
          <span>This product doesn&apos;t have variations?</span>
        )}
        <span
          style={{
            color: "blueviolet",
            cursor: "pointer",
            marginLeft: "5px",
          }}
          onClick={() => {
            setNewProduct((prev) => {
              return {
                ...prev,
                product: [],
              };
            });
            setHasVariation((prev) => !prev);
          }}
        >
          Click here!
        </span>
      </p>

      <button className={styles.formButton} type="submit">
        Add
      </button>
    </form>
  );
};

export default ManageProducts;
