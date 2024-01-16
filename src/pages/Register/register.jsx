import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "../Login.module.css";
import {useDispatch, useSelector} from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import { actions, registerUser } from "../../store/userSlice";

export const Register = () => {
    const nav = useNavigate()
    const isAuth = useSelector(state => state.userAccount.status)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState:{errors,isValid}
    } = useForm({
        defaultValues:{
            nickname:'',
            password:'',
            email:'',
            imageUrl:''
        },
        mode:'onChange'
    })

    if(isAuth){
        return <Navigate to={'/'}/>
    }

    const onSubmit = async (values)=>{
        const data = await dispatch(registerUser(values))
        console.log(data)
        if(!data.payload){
            return  alert('Error register')
        }

        dispatch(actions.getMe(data.payload))
        window.localStorage.setItem('user',JSON.stringify(data.payload))
        nav('/home')
    }


    return (
        <Paper classes={{ root: styles.root }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography classes={{ root: styles.title }} variant="h5">
                    Create account
                </Typography>
                <div className={styles.avatar}>
                    <Avatar sx={{ width: 100, height: 100 }} />
                </div>
                <TextField
                    error={Boolean(errors.nickname?.message)}
                    {...register('nickname', { required : 'Enter Nickname'})}
                    helperText={errors.nickname?.message}
                    className={styles.field}
                    label="Nickname"
                    color="secondary"
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    fullWidth
                    type={"email"}
                    error={Boolean(errors.email?.message)}
                    color="secondary"
                    {...register('email', { required : 'Enter email'})}
                    helperText={errors.email?.message}
                />
                <TextField
                    className={styles.field}
                    label="Password"
                    fullWidth
                    type={"password"}
                    error={Boolean(errors.password?.message)}
                    {...register('password', { required : 'Enter password'})}
                    color="secondary"
                    helperText={errors.password?.message}
                />
                <TextField
                    className={styles.field}
                    label="Image Url"
                    fullWidth
                    type={"text"}
                    error={Boolean(errors.imageUrl?.message)}
                    {...register('imageUrl', { required : 'Enter imageUrl'})}
                    color="secondary"
                    helperText={errors.imageUrl?.message}
                />
                <Button style={{backgroundColor:'#dc87fe'}} disabled={!isValid} type={"submit"} size="large" variant="contained" fullWidth>
                    Create account
                </Button>
            </form>
        </Paper>
    );
};
