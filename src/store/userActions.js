import { actions } from "./animeSlice";


export const getFetchData = (url)=>{
    return async dispatch =>{
        const fetchingData = async ()=>{
            const res = await fetch(url)

            if (!res.ok){
                throw new Error('Response not OK')
            }

            const data = await res.json()
            return data
        }

        const returnData = await fetchingData()
        dispatch(actions.changeAllUsers(returnData))
    }
}