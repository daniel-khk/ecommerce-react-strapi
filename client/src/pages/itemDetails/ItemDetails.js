import styles from './ItemDetails.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ItemDetailsCarousel from './ItemDetailsCarousel';
import ItemDetailsInfo from './ItemDetailsInfo';
import RecentlyViewed from './RecentlyViewed';
import ItemCard from '../../components/ItemCard/ItemCard';
import AddCartModal from '../../components/modals/AddCartModal';


function ItemDetails() {
	// Getting the item that matches productId from redux data.
	const { productId } = useParams();
	const item = useSelector((state) => state.items.items.find(i => i.attributes.productId === productId));
	const { isOpen } = useSelector((state) => { return state.modal })

	return (
		<>
		{isOpen && <AddCartModal />}
		<main className={styles.main}>
			<div className={`${styles.container} maxWidth`}>
				<ItemDetailsCarousel item={item} />
				<ItemDetailsInfo item={item} />
			</div>
			<div className="maxWidth">
				<RecentlyViewed item={item} />
			</div>			
		</main>
		</>
	);
}

export default ItemDetails;
