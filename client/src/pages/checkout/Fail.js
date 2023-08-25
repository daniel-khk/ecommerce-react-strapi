import styles from './Success.module.scss';
import { Link } from "react-router-dom";


function Fail() {
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h3>Checkout Error</h3>
				<p>There has been a problem during the checkout process.<br/>Please check your payment details and try again.</p>
				<Link to={`/cart`}>
					<button>Back to Cart</button>
				</Link>
			</div>		
		</main>
	)
}

export default Fail;