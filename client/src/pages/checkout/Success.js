import styles from './Success.module.scss';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearCart } from "../../store/cartSlice";
import { useEffect } from "react";


function Success() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearCart());
	}, []);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h3>Thank you for your purchase.</h3>
				<p>Payment has been successfully processed.<br/>Your order will be prepared for shipment soon.</p>
				<Link to={`/`}>
					<button>Back to Home</button>
				</Link>
			</div>		
		</main>
	)
}

export default Success;