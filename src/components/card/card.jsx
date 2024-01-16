import React, { useState } from 'react';
import styles from './card.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import API from '../../API/API'
import { actions } from "../../store/animeSlice";
import { useDispatch } from "react-redux";
import WrapperForModal from "../UI/wrapperForModal";
import Form from "../common/form";
import {motion} from 'framer-motion'


const Card = ({id,className,name, title, description, imageUrl}) => {
    const [isVisible,setIsVisible] = useState(false)

    const onClickHandler = ()=>{
        setIsVisible(true)
    }

    const dispatch = useDispatch()

    const deleteHandler = ()=>{
        API.deleteCharacter(id)
        dispatch(actions.deleteAnimeCharacter(id))
    }

    const modal =  isVisible ? <WrapperForModal closePopUp={()=> setIsVisible(false)}> <Form id={id} className={'card'} imageUrl={imageUrl} name={name} title={title} description={description} closePopUp={()=> setIsVisible(false)}/> </WrapperForModal> : null

    return (
        <div className={styles.card && className}>
            <img src={imageUrl} alt={name} className={styles['card-image']}/>
            <div className={styles['card-content']}>
                <h2 className={styles['card-name']}>{name}</h2>
                <h3 className={styles['card-title']}>{title}</h3>
                <p className={styles['card-description']}>{description}</p>
                <div className="card-buttons">
                    <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:75 }}>
                        <Button onClick={onClickHandler} variant="contained" style={{backgroundColor: '#f865c7' , marginRight:10,paddingRight:5}}>
                            Update
                            <EditIcon style={{fontSize:15,paddingLeft:10}}/>
                        </Button>
                    </motion.span>
                    {/*<Button onClick={onClickHandler} variant="contained" style={{backgroundColor: '#f865c7' , marginRight:10,paddingRight:5}}>*/}
                    {/*    Update*/}
                    {/*    <EditIcon style={{fontSize:15,paddingLeft:10}}/>*/}
                    {/*</Button>*/}
                    {modal}
                    <motion.span
                        whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:75 }}
                    >
                        <Button onClick={deleteHandler} variant="contained" style={{ backgroundColor: '#ff4343', marginRight: 10, paddingRight: 5 }}>
                            Delete
                            <DeleteIcon style={{ fontSize: 15, paddingLeft: 10 }} />
                        </Button>
                    </motion.span>

                    {/*<Button onClick={deleteHandler} variant="contained" style={{backgroundColor: '#ff4343' , marginRight:10,paddingRight:5}}>*/}
                    {/*    Delete*/}
                    {/*    <DeleteIcon style={{fontSize:15,paddingLeft:10}}/>*/}
                    {/*</Button>*/}
                </div>
            </div>
        </div>
    );
};

export default Card;