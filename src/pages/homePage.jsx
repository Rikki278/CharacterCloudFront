import React from 'react';
import Header from '../components/header/header'
import MainPageContent from "../components/mainPageContent";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage(props) {
    const isAuth = useSelector(state => state.userAccount.status)
    if(!isAuth){
        return <Navigate to={'/'}/>
    }
    return (
        <div>
            <MainPageContent/>
        </div>
    );
}

export default HomePage;