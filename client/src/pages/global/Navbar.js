import styles from './Navbar.module.scss';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import NavbarSmall from './NavbarSmall';


function Navbar() {
	// Changes navbarTop-container css border-bottom to transparent only in the Home page "/".
	const { pathname } = useLocation();
	const navbarStyleChange = {
		borderBottom: {
			["/"]: "1px solid transparent",
		}
	}
	const { totalCount } = useSelector((state) => {return state.cart});

	function navbarLarge() {
		return (
			<div className={`${styles.wrapper} ${styles.web} maxWidth`}>
				<nav className={styles.left}>
					<div className={styles.logo}>
						<Link to="/"><DonutLargeIcon className={styles.logoSvg} /></Link>				
					</div>
					<ul>
						<li><Link to="/products/tops"><span>tops</span></Link></li>
						<li><Link to="/products/bottoms"><span>bottoms</span></Link></li>
						<li><Link to="/products/accessories"><span>accessories</span></Link></li>
						<li><Link to="/products/all"><span>view all</span></Link></li>
					</ul>
				</nav>
				<nav className={styles.right}>
					<ul>
						<li>
							{totalCount === 0
								? <Link to="/cart"><span>cart (0)</span></Link>
								: <Link to="/cart"><span>cart ( {totalCount} )</span></Link>}
						</li>
					</ul>					
				</nav>
			</div>
		);
	}

	return (		
		<header className={styles.container} style={{ borderBottom: navbarStyleChange.borderBottom[pathname] }}>
			{navbarLarge()}
			<NavbarSmall />
		</header>		
	);
}

export default Navbar;
