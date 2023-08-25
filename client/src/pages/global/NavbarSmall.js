import styles from './Navbar.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CloseIcon from '@mui/icons-material/Close';


function NavbarSmall() {
	const { totalCount } = useSelector((state) => { return state.cart });
	const [open, setOpen] = useState(false);
	const scrollOff = () => {
		document.body.style.overflow = 'hidden';
	} 
	const scrollOn = () => {
		document.body.style.overflow = 'unset';
	} 

	return (
		<>
			<div className={`${styles.wrapper} maxWidth ${styles.mobile}`}>
				<nav className={`${styles.left} ${styles.mobileIcon}`}>
					<div className={styles.menuIcon} onClick={() => {setOpen(true)}}>
						<Link to="#"><MenuIcon className={styles.menuSvg} /></Link>
					</div>
					
				</nav>
				<nav className={`${styles.center} ${styles.mobileIcon}`}>
					<div className={styles.logo}>
						<Link to="/"><DonutLargeIcon className={styles.logoSvg} /></Link>						
					</div>
				</nav>
				<nav className={`${styles.right} ${styles.mobileIcon}`}>
					<div className={styles.cartIcon}>
						{totalCount === 0
							? <Link to="/cart"><ShoppingBagOutlinedIcon className={styles.cartSvg} /></Link>
							: <Link to="/cart"><ShoppingBagOutlinedIcon className={styles.cartSvg} /><span>{totalCount}</span></Link>}
					</div>
				</nav>
			</div>
			<div className={styles.sideMenu}>
				<div className={`${styles.sideMenuContainer} ${open === true ? styles.active : ''}`}>
					<div className={styles.sideMenuCloseWrapper}>
						<div className={styles.closeMenu} onClick={() => {setOpen(false)}}><CloseIcon className={styles.closeSvg} /></div>
					</div>
					<div className={styles.sideMenuWrapper} onClick={() => {setOpen(false)}}>
						<ul>
							<li><Link to="/products/tops"><span>tops</span></Link></li>
							<li><Link to="/products/bottoms"><span>bottoms</span></Link></li>
							<li><Link to="/products/accessories"><span>accessories</span></Link></li>
							<li><Link to="/products/all"><span>view all</span></Link></li>	
						</ul>
					</div>
				</div>
				<div className={`${styles.sideMenuBackground} ${open === true ? styles.darkBg : ''}`} onClick={() => {setOpen(false)}}></div>
				{open === true ? scrollOff() : scrollOn()}
			</div>
		</>
	);
}

export default NavbarSmall;