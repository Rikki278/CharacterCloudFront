import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk('/auth/loginUser', async (params)=>{
    const userData = await axios.get(`http://localhost:8080/anime/user-account/login`, {
        params: params
    });

    return userData.data
})

export const registerUser = createAsyncThunk('/auth/registerUser', async (params)=>{
    console.log(params)

    const userData = await axios.post(`http://localhost:8080/anime/user-account`, params);
    console.log(userData)
    return userData.data
})

const userFromLocalStorage = JSON.parse(window.localStorage.getItem('user'))

const defaultValues = {
    user:userFromLocalStorage !== null ? userFromLocalStorage : [
        {
            id:'',
            nickname:'',
            password:'',
            email:'',
            imageUrl:''
        }
    ],
    status:!!userFromLocalStorage
}


const userSlice = createSlice({
    name:'userAccount',
    initialState: defaultValues,
    reducers:{
        // loginUser:async (state, action)=>{
        //     //const userData = await axios.get(`http://localhost:8080/anime/user-account/${action.payload.email}/${action.payload.password}`, {
        //     const userData = await axios.get(`http://localhost:8080/anime/user-account/login`, {
        //         params: action.payload
        //     });
        //     console.log(userData)
        //     // const {id} = userData
        //     return userData.data
        // }
        changeStatus: state => {
            state.status ? state.status = false : state.status = true
        },
        getMe: (state, action) => {
            state.user = action.payload
            state.status = true
        }
    },
    extraReducers:{
        [loginUser.pending]: (state)=>{
            state.user = [
                {
                    id:'',
                    nickname:'',
                    password:'',
                    email:'',
                    imageUrl:''
                }
            ]
        },
        [loginUser.fulfilled]: (state,action)=>{
            state.user = action.payload
        },
        [loginUser.rejected]: (state)=>{
            state.user = [
                {
                    id:'',
                    nickname:'',
                    password:'',
                    email:'',
                    imageUrl:''
                }
            ]
        },
        [registerUser.pending]: (state)=>{
            state.user = [
                {
                    id:'',
                    nickname:'',
                    password:'',
                    email:'',
                    imageUrl:''
                }
            ]
        },
        [registerUser.fulfilled]: (state,action)=>{
            state.user = action.payload
        },
        [registerUser.rejected]: (state)=>{
            state.user = [
                {
                    id:'',
                    nickname:'',
                    password:'',
                    email:'',
                    imageUrl:''
                }
            ]
        },
}})

export const selectIsAuth = state => state.status
export const actions = userSlice.actions
export default userSlice.reducer