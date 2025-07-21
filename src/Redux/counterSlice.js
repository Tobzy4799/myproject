import { createSlice } from "@reduxjs/toolkit";



export const counterSlice = createSlice({
    name: 'counter',
    initialState:{
        counter:2,
        students:['sade', 'bola', 'jare'],
        isLoading: false
    },
    reducers:{
        increment:(state)=>{
           state.counter +=1
            // console.log(state.value);
            // state.value +=1 -> wrong
            
        },
       decrementByAmount: (state, action) => {
      state.counter -= action.payload
    },
    }
})

export default counterSlice.reducer

export const {increment, decrementByAmount} = counterSlice.actions