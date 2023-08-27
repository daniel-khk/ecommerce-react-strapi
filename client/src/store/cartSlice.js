import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cartItems: [],
	totalCount: 0,
	totalPrice: 0,
	isLoading: true
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action){
			const itemData = {...action.payload[0].attributes};
			itemData.selectedOption = action.payload[1];
			
			const exists = state.cartItems.find((item) => {
				return item.productId === itemData.productId
				&& item.selectedOption === itemData.selectedOption
            });
			if(exists === undefined) {
				state.cartItems.push(itemData);
			}
			else {
				exists.count = exists.count + 1;
			}
		},
		increase(state, action){
            const cartItem = state.cartItems.find((item) => {
                return item.productId === action.payload.productId 
				&& item.selectedOption === action.payload.selectedOption
            });
			cartItem.count = cartItem.count + 1;
			console.log(JSON.parse(JSON.stringify(cartItem)));
        },
		decrease(state, action){
            const cartItem = state.cartItems.find((item) => {
                return item.productId === action.payload.productId 
				&& item.selectedOption === action.payload.selectedOption
            });
			cartItem.count = cartItem.count - 1;
        },
		removeItem(state, action){
			state.cartItems = state.cartItems.filter((item) => {
                return !(item.productId === action.payload.productId 
				&& item.selectedOption === action.payload.selectedOption)
            });
        },
		calculateTotal(state){
			let totalCount = 0;
            let totalPrice = 0;
            state.cartItems.forEach((item) => {
                totalCount += item.count
                totalPrice += item.count * item.price
            })
            state.totalCount = totalCount;
            state.totalPrice = totalPrice;
        },
		clearCart(state){
            state.cartItems = [];
        }
	}
});

export const {
	addItem, increase, decrease, removeItem, calculateTotal, clearCart
} = cartSlice.actions;

export default cartSlice.reducer;