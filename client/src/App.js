import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './pages/global/Navbar';
import Home from './pages/home/Home';
import Footer from './pages/global/Footer';
import ItemList from './pages/itemList/ItemList';
import ItemDetails from './pages/itemDetails/ItemDetails';
import GetItemsApi from './components/GetItemsApi';
import Cart from './pages/cart/Cart';
import Success from './pages/checkout/Success';
import Fail from './pages/checkout/Fail';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal } from './store/cartSlice';


function App() {
	const { cartItems } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		// For calculating cart items.
		dispatch(calculateTotal());
	}, [cartItems]);

	return (
		<div className="App">
			<BrowserRouter>
				<ScrollToTop />
				<Navbar />
				<GetItemsApi />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products/:category" element={<ItemList />} />
					<Route path="/products/detail/:productId" element={<ItemDetails />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout/success" element={<Success />} />
					<Route path="/checkout/fail" element={<Fail />} />			
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
