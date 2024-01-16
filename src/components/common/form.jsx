import React, { useState } from 'react';
import styles from './form.module.css';
import API from '../../API/API'
import { actions } from "../../store/animeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import {motion} from 'framer-motion'

function Form({id,className,name, title, description, imageUrl,...props}) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userAccount.user.id)
    const [formData, setFormData] = useState({
        name: name ? name : '',
        description: description ? description : '',
        animeTitle: title ? title : '',
        imageUrl: imageUrl ? imageUrl : '',
        userId
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (id){
            const updateCharacter = await API.updateAnimeCharacterById(id,formData)
            dispatch(actions.updateCharacter(updateCharacter))
        } else{
            const addedCharacter = await API.addNewAnimeCharacter(formData)
            console.log(addedCharacter)
            dispatch(actions.addNewAnimeCharacter(addedCharacter))
        }

        setFormData({
            name: '',
            description: '',
            animeTitle: '',
            imageUrl: '',
            userId
        });

        props.closePopUp()
    };



    return (
        <>
                <div className={styles['form-popup']}>
                    {imageUrl ? <img src={imageUrl} alt={name} className={styles['card-image']}/> : <img src={'https://www.anime-expo.org/wp-content/uploads/2017/04/AX_form-header.png'} alt={'Header'} className={styles['card-image']}/>}
                    <form className={styles['form-container']} onSubmit={handleSubmit}>
                        <h2  className={id ? '' : styles.active} >{id ? 'Update Anime Character' : 'Add Character Details'}</h2>

                        <TextField
                            onChange={handleInputChange}
                            inputProps={{ maxLength: 20 }}
                            value={formData.name}
                            fullWidth
                            name="name"
                            id="filled-basic"
                            label="Enter name"
                            color="secondary"
                            variant="outlined"
                            size="small"
                            required
                            style={{marginBottom: 15,content: 'none'}}
                        />

                        <TextField
                            onChange={handleInputChange}
                            inputProps={{ maxLength: 20 }}
                            value={formData.animeTitle}
                            fullWidth
                            name="animeTitle"
                            id="filled-basic"
                            label="Enter anime title"
                            color="secondary"
                            variant="outlined"
                            size="small"
                            required
                            style={{marginBottom: 15}}
                        />

                        <TextField
                            onChange={handleInputChange}
                            multiline
                            fullWidth
                            inputProps={{ maxLength: 250 }}
                            value={formData.description}
                            name="description"
                            id="filled-basic"
                            label="Enter character description"
                            color="secondary"
                            variant="outlined"
                            size="small"
                            required
                            style={{marginBottom: 15}}
                        />

                        <TextField
                            onChange={handleInputChange}
                            fullWidth
                            inputProps={{ maxLength: 200 }}
                            value={formData.imageUrl}
                            name="imageUrl"
                            id="filled-basic"
                            label="Enter Image URL"
                            color="secondary"
                            variant="outlined"
                            size="small"
                            required
                            style={{marginBottom: 15}}
                        />
                        <div>
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3, type: 'spring', stiffness: 150, damping: 15 }}
                            >
                                <Button type={'submit'} variant="contained" style={{backgroundColor: '#f865c7' , marginRight:10,paddingRight:10, fontSize: '12px'}}>
                                    Submit
                                    <EditIcon style={{fontSize:15,paddingLeft:5}}/>
                                </Button>
                            </motion.span>

                            {/*<Button type={'submit'} variant="contained" style={{backgroundColor: '#f865c7' , marginRight:10,paddingRight:10, fontSize: '12px'}}>*/}
                            {/*    Submit*/}
                            {/*    <EditIcon style={{fontSize:15,paddingLeft:5}}/>*/}
                            {/*</Button>*/}
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3, type: 'spring', stiffness: 150, damping: 15 }}
                            >
                                <Button onClick={props.closePopUp} variant="contained" style={{backgroundColor: '#ff4343' , marginRight:10, paddingRight:10, fontSize: '12px'}}>
                                    Close
                                    <CloseIcon style={{fontSize:20,paddingLeft:5}}/>
                                </Button>
                            </motion.span>


                            {/*<Button onClick={props.closePopUp} variant="contained" style={{backgroundColor: '#ff4343' , marginRight:10, paddingRight:10, fontSize: '12px'}}>*/}
                            {/*    Close*/}
                            {/*    <CloseIcon style={{fontSize:20,paddingLeft:5}}/>*/}
                            {/*</Button>*/}
                        </div>
                    </form>
                </div>
        </>)
}


export default Form;
