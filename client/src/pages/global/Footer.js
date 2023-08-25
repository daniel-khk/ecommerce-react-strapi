import styles from './Footer.module.scss';
import CircleIcon from '@mui/icons-material/Circle';


function Footer() {
	return (
		<footer className={styles.container}>
			<div className={`${styles.wrapper} maxWidth`}>
				<div className={styles.left}>
					<div className={styles.menu}>
						<h3>About</h3>
						<span>About Us</span>
						<span>Stores</span>
						<span>News</span>
						<span>Careers</span>
					</div>
					<div className={styles.menu}>
						<h3>Support</h3>
						<span>Shipping</span>
						<span>Return Policy</span>
						<span>Payment Options</span>
						<span>Help Center</span>
					</div>
				</div>
				<div className={styles.right}>
					<div>
						<span>Privacy Policy</span><CircleIcon className={styles.circle} />
						<span>Terms of Service</span><CircleIcon className={`${styles.circle} ${styles.circleToggle}`} />
					</div>
					<div>
						<span>416-881-0500</span><CircleIcon className={styles.circle} />
						<span>dkhk1208@gmail.com</span>
					</div>
				</div>
			</div>		
		</footer>
	);
}

export default Footer;