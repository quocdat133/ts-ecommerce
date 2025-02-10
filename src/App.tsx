import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./style/index.css";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import EditProductPage from "./pages/EditProductPage/EditProductPage";
import PrivateRoute from "./routes/PrivateRoute";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MyOrder from "./pages/MyOrder/MyOrder";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CartPage from "./pages/CartPage/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product-detail" element={<ProductDetailPage />} />
        <Route path="/profile-user" element={<ProfilePage />} />
        <Route path="/my-order" element={<MyOrder />} />
        <Route path="/profile-user" element={<ProfilePage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute component={AdminPage} requiredRole={["ADMIN"]} />
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <PrivateRoute
              component={EditProductPage}
              requiredRole={["ADMIN"]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
