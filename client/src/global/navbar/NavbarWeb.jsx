import styles from './NavbarWeb.module.scss';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import MainLogo from '../../assets/apple_logo.svg';

const NavbarWeb = () => {
	const location = useLocation();
	const { totalCount } = useSelector((state) => { return state.cart });

	return (
		<nav className={styles.navbarWeb}>
			<div className={styles.navbarLeftArea}>
				<div className={styles.navLogo}>
					<a href="/"><img className={styles.svgLogo} src={MainLogo} alt="Main Logo" /></a>
				</div>
				<div className={styles.navbarMenu}>
					<ul>
						<li className={`${location.pathname === '/products/tops' ? styles.active : ''}`}>
							<Link to="/products/tops"><span>tops</span></Link>
						</li>
						<li className={`${location.pathname === '/products/bottoms' ? styles.active : ''}`}>
							<Link to="/products/bottoms"><span>bottoms</span></Link>
						</li>
						<li className={`${location.pathname === '/products/accessories' ? styles.active : ''}`}>
							<Link to="/products/accessories"><span>accessories</span></Link>
						</li>
						<li className={`${location.pathname === '/products/all' ? styles.active : ''}`}>
							<Link to="/products/all"><span>view all</span></Link>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.navbarRightArea}>
				<div className={styles.navbarMenu}>
					<ul>
						<li className={`${styles.cartMenu} ${location.pathname === '/cart' ? styles.cartActive : ''}`}>
							{totalCount === 0
								? <Link to="/cart"><span>cart (0)</span></Link>
								: <Link to="/cart"><span>cart ( {totalCount} )</span></Link>}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavbarWeb;