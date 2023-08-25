import { useDispatch } from 'react-redux';
import { setItems } from '../store/itemsSlice';
import { useEffect } from 'react';


function GetItemsApi() {
	const dispatch = useDispatch();

	async function getItems() {
		try {
			const items = await fetch(
				"http://localhost:1337/api/items?populate=*&sort=createdAt:desc",
				{ method: "GET" }
			);
			const itemsJson = await items.json();

			if(!items.ok) {
				console.log("getItemsApi fetch error");
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
}

export default GetItemsApi;