import HomeBanners from './HomeBanners';
import HomeCarousel from './HomeCarousel';


function Home() {
	return (
		<main className="home-main">
			<HomeCarousel />
			<HomeBanners />
		</main>
	);
}

export default Home;