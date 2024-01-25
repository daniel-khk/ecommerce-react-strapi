import styles from './Modal.module.scss';
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { closeModal } from "../../store/modalSlice";


const ClearCartModal = () => {
	const dispatch = useDispatch();
	return (
		<section className={styles.modalMain}>
			<section className={styles.modalBox}>
				<div className={styles.wrapper}>
					<h3>Remove all items from your shopping cart?</h3>
					<div className={styles.btnWrapper}>
						<button className={styles.leftBtn} onClick={() => {
							dispatch(closeModal());
						}}>cancel</button>
						<button className={styles.rightBtn} onClick={() => {
							dispatch(clearCart());
							dispatch(closeModal());
						}}>ok</button>
					</div>
				</div>
			</section>
			<div className={styles.modalBackground} onClick={() => { dispatch(closeModal()); }}>
			</div>
		</section>
	)
};

export default ClearCartModal;