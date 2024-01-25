import styles from './ItemCard.module.scss';
import { Link } from 'react-router-dom';


const ItemCard = ({ item }) => {
	const { name, color, price, image, productId } = item.attributes;
	const {
		data: {
			attributes: { url }
		}
	} = image;

	return (
		<section className={styles.itemCard}>
			<Link to={`/products/detail/${productId}`}>
				<div className={styles.itemCardWrapper}>
					{/* <img className={styles.itemImg} src={`${process.env.REACT_APP_SERVER_URL}${url}`} width="100%" /> */}
					<img className={styles.itemImg} src={`${url}`} width="100%" alt="Item" loading='lazy' />
					<div className={styles.textWrapper}>
						<h3 className={styles.itemCardName}>{name}</h3>
						<p className={styles.itemCardInfo}>{color}</p>
						<p className={styles.itemCardInfo}>${price.toFixed(2)}</p>
					</div>
				</div>
			</Link>
		</section>
	);
}

export default ItemCard;