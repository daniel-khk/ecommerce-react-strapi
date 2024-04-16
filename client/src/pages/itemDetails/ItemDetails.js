import styles from './ItemDetails.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemDetailsCarousel from './ItemDetailsCarousel';
import ItemDetailsInfo from './ItemDetailsInfo';
import RecentlyViewed from './RecentlyViewed';
import AddCartModal from '../../components/modals/AddCartModal';
import SelectSizeModal from '../../components/modals/SelectSizeModal';


const ItemDetails = () => {
	// Extracting productId from the URL parameters.
	const { productId } = useParams();
	// Fetching the specific item from the Redux store based on productId.
	const item = useSelector((state) => state.items.items.find(i => i.attributes.productId === productId));
	const { isOpen, selectSizeIsOpen } = useSelector((state) => { return state.modal })

	return (
		<>
			{isOpen && <AddCartModal />}
			{selectSizeIsOpen && <SelectSizeModal />}

			{/* Main item details section */}
			<section className={styles.itemDetails}>
				<section className={styles.itemDetailsContainer}>
					{/* Carousel and information sections for the product */}
					<ItemDetailsCarousel item={item} />
					<ItemDetailsInfo item={item} />
				</section>
				<section className={styles.recentlyViewedContainer}>
					{/* Section for displaying recently viewed items */}
					<RecentlyViewed item={item} />
				</section>
			</section>
		</>
	);
}

export default ItemDetails;
