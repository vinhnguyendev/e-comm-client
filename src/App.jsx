import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Customer from "./pages/Customer";
import Order from "./pages/Order";
import Coupon from "./pages/Coupon";
import Settings from "./pages/Settings";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" element={<Product />} />
            <Route path="category" element={<Category />} />
            <Route path="customer" element={<Customer />} />
            <Route path="order" element={<Order />} />
            <Route path="coupon" element={<Coupon />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
