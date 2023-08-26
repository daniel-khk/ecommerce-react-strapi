import styles from './HomeBanners.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function HomeBanners() {
	const items = useSelector((state) => state.items.items);
	const firstBanner = items.find((item) => item.attributes.productId === "82jb018");
	const secondBanner = items.find((item) => item.attributes.productId === "82jb012");
	const thirdBanner = items.find((item) => item.attributes.productId === "82jb004");

	return (
		<div className={styles.container}>
			<Link to="/products/tops">
				<div className={styles.wrapper}>
					<div className={styles.textBg}><h2 className={styles.bannerText}>Tops</h2></div>
					<img className={styles.bannerImg} src=
					// {`${process.env.REACT_APP_SERVER_URL}${firstBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`}
					{`${firstBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`}
					/>
				</div>			
			</Link>
			<Link to="/products/bottoms">
				<div className={styles.wrapper}>
					<div className={styles.textBg}><h2 className={styles.bannerText}>Bottoms</h2></div>
					<img className={styles.bannerImg} src=
					// {`${process.env.REACT_APP_SERVER_URL}${secondBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`} 
					{`${secondBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`} 
					/>
				</div>			
			</Link>
			<Link to="/products/accessories">
				<div className={styles.wrapper}>
					<div className={styles.textBg}><h2 className={styles.bannerText}>Accessories</h2></div>
					<img className={styles.bannerImg} src=
					// {`${process.env.REACT_APP_SERVER_URL}${thirdBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`} 
					{`${thirdBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`} 
					/>
				</div>			
			</Link>
		</div>
	);
}

export default HomeBanners;