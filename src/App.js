import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./pages/productListing/ProductList";
import ProductDetails from "./pages/productListing/ProductDetails";
import { LoaderContextProvider } from "./context/LoaderContext";
import Loader from "./components/loader/Loader";
import ProductCategory from "./pages/productCategory/ProductCategory";

function App() {
  return (
    <div className="App">
      <LoaderContextProvider>
        <Loader />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/product-category/:category"
            element={<ProductCategory />}
          />
        </Routes>
      </LoaderContextProvider>
    </div>
  );
}

export default App;
