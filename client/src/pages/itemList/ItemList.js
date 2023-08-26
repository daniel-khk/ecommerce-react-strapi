import styles from './ItemList.module.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ItemCard from '../../components/ItemCard/ItemCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function ItemList() {
	const { category } = useParams();
	const allItems = useSelector((state) => state.items.items);
	const match = allItems.filter((item) => item.attributes.category === category);
	const [items, setItems] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;
	const lastIndex = currentPage * itemsPerPage;
	const visibleItems = items.slice(0, lastIndex);

	function nextPage() {
		if(currentPage !== lastIndex) {
			setCurrentPage(currentPage + 1);
		}
	}

	useEffect(() => {
		setItems(match);
		if(category === "all") {
			setItems(allItems);
		}
		setCurrentPage(1);
	}, [category, allItems]);

	console.log(process.env.REACT_APP_SERVER_URL);
	console.log(allItems);

	return (
		<main className={styles.main}>
			<div className={`${styles.container} maxWidth`}>
				{visibleItems?.map((item, i) => {
					return (
						<div className={styles.itemCardList} key={i}>
							<ItemCard item={item} />
						</div>
					)
				})}				
			</div>
			<div className={styles.loadMoreBtn}>
				{
					lastIndex < items.length
					&& <button onClick={()=>{nextPage()}}>Load More <ExpandMoreIcon className={styles.loadMoreArrow} /></button>
				}
			</div>
		</main>
	);
}

export default ItemList;