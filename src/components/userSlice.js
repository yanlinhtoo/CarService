import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_ALL_USERS = 'http://localhost:8484/api/user/all'
const POST_NEW_USERS = 'http://localhost:8484/api/user/create'
const DELETE_USERS = 'http://localhost:8484/api/user/delete/'

export const fetchUsers = createAsyncThunk('users/fetchUsers',async()=>{
    const response = await axios.get(GET_ALL_USERS)
    return response.data
})

export const addNewUsers = createAsyncThunk('users/addNewUsers',async(initialUser)=>{
    const response = await axios.post(POST_NEW_USERS,initialUser)
    return response.data
})

export const updateUsers = createAsyncThunk('users/updateUsers',async(initialUser)=>{
    const response = await axios.post(POST_NEW_USERS,initialUser)
    return response.data
})


export const deletedUsers = createAsyncThunk('users/deleteUsers',async(userId)=>{
    const response = await axios.delete(`${DELETE_USERS}${userId}`)
    return response.data
})

const initialState = {
    user:[],
    status:'idle',
    error:null
}

export const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{
       addUser:{
        reducer(state,action){
            state.push(action.payload)
        },
        prepare(fullname,email,password,ph,role,status){
            return {
                    payload:{
                        fullname,
                        email,
                        password,
                        ph,
                        role,
                        status
                    }
                }
            }         
       }
    },
    extraReducers(builder){
        builder
            .addCase(fetchUsers.pending,(state,action)=>{
                state.status='loading'
            })
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                state.status='succeeded'
                state.user = action.payload
            })
            .addCase(fetchUsers.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewUsers.fulfilled,(state,action)=>{
                state.user.push(action.payload)
            })
            .addCase(updateUsers.fulfilled,(state,action)=>{
                const user = action.payload
                const users = state.user.filter(u => u.id !== user.id)
                state.user = [user,...users]
            })
            .addCase(deletedUsers.fulfilled,(state,action)=>{

                const userId = action.payload
                console.log(userId)
                const users = state.user.filter(u => u.id !== userId)
                state.user = users
            })
    }
})

export const selectAllUsers = state => state.users.user
export const getUserStatus = state => state.users.status
export const getUserError = state => state.users.error
export const selectUserById = (state,userId) => state.users.user.find(user => user.id === userId)
export const {addUser} = userSlice.actions
export default userSlice.reducer