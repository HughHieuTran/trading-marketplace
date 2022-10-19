import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  AuthPage,
  AddProduct,
  MyProducts,
  Profile,
  Stats,
  SharedLayout,
  Landing,
  ProtectedRoute,
  Error,
  PublicProducts,
  Order,
  Shop,
  ProductDetail,
  Cart,
} from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="stats" element={<Stats />} />
          <Route path="shop" element={<PublicProducts />} />
          <Route path="my-shop" element={<MyProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/PublicShop" element={<Shop />} />
        <Route path="product/:prodId" element={<ProductDetail />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
