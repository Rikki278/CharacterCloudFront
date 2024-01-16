import React from 'react';
import styles from'./modal.module.css'
import { createPortal } from "react-dom";

function BackDrop (props){
    return <div onClick={props.onClose} className={styles.backdrop}></div>
}

function ModalOverlay (props){
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

function Wrapper(props) {
    return (
        <>
            {createPortal(  <BackDrop onClose = {props.closeCart}/>,document.getElementById('overlays'))}
            {createPortal(  <ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlays'))}
        </>
    );
}

export default Wrapper;