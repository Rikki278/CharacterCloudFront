import './App.css';
import HomePage from "./pages/homePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFetchData } from "./store/userActions";
import { actions } from "./store/userSlice";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import Header from "./components/header/header";
import { selectIsAuth } from "./store/userSlice";
import { Register } from "./pages/Register/register";

function App() {
    // const dispatch = useDispatch()
    // const isAuth = useSelector(state => state.userAccount.status)
    // const userAccount = useSelector(state => state.userAccount.user)
    // let userId = isAuth ? userAccount.id : 0
    // console.log(userId,isAuth)
    //
    // const url = `http://localhost:8080/anime/user/${userId}/anime-title`
    //
    // useEffect(()=>{
    //     // if (userFromLocalStorage){
    //     //     dispatch(actions.changeStatus())
    //     //     dispatch(actions.changeStatus())
    //     // }
    //     dispatch(getFetchData(url))
    //
    // },[isAuth])

  return (
    <>
        <Header/>
        <Routes>
            <Route path = {'/'} element={<Login/>}/>
            <Route path = {'/register'} element={<Register/>}/>
            <Route path = {'/home'} element={<HomePage/>}/>
        </Routes>
    </>
  );
}

export default App;
