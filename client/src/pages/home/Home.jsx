import HomeBanners from './HomeBanners';
import HomeCarousel from './HomeCarousel';


const Home = () => {
	return (
		<div className="homeContainer">
			{/* Carousel component for displaying featured items or promotions */}
			<HomeCarousel />
			{/* Banners component for additional promotional links or information */}
			<HomeBanners />
		</div>
	);
}

export default Home;