import './HomeCarousel.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCarousel } from '../../store/itemsSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

const HomeCarousel = () => {
	const dispatch = useDispatch();
	const carousel = useSelector((state) => state.items.carousel);
	const carouselImages = carousel?.attributes?.image?.data;

	// Fetch carousel images from the server
	const getCarousel = async () => {
		try {
			const carouselResponse = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/api/carousels/1?populate=image`,
				{ method: "GET" }
			);

			if (!carouselResponse.ok) {
				console.error("Error fetching carousel from API (getCarousel)");
				return;
			}

			const carouselJson = await carouselResponse.json();
			dispatch(setCarousel(carouselJson.data));
		} catch (error) {
			console.error("Error fetching carousel (getCarousel):", error);
		}
	}

	const handleReachEnd = (swiper) => {
		// Check if the current slide is the last slide
		if (swiper.isEnd) {
			// Navigate back to the first slide
			swiper.slideTo(0);
		}
	}

	const handleNextButtonClick = () => {
		const swiper = document.querySelector('.swiper').swiper;
		// Check if the current slide is the last slide
		if (swiper.isEnd) {
			// Navigate back to the first slide
			swiper.slideTo(0);
		} else {
			// Slide to the next slide
			swiper.slideNext();
		}
	}

	const handlePrevButtonClick = () => {
		const swiper = document.querySelector('.swiper').swiper;
		// Slide to the prev slide
		swiper.slidePrev();
	}

	useEffect(() => {
		getCarousel();
	}, []);

	return (
		<section className='homeCarousel'>
			<div className='carouselTitle'>
				<Link to='/products/all'>
					<h2>the 2099 f/w collection</h2>
					<p>view all</p>
				</Link>
			</div>
			<Swiper
				className='mySwiper'
				slidesPerView={1}
				spaceBetween={0}
				centeredSlides={false}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={{
					nextEl: 'swiper-button-next',
					prevEl: 'swiper-button-prev',
				}}
				modules={[Autoplay, Pagination, Navigation]}
				on={{
					reachEnd: { handleReachEnd }
				}}
				breakpoints={{
					576: {
						slidesPerView: 2,
					},
				}}
			>
				{carouselImages?.map((a, i) => {
					return (
						<SwiperSlide key={i}>
							<img className='homeCarouselImage' src=
								// {`${process.env.REACT_APP_SERVER_URL}${carousel?.attributes?.image?.data[i]?.attributes?.url}`} 
								{`${carousel?.attributes?.image?.data[i]?.attributes?.url}`} alt={`Carousel ${i}`} loading='lazy' />
						</SwiperSlide>
					)
				})}
				<div className='swiper-button-prev' onClick={handlePrevButtonClick}>
					<div className='button-prev-icon'></div>
				</div>
				<div className='swiper-button-next' onClick={handleNextButtonClick}>
					<div className='button-next-icon'></div>
				</div>
			</Swiper>
		</section >
	);
}

export default HomeCarousel;