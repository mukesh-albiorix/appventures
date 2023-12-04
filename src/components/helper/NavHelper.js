import { Link } from "react-router-dom";

export const ProductListItems = (pageName) => [
  {
    title: <Link to={"/"}>Home</Link>,
  },
  {
    title: pageName,
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
      <Link to={`/category/${singleProduct.category}`}>
        {singleProduct.category}
      </Link>
    ),
  },
  {
    title: singleProduct.title,
  },
];
