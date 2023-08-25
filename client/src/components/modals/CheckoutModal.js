import styles from './Modal.module.scss';
import { useDispatch } from "react-redux";
import { closeCheckoutModal } from "../../store/modalSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from 'react-redux';


function CheckoutModal() {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => { return state.cart });
	const stripePromise = loadStripe("pk_test_51NV5vPB2idLWOEguF6dBkeqGYI7sHp7UnMxdFFthcFRybsQxnXkDP8wxv9sSoCqdNYbY5XskHA9ZKWMLZJo6eMKi00eBBMsA4J");

	async function makePayment() {
		try{
			const stripe = await stripePromise;
			const requestBody = {
				products: cartItems.map(({ productId, name, color, selectedOption, price, count }) => ({
					productId,
					name,
					color,
					selectedOption,				
					price,
					count,
				}))
			};
			const response = await fetch("http://localhost:1337/api/orders", {
				method: "POST",
				headers: { 
					"Content-Type": "application/json" 
				},
				body: JSON.stringify(requestBody),
			});
			const session = await response.json();
			await stripe.redirectToCheckout({
				sessionId: session.id,
			});
		} catch(error) {
			console.log(error);
		}
	}

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<section className={styles.wrapper}>
					<h3 className={styles.checkoutTitle}>In order to test the Checkout</h3>
					<p>- Use 4242 4242 4242 4242 as the card number.<br/>
					- Use a valid future date, such as 12/34.<br/>
					- Use any three-digit CVC.<br/>
					- Use any value you like for other form fields.</p>
					<div className={styles.btnWrapper}>
						<button className={styles.leftBtn} onClick={()=>{
							dispatch(closeCheckoutModal());
						}}>cancel</button>
						<button className={styles.rightBtn} onClick={()=>{
							dispatch(makePayment);
							dispatch(closeCheckoutModal());
						}}>ok</button>
					</div>
				</section>
			</div>
			<div className={styles.modalBackground} onClick={()=>{dispatch(closeCheckoutModal());}}>
			</div>				
		</div>
	)
};

export default CheckoutModal;