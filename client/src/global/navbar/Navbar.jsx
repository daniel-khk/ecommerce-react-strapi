import styles from './Navbar.module.scss';
import { useLocation } from 'react-router-dom';
import NavbarWeb from './NavbarWeb';
import NavbarMobile from './NavbarMobile';


const Navbar = () => {
	// Changes navbarTop-container css border-bottom to transparent only in the Home page "/".
	const { pathname } = useLocation();
	const navbarStyleChange = {
		borderBottom: {
			["/"]: "1px solid transparent",
		}
	}

	return (
		<header className={styles.navbarContainer} style={{ borderBottom: navbarStyleChange.borderBottom[pathname] }}>
			<NavbarWeb />
			<NavbarMobile />
		</header>
	);
}

export default Navbar;
