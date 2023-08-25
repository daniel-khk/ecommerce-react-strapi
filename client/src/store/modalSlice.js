import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
	checkoutIsOpen: false,
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state, action) {
			state.isOpen = true;
			document.body.style.overflow = "hidden";
		},
		closeModal(state, action) {
			state.isOpen = false;
			document.body.style.overflow = "unset";
		},
		openCheckoutModal(state, action) {
			state.checkoutIsOpen = true;
			document.body.style.overflow = "hidden";
		},
		closeCheckoutModal(state, action) {
			state.checkoutIsOpen = false;
			document.body.style.overflow = "unset";
		},
	}
})

export const { 
	openModal, closeModal, openCheckoutModal, closeCheckoutModal
} = modalSlice.actions;

export default modalSlice.reducer;