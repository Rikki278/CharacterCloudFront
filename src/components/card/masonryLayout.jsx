import React, { useEffect, useState } from 'react';
import './masonry.css'; // Create and import your CSS file for styling
import Masonry from 'react-masonry-css';
import { useDispatch, useSelector } from "react-redux";
import Card from "./card";
import ErrorWindow from "../error/errorWindow";
import { getFetchData } from "../../store/userActions";
import {motion} from 'framer-motion'

const MasonryLayout = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.userAccount.status)
    const userAccount = useSelector(state => state.userAccount.user)
    let userId = isAuth ? userAccount.id : 0
    console.log(userId,isAuth)

    const url = `http://localhost:8080/anime/user/${userId}/anime-title`

    useEffect(()=>{
        // if (userFromLocalStorage){
        //     dispatch(actions.changeStatus())
        //     dispatch(actions.changeStatus())
        // }
        dispatch(getFetchData(url))

    },[isAuth])

    const getUsers = useSelector(state => state.users.users)
    console.log(getUsers)
    const getSearchCharacter = useSelector(state => state.users.searchUsers)


    const dataToRender = getSearchCharacter.length > 0 ? getSearchCharacter : getUsers

    const breakpointColumnsObj = {
        default: 3, // Number of columns for the default breakpoint
        1100: 2,    // Number of columns for a screen width >= 1100px
        700: 1,     // Number of columns for a screen width >= 700px
    };

    return (
        <>
            {
                getUsers.length < 1 && <ErrorWindow text={['You dont have posts','Try add something']} />
            }
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {
                    getSearchCharacter[0] && getSearchCharacter[0].error === 'No characters' ? null : (
                        dataToRender.map(el => (
                            <motion.div
                                whileHover={{scale:1.03}}
                                key={el.id}
                                animate={{
                                    y: [50, 0],
                                }}
                                transition={{ duration: 0.3,type:'spring', stiffness:300 }}>

                                <Card
                                    id={el.id}
                                    className={'card'}
                                    imageUrl={el.imageUrl}
                                    name={el.name}
                                    title={el.animeTitle}
                                    description={el.description}
                                    key={el.specialCode}
                                />
                            </motion.div>
                        ))
                    )
                }




            </Masonry>
            {getSearchCharacter[0] && getSearchCharacter[0].error === 'No characters'  ? <ErrorWindow text={[`Nothing was found for your request '${getSearchCharacter[0].searchText}'`,'Try changing your search criteria or try again later.']}/> : null}
        </>
    );
};

export default MasonryLayout;
