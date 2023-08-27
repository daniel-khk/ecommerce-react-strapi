import styles from './ItemDetailsInfo.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { openModal, openSelectSizeModal } from '../../store/modalSlice';
import ReactMarkdown from 'react-markdown';


function ItemDetailsInfo({ item }) {
	const [selected, setSelected] = useState(null);
	const [option, setOption] = useState([]);
	const [selectedOption, setSelectedOption] = useState("placeholder");
	const dispatch = useDispatch();

	// Toggle expandable text information.
	const toggle = (i) => {
		if (selected === i) {
			return setSelected(null);
		}
		setSelected(i);
	}

	useEffect(() => {
		setOption(item?.attributes?.option);
		setSelectedOption("placeholder");
	}, [item]);

	return (
		<section className={styles.container}>
			<h1 className={styles.name}>{item?.attributes?.name}</h1>
			<p className={styles.price}>${item?.attributes?.price.toFixed(2)}</p>
			<p className={styles.color}>Color: <span>{item?.attributes?.color}</span></p>
			<p className={styles.dropdown}>Size:
				<select value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
					<option disabled value={"placeholder"}>-- select --</option>
					{option?.map((a, i) => {
						return <option value={a} key={i}>{a}</option>
					})}
				</select>
			</p>
			<button className={styles.addCartBtn} onClick={() => {				
				selectedOption === "placeholder"
					? dispatch(openSelectSizeModal())
					: dispatch(addItem([item, selectedOption])) && dispatch(openModal());				
			}}>Add To Cart</button>
			<span className={styles.borderLine}></span>
			<section className={styles.expandableText}>
				<div className={styles.title} onClick={() => toggle(0)}>
					<h3>Description</h3><span>{selected === 0 ? "-" : "+"}</span>
				</div>
				<div className={selected === 0 ? `${styles.content} ${styles.show}` : `${styles.content}`}>
					<p>{item?.attributes?.description}</p>
				</div>
			</section>
			<section className={styles.expandableText}>
				<div className={styles.title} onClick={() => toggle(1)}>
					<h3>Details</h3><span>{selected === 1 ? "-" : "+"}</span>
				</div>
				<div className={selected === 1 ? `${styles.content} ${styles.show}` : `${styles.content}`}>
					<ReactMarkdown className="markdown">{item?.attributes?.details}</ReactMarkdown>
				</div>
			</section>
			<section className={styles.expandableText}>
				<div className={styles.title} onClick={() => toggle(2)}>
					<h3>Shipping</h3><span>{selected === 2 ? "-" : "+"}</span>
				</div>
				<div className={selected === 2 ? `${styles.content} ${styles.show}` : `${styles.content}`}>
					<p>{item?.attributes?.shipping}</p>
				</div>
			</section>
		</section>
	);
}

export default ItemDetailsInfo;