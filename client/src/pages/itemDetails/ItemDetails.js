import styles from './ItemDetails.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemDetailsCarousel from './ItemDetailsCarousel';
import ItemDetailsInfo from './ItemDetailsInfo';
import RecentlyViewed from './RecentlyViewed';
import AddCartModal from '../../components/modals/AddCartModal';
import SelectSizeModal from '../../components/modals/SelectSizeModal';


const ItemDetails = () => {
	// Getting the item that matches productId from redux data.
	const { productId } = useParams();
	const item = useSelector((state) => state.items.items.find(i => i.attributes.productId === productId));
	const { isOpen, selectSizeIsOpen } = useSelector((state) => { return state.modal })

	return (
		<>
			{isOpen && <AddCartModal />}
			{selectSizeIsOpen && <SelectSizeModal />}
			<section className={styles.itemDetails}>
				<section className={styles.itemDetailsContainer}>
					<ItemDetailsCarousel item={item} />
					<ItemDetailsInfo item={item} />
				</section>
				<section className={styles.recentlyViewedContainer}>
					<RecentlyViewed item={item} />
				</section>
			</section>
		</>
	);
}

export default ItemDetails;
