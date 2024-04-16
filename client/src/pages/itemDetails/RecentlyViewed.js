import styles from './RecentlyViewed.module.scss';
import ItemCard from '../../components/ItemCard/ItemCard';
import { useEffect, useState } from 'react';

const RecentlyViewed = ({ item }) => {
	const [viewedList, setViewedList] = useState([]);

	// Updates the list of recently viewed items.
	const updateRecentlyViewed = () => {
		// Get the existing list from local storage or initialize a new one.
		const storedList = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

		// Filter out the current item if it's already in the list to prevent duplicates.
		const filteredList = storedList.filter(storedItem => JSON.stringify(storedItem) !== JSON.stringify(item));

		// Add the current item to the front of the list.
		const updatedList = [item, ...filteredList].slice(0, 4); // Keep only the last 4 items

		// Update local storage and the state.
		localStorage.setItem('recentlyViewed', JSON.stringify(updatedList));
		setViewedList(updatedList);
	}

	// Initialize local storage on component mount and update list on item change.
	useEffect(() => {
		if (!localStorage.getItem('recentlyViewed')) {
			localStorage.setItem('recentlyViewed', JSON.stringify([]));
		}
		if (item) {
			updateRecentlyViewed();
		}
	}, [item]);

	return (
		<div className={styles.recentlyViewed}>
			{viewedList.length > 0 && (
				<>
					<h3 className={styles.listTitle}>Recently Viewed</h3>
					<div className={styles.itemList}>
						{viewedList.map((item, index) => (
							<div className={styles.itemCard} key={index}>
								<ItemCard item={item} />
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default RecentlyViewed;