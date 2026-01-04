import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import InventoryTypePage from './pages/InventoryTypePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/juna-sona"
          element={<InventoryTypePage inventoryType="Juna Sona" title="Juna Sona - Gold Old" />}
        />
        <Route
          path="/juna-sona/:category"
          element={<InventoryTypePage inventoryType="Juna Sona" title="Juna Sona - Gold Old" />}
        />
        <Route
          path="/naya-sona"
          element={<InventoryTypePage inventoryType="Naya Sona" title="Naya Sona - Gold New" />}
        />
        <Route
          path="/naya-sona/:category"
          element={<InventoryTypePage inventoryType="Naya Sona" title="Naya Sona - Gold New" />}
        />
        <Route
          path="/order-cancelled-product"
          element={<InventoryTypePage inventoryType="Order Cancelled Product" title="Order Cancelled Product" />}
        />
        <Route
          path="/order-cancelled-product/:category"
          element={<InventoryTypePage inventoryType="Order Cancelled Product" title="Order Cancelled Product" />}
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
