import Dashboard from "./components/dashboards/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import Signup from "./components/common/Signup";
import Login from "./components/common/Login";
import ViewDetails from "./components/common/ViewDetails";
import ProtectedRoute from "./components/protected route/ProtectedRoute";
import UsersList from "./components/admin pages/UsersList";
import Layout from "./components/common/Layout";
import OrdersList from "./components/admin pages/OrdersList";
import Categories from "./components/common/Categories";
import Products from "./components/common/Products";
import ViewProductDetails from "./components/common/ViewProductDetails";
import UserDashboard from "./components/dashboards/UserDashboard";
import ViewCart from "./components/user pages/ViewCart";
import ViewOrders from "./components/user pages/ViewOrders";
import ConfirmOrders from "./components/user pages/ConfirmOrders";
import Chatbot from "./components/common/Chatbot";
import ForgotPassword from "./components/common/ForgotPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/admin" element={
              <ProtectedRoute requiredRole="ADMIN">
                <Layout />
              </ProtectedRoute>
            }>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<ViewDetails />} />
            <Route path="users" element={<UsersList />}/>
            <Route path="orders" element={<OrdersList />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products/category/:catName" element={<Products />} />
            <Route path="products/view/:id" element={<ViewProductDetails />} />
          </Route>
          <Route path="/user" element={
              <ProtectedRoute requiredRole="USER">
                <Layout />
              </ProtectedRoute>
            }>
            <Route index element={<UserDashboard />} />
            <Route path="profile" element={<ViewDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products/category/:catName" element={<Products />} />
            <Route path="products/view/:id" element={<ViewProductDetails />} />
            <Route path="view/cart" element={<ViewCart />} />
            <Route path="orders" element={<ViewOrders />} />
            <Route path="confirm/order/:oid" element={<ConfirmOrders />} />
          </Route>
      </Routes>   
      </BrowserRouter>
    </div>
  );
}

export default App;
