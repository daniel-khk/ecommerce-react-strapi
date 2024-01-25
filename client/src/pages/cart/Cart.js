import styles from './Cart.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from "./CartItem";
import { useNavigate } from 'react-router-dom';
import ClearCartModal from '../../components/modals/ClearCartModal';
import { openModal, openCheckoutModal } from '../../store/modalSlice';
import CheckoutModal from '../../components/modals/CheckoutModal';


const Cart = () => {
	const { cartItems, totalCount, totalPrice } = useSelector((state) => { return state.cart });
	const { isOpen, checkoutIsOpen } = useSelector((state) => { return state.modal })
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const totalPriceModify = totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

	return (
		<>
			{isOpen && <ClearCartModal />}
			{checkoutIsOpen && <CheckoutModal />}
			<section className={styles.cart}>
				<h1 className={styles.cartTitle}>Cart</h1>
				{totalCount < 1
					? <div className={styles.empty}>
						<div className={styles.emptyText}><h2>You don't have any items in your cart.</h2></div>
						<div className={styles.emptyBtn}>
							<button onClick={() => navigate(-1)}>Continue Shopping</button>
						</div>
					</div>
					: <div className={styles.filled}>
						{cartItems.map((item, i) => {
							return <CartItem item={item} key={i} />;
						})}
						<div className={styles.calculate}>
							<span>Total Amount: ${totalPriceModify}</span>
						</div>
						<div className={styles.cartBtnWrapper}>
							<div className={styles.cartBtn}>
								<button onClick={() => dispatch(openModal())}>Clear Cart</button>
								<button onClick={() => navigate(-1)}>Continue Shopping</button>
							</div>
							<div className={`${styles.cartBtn} ${styles.checkout}`}>
								<button onClick={() => dispatch(openCheckoutModal())}>Checkout</button>
							</div>
						</div>
					</div>
				}
			</section>
		</>
	);
}

export default Cart;