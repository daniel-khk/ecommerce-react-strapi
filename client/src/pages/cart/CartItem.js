import styles from './CartItem.module.scss';
import { useDispatch } from 'react-redux';
import { increase, decrease, removeItem } from '../../store/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


function CartItem({ item }) {
	const { name, color, price, image, count, selectedOption } = item;
	const { data: { attributes: { url } } } = image;
	const dispatch = useDispatch();

	function itemDescSub() {
		return (
			<>
			<div className={styles.itemPrice}>
				<p>${price.toFixed(2)}</p>
			</div>
			<div className={styles.countRemoveWrapper}>
				<div className={styles.itemCount}>
					<button onClick={() => {
						if (count === 1) {
							return;
						}
						dispatch(decrease(item));
					}}><RemoveIcon className={styles.countIcon} /></button>
					<span>{count}</span>
					<button onClick={() => {
						dispatch(increase(item));;
					}}><AddIcon className={styles.countIcon} /></button>
				</div>
				<div className={styles.itemRemove}>
					<button onClick={() => {
						dispatch(removeItem(item))}}>Remove</button>
				</div>
			</div>
			</>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.itemWrapper}>
				{/* <img className={styles.itemImg} src={`${process.env.REACT_APP_SERVER_URL}${url}`} alt={name} /> */}
				<img className={styles.itemImg} src={`${url}`} alt={name} />
				<section className={styles.itemInfo}>
					<h3>{name}</h3>
					<p>{color}, {selectedOption}</p>
					<p className={styles.itemPriceSmall}>${price.toFixed(2)}</p>
				</section>
			</div>
			<div className={styles.itemDesc}>
				{itemDescSub()}
			</div>
		</div>
	);
}

export default CartItem;