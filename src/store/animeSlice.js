import { createSlice } from "@reduxjs/toolkit";

const defaultValues = {
    users:[
        {
            id:'',
            name:'',
            animeTitle:'',
            description:'',
            imageUrl:'',
            specialCode:'',
            userId:''
        }
    ],
    searchUsers:[]
}

const animeSlice = createSlice({
    name:'users',
    initialState: defaultValues,
    reducers:{
        changeAllUsers: (state,action) => {
            state.users = action.payload
        },
        addNewAnimeCharacter: (state, action)=>{
            state.users.push(action.payload)

        },
        deleteAnimeCharacter: (state, action)=>{
            if(state.searchUsers.length > 0){
                state.searchUsers = state.searchUsers.filter(elem => elem.id !== action.payload)
            }

            state.users = state.users.filter(elem => elem.id !== action.payload)
        },
        updateCharacter: (state, action)=>{

            if(state.searchUsers.length > 0){
                const findElemIndex = state.searchUsers.findIndex(elem => elem.id === action.payload.id)
                state.searchUsers[findElemIndex] = action.payload
            }

            const findElemIndex = state.users.findIndex(elem => elem.id === action.payload.id)
            state.users[findElemIndex] = action.payload
        },
        searchQuery: (state, action)=>{
            if (action.payload === ''){
                state.searchUsers = []
            } else{
                let searchUser;
                searchUser = state.users.filter(elem => elem.name.trim().toLowerCase().includes(action.payload) || elem.animeTitle.trim().toLowerCase().includes(action.payload));

                if(searchUser.length > 0){
                    state.searchUsers = searchUser
                } else {
                    state.searchUsers = [{
                        error: 'No characters',
                        searchText: action.payload
                    }]
                }
            }
        }
    }
})


export const actions = animeSlice.actions
export default animeSlice.reducer