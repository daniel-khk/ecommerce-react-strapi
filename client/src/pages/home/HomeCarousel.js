import styles from './HomeCarousel.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCarousel } from '../../store/itemsSlice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function HomeCarousel() {
	const dispatch = useDispatch();
	const carousel = useSelector((state) => state.items.carousel);
	const carouselImages = carousel?.attributes?.image?.data;
	const [current, setCurrent] = useState(0);

	const [mouseStartPosition, setMouseStartPosition] = useState(0);
	const [mouseEndPosition, setMouseEndPosition] = useState(0);
	const [mouseClicked, setMouseClicked] = useState(false);
	const [dragDistance, setDragDistance] = useState(0);

	const [touchStartPosition, setTouchStartPosition] = useState(0);
    const [touchEndPosition, setTouchEndPosition] = useState(0);
    const [touched, setTouched] = useState(false);
	const [swipeDistance, setSwipeDistance] = useState(0);	

	async function getCarousel() {
		try {
			const carousel = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/api/carousels/1?populate=image`,
				{ method: "GET"}
			);
			const carouselJson = await carousel.json();

			if(!carousel.ok) {
				console.log("getCarousel fetch error");
				return;
			}			

			dispatch(setCarousel(carouselJson.data));
		} catch (error) {
			console.log(error);
		}
	}

	const mouseStartHandler = (e) => {
		setMouseStartPosition(e.clientX);
		setMouseEndPosition(e.clientX);
		setMouseClicked(true);
	}

	const mouseMoveHandler = (e) => {
		const frameWidth = document.getElementById('carouselContainer').offsetWidth;
		if (mouseClicked === true) {
			setMouseEndPosition(e.clientX);
			setDragDistance((Math.abs(mouseEndPosition - mouseStartPosition) / frameWidth) * 100);
			if (dragDistance > 25) {
				if(mouseEndPosition < mouseStartPosition && current < carouselImages?.length - 2) {
					setCurrent(current + 1);
					setMouseStartPosition(e.clientX);				
				} else if (mouseEndPosition > mouseStartPosition && current > 0) {
					setCurrent(current - 1);
					setMouseStartPosition(e.clientX);
				}
			}			
		}
	}

	const mouseEndHandler = (e) => {
		setMouseClicked(false);
	}

	const touchStartHandler = (e) => {
        setTouchStartPosition(e.targetTouches[0].clientX);
        setTouchEndPosition(e.targetTouches[0].clientX);
        setTouched(true);
    }

	const touchMoveHandler = (e) => {
		const frameWidth = document.getElementById('carouselContainer').offsetWidth;
		if(touched === true) {
			setTouchEndPosition(e.targetTouches[0].clientX);
			setSwipeDistance((Math.abs(touchEndPosition - touchStartPosition) / frameWidth) * 100);
			if (swipeDistance > 25) {
				if(touchEndPosition < touchStartPosition && current < carouselImages?.length - 2) {
					setCurrent(current + 1);
					setTouchStartPosition(e.targetTouches[0].clientX);				
				} else if (touchEndPosition > touchStartPosition && current > 0) {
					setCurrent(current - 1);
					setTouchStartPosition(e.targetTouches[0].clientX);
				}
			}
		}
    }

	const touchEndHandler = (e) => {
        setTouched(false);
    }

	useEffect(() => {
		getCarousel();
	}, []);

	return (
		<div className={styles.container} id="carouselContainer"
			onMouseDown={(e) => mouseStartHandler(e)}
			onMouseMove={(e) => mouseMoveHandler(e)}
			onMouseUp={(e) => mouseEndHandler(e)}
			onTouchStart={(e) => touchStartHandler(e)}
			onTouchMove={(e) => touchMoveHandler(e)}
			onTouchEnd={(e) => touchEndHandler(e)}
			>
			<Link to="/products/all">
				<section className={styles.textWrapper}>
					<h1 className={styles.mainText}>the 2099 f/w collection</h1>
					<p className={styles.subText}>view all</p>
				</section>
			</Link>
			<div className={styles.images}>
				{ carouselImages?.map((a, i) => {			
					return <img alt="Carousel" src=
					// {`${process.env.REACT_APP_SERVER_URL}${carousel?.attributes?.image?.data[i]?.attributes?.url}`} 
					{`${carousel?.attributes?.image?.data[i]?.attributes?.url}`} 
					key={i} style={{ transform: `translateX(-${current}00%)`}} />				
				})}
			</div>
			<div className={styles.carouselBtn}>
				<button onClick={() => {
					if(0 < current){
						setCurrent(current - 1);
					}
					else {
						setCurrent(0);
					}		
				}}><ArrowBackIosNewIcon className={styles.arrowIcon} /></button>
				<button onClick={() => {
					if(current < carouselImages?.length - 2){
						setCurrent(current + 1);
					}
					else {
						setCurrent(0);
					}		
				}}><ArrowForwardIosIcon className={styles.arrowIcon} /></button>
			</div>
		</div>
	);
}

export default HomeCarousel;