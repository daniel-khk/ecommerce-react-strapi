import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './global/navbar/Navbar';
import Home from './pages/home/Home';
import Footer from './global/footer/Footer';
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

	// Fetch items from the server when the component mounts
	const getItems = async () => {
		try {
			const itemsResponse = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/api/items?populate=*&sort=createdAt:desc`,
				{ method: "GET" }
			);

			if (!itemsResponse.ok) {
				console.error("Error fetching items from API (getItems)");
				return;
			}

			const itemsJson = await itemsResponse.json();
			dispatch(setItems(itemsJson.data));
		} catch (error) {
			console.error("Error fetching items (getItems):", error);
		}
	}

	// Fetch items when component mounts
	useEffect(() => {
		getItems();
	}, []);

	// Calculate cart total when the cartItems change
	useEffect(() => {
		dispatch(calculateTotal());
	}, [cartItems]);

	return (
		<div>
			<BrowserRouter>
				<ScrollToTop />
				<Navbar />
				<main className='main-container'>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/products/:category" element={<ItemList />} />
						<Route path="/products/detail/:productId" element={<ItemDetails />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/checkout/success" element={<Success />} />
						<Route path="/checkout/fail" element={<Fail />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
