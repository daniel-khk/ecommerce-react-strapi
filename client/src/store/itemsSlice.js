import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	carousel: [],
	isLoading: true
}

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
		setCarousel(state, action) {
			state.carousel = action.payload;
		}
	}
});

export const { setItems, setCarousel } = itemsSlice.actions;

export default itemsSlice.reducer;