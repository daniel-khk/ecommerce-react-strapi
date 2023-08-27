import styles from './Modal.module.scss';
import { useDispatch } from "react-redux";
import { closeSelectSizeModal } from "../../store/modalSlice";


function SelectSizeModal() {
	const dispatch = useDispatch();
	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<section className={styles.wrapper}>
					<h3>Please select a size.</h3>
					<div className={styles.btnWrapper}>
						<button className={styles.rightBtn} onClick={()=>{
							dispatch(closeSelectSizeModal());
						}}>ok</button>
					</div>
				</section>
			</div>
			<div className={styles.modalBackground} onClick={()=>{dispatch(closeSelectSizeModal());}}>
			</div>		
		</div>
	)
}

export default SelectSizeModal;