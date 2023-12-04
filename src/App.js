import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./pages/productListing/ProductList";
import ProductDetails from "./pages/productListing/ProductDetails";
import { LoaderContextProvider } from "./context/LoaderContext";
import Loader from "./components/loader/Loader";
import ProductCategory from "./pages/productCategory/ProductCategory";
import Login from "./pages/loginPage/Login";
import Header from "./components/header/Header";
import { useState } from "react";
import Protected from "./components/Protected";

function App() {
  // const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="App">
      <LoaderContextProvider>
        <Header />
        <Loader />
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<ProductList />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<ProductCategory />} />
        </Routes>
      </LoaderContextProvider>
    </div>
  );
}

export default App;
