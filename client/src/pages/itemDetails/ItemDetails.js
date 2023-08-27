import styles from './ItemDetails.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemDetailsCarousel from './ItemDetailsCarousel';
import ItemDetailsInfo from './ItemDetailsInfo';
import RecentlyViewed from './RecentlyViewed';
import AddCartModal from '../../components/modals/AddCartModal';
import SelectSizeModal from '../../components/modals/SelectSizeModal';


function ItemDetails() {
	// Getting the item that matches productId from redux data.
	const { productId } = useParams();
	const item = useSelector((state) => state.items.items.find(i => i.attributes.productId === productId));
	const { isOpen, selectSizeIsOpen } = useSelector((state) => { return state.modal })

	return (
		<>
		{isOpen && <AddCartModal />}
		{selectSizeIsOpen && <SelectSizeModal />}
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
