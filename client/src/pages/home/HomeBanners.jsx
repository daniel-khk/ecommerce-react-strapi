import styles from './HomeBanners.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const HomeBanners = () => {
	const items = useSelector((state) => state.items.items);
	const firstBanner = items.find((item) => item.attributes.productId === "82jb018");
	const secondBanner = items.find((item) => item.attributes.productId === "82jb012");
	const thirdBanner = items.find((item) => item.attributes.productId === "82jb004");

	return (
		<section className={styles.homeBanners}>
			<Link to="/products/tops">
				<div className={styles.bannerBox}>
					<div className={styles.textBg}>
						<h3 className={styles.bannerText}>Tops</h3>
					</div>
					<img className={styles.bannerImg} alt="Banner 1" src=
						// {`${process.env.REACT_APP_SERVER_URL}${firstBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`}
						{`${firstBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`} loading='lazy'
					/>
				</div>
			</Link>
			<Link to="/products/bottoms">
				<div className={styles.bannerBox}>
					<div className={styles.textBg}>
						<h3 className={styles.bannerText}>Bottoms</h3>
					</div>
					<img className={styles.bannerImg} alt="Banner 2" src=
						// {`${process.env.REACT_APP_SERVER_URL}${secondBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`} 
						{`${secondBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`} loading='lazy'
					/>
				</div>
			</Link>
			<Link to="/products/accessories">
				<div className={styles.bannerBox}>
					<div className={styles.textBg}>
						<h3 className={styles.bannerText}>Accessories</h3>
					</div>
					<img className={styles.bannerImg} alt="Banner 3" src=
						// {`${process.env.REACT_APP_SERVER_URL}${thirdBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`} 
						{`${thirdBanner?.attributes?.detailImage?.data[0]?.attributes?.url}`} loading='lazy'
					/>
				</div>
			</Link>
		</section>
	);
}

export default HomeBanners;