import styles from './Navbar.module.scss';
import { useLocation } from 'react-router-dom';
import NavbarWeb from './NavbarWeb';
import NavbarMobile from './NavbarMobile';


const Navbar = () => {
	// Hook to get the current pathname
	const { pathname } = useLocation();

	// Changes navbarTop-container css border-bottom to transparent only in the Home page "/".
	const navbarStyleChange = {
		borderBottom: {
			["/"]: "1px solid transparent",
		}
	}

	// Render the Navbar component and include both web and mobile versions
	return (
		<header className={styles.navbarContainer} style={{ borderBottom: navbarStyleChange.borderBottom[pathname] }}>
			<NavbarWeb />
			<NavbarMobile />
		</header>
	);
}

export default Navbar;