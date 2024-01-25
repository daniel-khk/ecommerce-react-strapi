import styles from './NavbarMobile.module.scss';
import { Link, useLocation } from "react-router-dom"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MainLogo from '../../assets/apple_logo.svg';

const NavbarMobile = () => {
	const location = useLocation();
	const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false);
	const { totalCount } = useSelector((state) => { return state.cart });

	const openSlideMenu = () => {
		setIsSlideMenuOpen(true);
		document.body.style.overflow = "hidden";
	}

	const closeSlideMenu = () => {
		setIsSlideMenuOpen(false);
		document.body.style.overflow = "unset";
	}

	const slideMenuOpenIcon = () => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#222222" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
		)
	}

	const slideMenuCloseIcon = () => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#222222" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		)
	}

	return (
		<nav className={styles.navbarMobile}>
			<div className={styles.navbarMobileMenu}>
				<div className={styles.navbarLeftArea}>
					{/* Main logo linked to the home page */}
					<div className={styles.navLogo}>
						<a href="/"><img className={styles.svgLogo} src={MainLogo} alt="Main Logo" /></a>
					</div>
				</div>
				<div className={styles.navbarRightArea}>
					<div className={styles.cartIcon}>
						<Link to="/cart">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#222222" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
							</svg>
						</Link>
						<div className={styles.cartIconNum}>
							{totalCount === 0
								? <span></span>
								: <span>{totalCount}</span>}
						</div>
					</div>

					{/* Icon that opens slide menu */}
					<div className={styles.slideMenuIcon} onClick={() => {
						!isSlideMenuOpen ? openSlideMenu() : closeSlideMenu()
					}}>
						{!isSlideMenuOpen ? slideMenuOpenIcon() : slideMenuCloseIcon()}
						{/* {slideMenuOpenIcon()} */}
					</div>
				</div>
			</div>

			{/* Slide menu */}
			<div className={`${styles.slideMenu} ${isSlideMenuOpen ? styles.slide : ''}`}>
				<ul>
					<li className={`${location.pathname === '/' ? styles.active : ''}`} onClick={() => { closeSlideMenu() }}>
						<Link to="/"><span>home</span></Link>
					</li>
					<li className={`${location.pathname === '/products/tops' ? styles.active : ''}`} onClick={() => { closeSlideMenu() }}>
						<Link to="/products/tops"><span>tops</span></Link>
					</li>
					<li className={`${location.pathname === '/products/bottoms' ? styles.active : ''}`} onClick={() => { closeSlideMenu() }}>
						<Link to="/products/bottoms"><span>bottoms</span></Link>
					</li>
					<li className={`${location.pathname === '/products/accessories' ? styles.active : ''}`} onClick={() => { closeSlideMenu() }}>
						<Link to="/products/accessories"><span>accessories</span></Link>
					</li>
					<li className={`${location.pathname === '/products/all' ? styles.active : ''}`} onClick={() => { closeSlideMenu() }}>
						<Link to="/products/all"><span>view all</span></Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavbarMobile;