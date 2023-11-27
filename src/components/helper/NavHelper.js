import { Link } from "react-router-dom";

export const ProductListItems = () => [
  {
    title: <Link to={"/"}>Home</Link>,
  },
  {
    title: "Product",
  },
];

export const ProductDetailsItems = (singleProduct) => [
  {
    title: <Link to={"/"}>Home</Link>,
  },
  {
    title: <Link to={"/product"}>Product</Link>,
  },
  {
    title: (
      <Link to={`/product-category/${singleProduct.category}`}>
        {singleProduct.category}
      </Link>
    ),
  },
  {
    title: singleProduct.title,
  },
];
