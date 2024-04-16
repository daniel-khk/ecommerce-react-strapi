import styles from './ItemDetailsInfo.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { openModal, openSelectSizeModal } from '../../store/modalSlice';
import ReactMarkdown from 'react-markdown';


const ItemDetailsInfo = ({ item }) => {
	const [selected, setSelected] = useState(null);
	const [option, setOption] = useState([]);
	const [selectedOption, setSelectedOption] = useState("placeholder");
	const dispatch = useDispatch();

	// Toggle expandable text information.
	const toggle = (i) => {
		setSelected(selected === i ? null : i);
	}

	// Updates item options on item change
	useEffect(() => {
		setOption(item?.attributes?.option);
		setSelectedOption("placeholder");
	}, [item]);


	return (
		<div className={styles.itemDetailsInfo}>
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
			{/* Loop for information content */}
			{['Description', 'Details', 'Shipping'].map((section, index) => (
				<div key={section} className={styles.expandableText}>
					<div className={styles.title} onClick={() => toggle(index)}>
						<h3>{section}</h3><span>{selected === index ? "-" : "+"}</span>
					</div>
					{/* To create bullet points */}
					<div className={selected === index ? `${styles.content} ${styles.show}` : styles.content}>
						{index === 1 ? (
							<ReactMarkdown className="markdown">{item?.attributes?.details}</ReactMarkdown>
						) : (
							<p>{item?.attributes?.[section.toLowerCase()]}</p>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default ItemDetailsInfo;