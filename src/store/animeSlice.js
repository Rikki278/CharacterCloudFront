import { createSlice } from "@reduxjs/toolkit";

const defaultValues = {
    characters:[
        {
            id:'',
            name:'',
            animeTitle:'',
            description:'',
            imageUrl:'',
            userId:''
        }
    ],
    searchCharacters:[],
    allCharactersStatus:false,
    allCharacters:[]
}

const animeSlice = createSlice({
    name:'characters',
    initialState: defaultValues,
    reducers:{
        //исправить на changeAllCharacters
        changeAllCharacters: (state,action) => {
            state.characters = action.payload
        },
        changeCharactersAll:(state, action)=>{
            state.allCharacters = action.payload
        },
        changeStatusAll:(state,action)=>{
            state.allCharactersStatus = action.payload
        },
        addNewAnimeCharacter: (state, action)=>{
            state.characters.push(action.payload)
            state.allCharacters.push(action.payload)
        },
        deleteAnimeCharacter: (state, action)=>{
            if(state.searchCharacters.length > 0){
                state.searchCharacters = state.searchCharacters.filter(elem => elem.id !== action.payload)
            }

            state.characters = state.characters.filter(elem => elem.id !== action.payload)
            state.allCharacters = state.allCharacters.filter(elem => elem.id !== action.payload)
        },
        updateCharacter: (state, action)=>{

            if(state.searchCharacters.length > 0){
                const findElemIndex = state.searchCharacters.findIndex(elem => elem.id === action.payload.id)
                state.searchCharacters[findElemIndex] = action.payload
            }

            const findElemIndex = state.characters.findIndex(elem => elem.id === action.payload.id)
            const findElemIndexForAll = state.allCharacters.findIndex(elem => elem.id === action.payload.id)
            state.characters[findElemIndex] = action.payload
            state.allCharacters[findElemIndexForAll] = action.payload
        },
        searchQuery: (state, action)=>{
            console.log(state.allCharactersStatus)
            let searchChrct; //searchCharacter
            if (action.payload === ''){
                state.searchCharacters = []
            } else if (state.allCharactersStatus){

                searchChrct = state.allCharacters.filter(elem => elem.name.trim().toLowerCase().includes(action.payload) || elem.animeTitle.trim().toLowerCase().includes(action.payload));

                if(searchChrct.length > 0){
                    state.searchCharacters = searchChrct
                } else {
                    state.searchCharacters = [{
                        error: 'No characters',
                        searchText: action.payload
                    }]
                }
            } else {
                searchChrct = state.characters.filter(elem => elem.name.trim().toLowerCase().includes(action.payload) || elem.animeTitle.trim().toLowerCase().includes(action.payload));

                if(searchChrct.length > 0){
                    state.searchCharacters = searchChrct
                } else {
                    state.searchCharacters = [{
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