import './App.scss';
import { Container } from "react-bootstrap";
import TableUsers from "./components/TableUsers";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/Home';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import ScrollToUp from './components/ScrollToUp';
import Shop from './components/Shop';
import { AnimatePresence } from 'framer-motion';
import Product from './components/admin/Product';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <ScrollToUp />
          <Routes>
            <Route path='/home' element={<HomePage />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/" element={<Login />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/admin/products' element={<Product />} />
          </Routes>
        </Container>
        <Footer />

      </div>
      {/* <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"/> */}
    </>
  );
}

export default App;
