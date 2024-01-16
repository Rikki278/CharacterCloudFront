import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
import styles from './header.module.css';
import Form from "../common/form";
import WrapperForModal from "../UI/wrapperForModal";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/animeSlice";
import {actions as actionUser} from "../../store/userSlice"
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'

function Header(props) {
    const nav = useNavigate()
    const userImage = useSelector(state => state.userAccount.user.imageUrl)
    const userName = useSelector(state => state.userAccount.user.nickname)
    const status = useSelector(state => state.userAccount.status)
    const [isVisible,setIsVisible] = useState(false)
    const [search,setSearch] = useState('')
    const dispatch = useDispatch()

    const onClickHandler = ()=>{
        status ? setIsVisible(true) : nav('/register')

    }

    let newName = userName
    if (userName && userName.length > 7) {
        const trimmedName = userName.slice(0, 7); // Вырезаем первые 20 символов
        newName = `${trimmedName}...`; // Добавляем три точки
    }

    const onChangeHandler = (e)=>{
        setSearch(e.target.value)
        const string = e.target.value.trim().toLowerCase()
        dispatch(actions.searchQuery(string))
    }

    const onLogOutHandler = ()=>{
        window.localStorage.removeItem('user')
        dispatch(actionUser.changeStatus())
        nav('/')
    }

    const onClickLoginHandler = ()=>{
        nav('/')
    }

    return (
        <header>
            <div className={styles.leftSide}>
                <h1>
                    Anime Manager
                </h1>
                <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:75 }}>
                    <Button onClick={onClickHandler} variant={'contained'} style={{backgroundColor:'#dc87fe'}}>{status ? 'Add Character' : 'Sign up'}</Button>
                </motion.span>
                <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:75 }}>
                    {!status && <Button onClick={onClickLoginHandler} variant={'contained'} style={{backgroundColor:'#dc87fe',marginLeft:20}}>Log in</Button>}
                </motion.span>
                {/*{!status && <Button onClick={onClickLoginHandler} variant={'contained'} style={{backgroundColor:'#dc87fe',marginLeft:20}}>Log in</Button>}*/}
                {isVisible ? <WrapperForModal closePopUp={()=> setIsVisible(false)}> <Form closePopUp={()=> setIsVisible(false)}/> </WrapperForModal> : null}
            </div>
            {/*{status && <TextField   onChange={onChangeHandler}  inputProps={{ maxLength: 20 }} value={search} id="filled-basic" label="Search" color="secondary" variant="filled" size="small"/>}*/}
            <div className={styles.rightSide}>
                {status && <TextField style={{paddingRight:10}}  onChange={onChangeHandler}  inputProps={{ maxLength: 20 }} value={search} id="filled-basic" label="Search" color="secondary" variant="filled" size="small"/>}
                {/*{status && <Button onClick={onLogOutHandler} variant={'contained'} style={{backgroundColor:'#dc87fe'}}>Logout</Button>}*/}
                {status &&
                    <div className={styles['avatar-wrapper']}>
                        <div style={{color:'black',fontWeight:'700'}}>
                            {newName}
                        </div>
                        <div className={styles['avatar-container']}>
                            <img src={userImage} alt="Profile picture"/>
                        </div>

                        <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:75 }}>
                            <Button onClick={onLogOutHandler} variant={'contained'} style={{backgroundColor:'#dc87fe'}}>Logout</Button>
                        </motion.span>
                        {/*<Button onClick={onLogOutHandler} variant={'contained'} style={{backgroundColor:'#dc87fe'}}>Logout</Button>*/}
                    </div>}



            </div>
        </header>
    );
}

export default Header;