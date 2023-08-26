import styles from './ItemCard.module.scss';
import { Link } from 'react-router-dom';


function ItemCard({ item }) {
	const { name, color, price, image, productId } = item.attributes;
	const {
		data: {
			attributes: { url }
		}
	} = image;

	return (
		<div className={styles.container}>
			<Link to={`/products/detail/${productId}`}>
				<div className={styles.wrapper}>
					{/* <img className={styles.itemImg} src={`${process.env.REACT_APP_SERVER_URL}${url}`} width="100%" /> */}
					<img className={styles.itemImg} src={`${url}`} width="100%" />
					<section className={styles.textWrapper}>
						<h3 className={styles.itemCardName}>{name}</h3>
						<p className={styles.itemCardText}>{color}</p>
						<p className={styles.itemCardText}>${price.toFixed(2)}</p>
					</section>
				</div>
			</Link>
		</div>
	);
}

export default ItemCard;