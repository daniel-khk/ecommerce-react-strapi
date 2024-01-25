import HomeBanners from './HomeBanners';
import HomeCarousel from './HomeCarousel';


const Home = () => {
	return (
		<div className="homeContainer">
			<HomeCarousel />
			<HomeBanners />
		</div>
	);
}

export default Home;