import styles from './ItemDetailsCarousel.module.scss';


function ItemDetailsCarousel({ item }) {
	const detailImages = item?.attributes?.detailImage?.data;

	// Carousel scrolls to matching detail image when small image buttons are clicked.
	const imageScroll = (i) => {
		const element = document.getElementById(`detailImageId${i}`);
		return element.scrollIntoView({ block: "center", behavior: "smooth" });
	}

	return (
		<div className={styles.container}>
			<div className={styles.imageBtn}>
				{detailImages?.map((a, i) => {
					return <button onClick={() => {
						imageScroll(i);
					}} key={i} style={{ backgroundImage: `url(http://localhost:1337${item?.attributes?.detailImage?.data[i]?.attributes?.url})` }}></button>
				})}
			</div>
			<div className={styles.carouselImg}>
				{detailImages?.map((a, i) => {
					return <img id={`detailImageId${i}`} src={`http://localhost:1337${item?.attributes?.detailImage?.data[i]?.attributes?.url}`} key={i} />
				})}
			</div>
		</div>
	);
}

export default ItemDetailsCarousel;