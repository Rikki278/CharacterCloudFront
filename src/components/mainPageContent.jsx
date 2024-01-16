import React from 'react';
import CardWrapper from "./card/cardWrapper";
import styles from './mainPageContent.module.css'

function MainPageContent(props) {
    return (
        <main>
            <CardWrapper className = {styles.cardWrapper}/>
        </main>
    );
}

export default MainPageContent;