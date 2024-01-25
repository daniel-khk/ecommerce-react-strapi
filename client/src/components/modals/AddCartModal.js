import styles from './Modal.module.scss';
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";


const AddCartModal = () => {
	const dispatch = useDispatch();
	const overflow = () => {
		document.body.style.overflow = "hidden";
	}

	return (
		<section className={styles.modalMain}>
			<section className={styles.modalBox}>
				<div className={styles.wrapper}>
					<h3>Item has been added to your shopping cart.</h3>
					<div className={styles.btnWrapper}>
						<button className={styles.rightBtn} onClick={() => {
							dispatch(closeModal());
						}}>ok</button>
					</div>
				</div>
			</section>
			<div className={styles.modalBackground} onClick={() => { dispatch(closeModal()); }}>
			</div>
			{overflow()}
		</section>
	)
};

export default AddCartModal;