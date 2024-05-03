import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    productId: null,
    productName: '',
    orderWeight: 0,
    selectedTastings: {},
    TastingsPrice: 0,
    orderPrice: 0,
    productComments: '',
    deliveryDate: null,
    address: '',
    name: '',
    email: '',
    phone: '',
    commentary: '',
  },
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    setProductName: (state, action) => {
      state.productName = action.payload;
    },
    setOrderWeight: (state, action) => {
      state.orderWeight = action.payload;
    },
    setTastings: (state, action) => {
      state.selectedTastings = {...action.payload };
    },
    setTPrice: (state, action) => {
      state.TastingsPrice = action.payload;
    },
    setOrderPrice: (state, action) => {
      state.orderPrice = action.payload;
    },
    setProductComments: (state, action) => {
      state.productComments = action.payload;
    },
    setDeliveryDate: (state, action) => {
      state.deliveryDate = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setCommentary: (state, action) => {
      state.commentary = action.payload;
    },
  },
});

export const {
  setProductId,
  setProductName,
  setOrderWeight,
  setTastings,
  setTPrice,
  setOrderPrice,
  setProductComments,
  setDeliveryDate,
  setName,
  setEmail,
  setPhone,
  setAddress,
  setCommentary
} = orderSlice.actions;

export default orderSlice.reducer;