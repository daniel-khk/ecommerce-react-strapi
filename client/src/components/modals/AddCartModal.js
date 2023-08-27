import styles from './Modal.module.scss';
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";


function AddCartModal() {
	const dispatch = useDispatch();
	const overflow = () => {
		document.body.style.overflow = "hidden";
	}
	
	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<section className={styles.wrapper}>
					<h3>Item has been added to your shopping cart.</h3>
					<div className={styles.btnWrapper}>
						<button className={styles.rightBtn} onClick={()=>{
							dispatch(closeModal());
						}}>ok</button>
					</div>
				</section>
			</div>
			<div className={styles.modalBackground} onClick={()=>{dispatch(closeModal());}}>
			</div>
			{overflow()}		
		</div>
	)
};

export default AddCartModal;