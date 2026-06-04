import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyListingsPage from "./pages/MyListingsPage";
import CreateListingPage from "./pages/CreateListingPage";
import EditListingPage from "./pages/EditListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/my-listings" element={<MyListingsPage />} />

      <Route path="/create-listing" element={<CreateListingPage />} />

      <Route path="/edit-listing/:id" element={<EditListingPage />} />

      <Route path="/listings/:id" element={<ProductDetailsPage />} />

      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center">
            <h1>404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;