import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './pages/global/Navbar';
import Home from './pages/home/Home';
import Footer from './pages/global/Footer';
import ItemList from './pages/itemList/ItemList';
import ItemDetails from './pages/itemDetails/ItemDetails';
import { setItems } from './store/itemsSlice';
import Cart from './pages/cart/Cart';
import Success from './pages/checkout/Success';
import Fail from './pages/checkout/Fail';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal } from './store/cartSlice';


function App() {
	const { cartItems } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	async function getItems() {
		try {
			const items = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/api/items?populate=*&sort=createdAt:desc`,
				{ method: "GET" }
			);
			const itemsJson = await items.json();
			if(!items.ok) {
				console.log("getItems() api fetch error");
				return;
			}
			dispatch(setItems(itemsJson.data));
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getItems();
	}, []);

	useEffect(() => {
		// For calculating cart items.
		dispatch(calculateTotal());
	}, [cartItems]);

	return (
		<div className="App">
			<BrowserRouter>
				<ScrollToTop />
				<Navbar />
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
