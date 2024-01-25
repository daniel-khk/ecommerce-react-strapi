import styles from './ItemDetailsCarousel.module.scss';


const ItemDetailsCarousel = ({ item }) => {
	const detailImages = item?.attributes?.detailImage?.data;

	// Carousel scrolls to matching detail image when the image buttons are clicked.
	const imageScroll = (i) => {
		const element = document.getElementById(`detailImageId${i}`);
		return element.scrollIntoView({ block: "center", behavior: "smooth" });
	}

	return (
		<div className={styles.itemDetailsCarousel}>
			<div className={styles.detailImageBtn}>
				{detailImages?.map((a, i) => {
					return <button onClick={() => {
						imageScroll(i);
					}} key={i} style=
						// {{ backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}${item?.attributes?.detailImage?.data[i]?.attributes?.url})`}}>
						{{ backgroundImage: `url(${item?.attributes?.detailImage?.data[i]?.attributes?.url})` }}>
					</button>
				})}
			</div>
			<div className={styles.carouselImage}>
				{detailImages?.map((a, i) => {
					return <img id={`detailImageId${i}`} alt="Item Detail" src=
						// {`${process.env.REACT_APP_SERVER_URL}${item?.attributes?.detailImage?.data[i]?.attributes?.url}`} 
						{`${item?.attributes?.detailImage?.data[i]?.attributes?.url}`}
						key={i} loading='lazy' />
				})}
			</div>
		</div>
	);
}

export default ItemDetailsCarousel;