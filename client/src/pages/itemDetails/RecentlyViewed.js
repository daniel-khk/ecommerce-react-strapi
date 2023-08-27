import styles from './RecentlyViewed.module.scss';
import ItemCard from '../../components/ItemCard/ItemCard';
import { useEffect, useState } from 'react';


function RecentlyViewed({ item }) {
	// Component that shows Recently Viewed list using local storage.
	// The current page item will not be shown on the list but will be reserved and appear at the front of the list when viewing the next item.
	// If an item is viewed and the equivalent item is already on the list,
	// it will be removed from its previous position and the revisited item will be reserved and appear at the front of the list.
	// css has to include direction:rtl to work properly.

	const [viewedList, setViewedList] = useState(null);

	async function recentlyViewed() {
		let viewed = await JSON.parse(localStorage.getItem('recentlyViewed'));
		let unique = [];
		let final = [];
		viewed.push(item);
		viewed = viewed.slice(-6);
		viewed.map((item, i) => {
			if (unique.length === 0) {
				unique.push(item);
				final = null;
			}
			else {
				if (!unique.map(JSON.stringify).includes(JSON.stringify(item))) {
					unique.push(item);
					final = unique.slice(0, -1);
					final = final.slice(-4);
				}
				else {
					let index = unique.map(JSON.stringify).indexOf(JSON.stringify(item));
					unique.splice(index, 1);
					unique.push(item);
					final = unique.slice(0, -1);
					final = final.slice(-4);
				}
			}
		})
		localStorage.setItem('recentlyViewed', JSON.stringify(unique));
		setViewedList(final);;
	}

	useEffect(() => {
		// Creating an initial localStorage empty array in order to store recently viewed items.
		if (localStorage.getItem('recentlyViewed') == null) {
			localStorage.setItem('recentlyViewed', JSON.stringify([]));
		}
	}, [item]);

	useEffect(() => {
		if (item != null) {
			recentlyViewed();
		}
	}, [item]);

	return (
		<div className={styles.container}>
			{
				viewedList !== null
					? <>
						<h3 className={styles.listTitle}>Recently Viewed</h3>
						<div className={styles.itemList}>
							{viewedList.map((item, i) => {
								return (
									<div className={styles.itemCard} key={i}>
										<ItemCard item={item} />
									</div>
								)
							})}
						</div>
					</>
					: null
			}
		</div>
	);
}

export default RecentlyViewed;