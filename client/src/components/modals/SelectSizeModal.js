import styles from './Modal.module.scss';
import { useDispatch } from "react-redux";
import { closeSelectSizeModal } from "../../store/modalSlice";


const SelectSizeModal = () => {
	const dispatch = useDispatch();
	return (
		<section className={styles.modalMain}>
			<section className={styles.modalBox}>
				<div className={styles.wrapper}>
					<h3>Please select a size.</h3>
					<div className={styles.btnWrapper}>
						<button className={styles.rightBtn} onClick={() => {
							dispatch(closeSelectSizeModal());
						}}>ok</button>
					</div>
				</div>
			</section>
			<div className={styles.modalBackground} onClick={() => { dispatch(closeSelectSizeModal()); }}>
			</div>
		</section>
	)
}

export default SelectSizeModal;