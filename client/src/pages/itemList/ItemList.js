import styles from './ItemList.module.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ItemCard from '../../components/ItemCard/ItemCard';


const ItemList = () => {
	const { category } = useParams(); // Retrieve the current category from the URL parameters
	const allItems = useSelector((state) => state.items.items); // Fetch all items from the Redux store
	const [items, setItems] = useState([]);

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12; // Number of items to display per page
	const lastIndex = currentPage * itemsPerPage; // Index of the last item on the current page
	const visibleItems = items.slice(0, lastIndex); // Items to display on the current page

	// Function to handle "View More" button click to load more items
	const nextPage = () => {
		if (lastIndex < items.length) {
			setCurrentPage(currentPage + 1);
		}
	}

	// Update the items list whenever the category changes or allItems are updated
	useEffect(() => {
		const filteredItems = category === "all" ? allItems : allItems.filter(item => item.attributes.category === category);
		setItems(filteredItems);
		setCurrentPage(1);
	}, [category, allItems]);

	return (
		<section className={styles.itemList}>
			<div className={`${styles.itemListContainer}`}>
				{visibleItems?.map((item, i) => {
					return (
						<div className={styles.itemCard} key={i}>
							<ItemCard item={item} />
						</div>
					)
				})}
			</div>
			{lastIndex < items.length
				&& <div className={styles.loadMoreBtn}><button onClick={() => { nextPage() }}>View More <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#222222" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
				</svg>
				</button></div>
			}
		</section>
	);
}

export default ItemList;