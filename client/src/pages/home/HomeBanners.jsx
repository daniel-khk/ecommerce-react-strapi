import styles from './HomeBanners.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const HomeBanners = () => {
	// Using Redux to select items array from the store
	const items = useSelector((state) => state.items.items);

	// Find and define specific products to display as banners
	const banners = [
		{ productId: "82jb018", category: "tops", label: "Tops" },
		{ productId: "82jb012", category: "bottoms", label: "Bottoms" },
		{ productId: "82jb004", category: "accessories", label: "Accessories" },
	];

	// Function to get the image URL
	const getImageUrl = (productId) => {
		const item = items.find((item) => item.attributes.productId === productId);
		return item?.attributes?.detailImage?.data[0]?.attributes?.url || '';
	};

	return (
		<section className={styles.homeBanners}>
			{/* Loop for banners */}
			{banners.map((banner, index) => (
				<Link to={`/products/${banner.category}`} key={index}>
					<div className={styles.bannerBox}>
						<div className={styles.textBg}>
							<h3 className={styles.bannerText}>{banner.label}</h3>
						</div>
						<img
							className={styles.bannerImg}
							alt={`${banner.label} Banner`}
							src={getImageUrl(banner.productId)}
						/>
					</div>
				</Link>
			))}
		</section>
	);
}

export default HomeBanners;