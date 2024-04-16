import styles from './ItemDetailsCarousel.module.scss';
import { useState } from 'react';


const ItemDetailsCarousel = ({ item }) => {
	const detailImages = item?.attributes?.detailImage?.data;

	// State to track URLs of images that have completed loading.
	const [loadedImages, setLoadedImages] = useState([]);

	// Scrolls the carousel to the image that matches to the clicked button.
	const imageScroll = (i) => {
		const element = document.getElementById(`detailImageId${i}`);
		return element.scrollIntoView({ block: "center", behavior: "smooth" });
	}

	// Adds the URL of a loaded image to the loadedImages state.
	const handleImageLoad = (url) => {
		setLoadedImages(prev => [...prev, url]);
	};

	// Function to extract image URL from data
	const getImageUrl = i => item?.attributes?.detailImage?.data[i]?.attributes?.url;

	return (
		<div className={styles.itemDetailsCarousel}>
			<div className={styles.detailImageBtn}>
				{detailImages?.map((a, i) => {
					return <button onClick={() => {
						imageScroll(i);
					}} key={i} style=
						// {{ backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}${item?.attributes?.detailImage?.data[i]?.attributes?.url})`}}>
						{{ backgroundImage: `url(${getImageUrl(i)})` }}>
					</button>
				})}
			</div>
			<div className={styles.carouselImage}>
				{detailImages?.map((a, i) => {
					// Only render the image if it is the first image or if the previous image has loaded.
					if (i === 0 || loadedImages.includes(getImageUrl(i - 1))) {
						return (
							<img
								id={`detailImageId${i}`}
								alt={`Item Detail ${i}`}
								src={getImageUrl(i)}
								key={i}
								onLoad={() => handleImageLoad(getImageUrl(i))}
								loading="lazy"
							/>
						);
					}
					return null;
				})}
			</div>
		</div>
	);
}

export default ItemDetailsCarousel;