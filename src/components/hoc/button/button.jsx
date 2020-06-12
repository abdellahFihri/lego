import React from 'react';
 import styles from './button.module.scss';

 const button=({id,btnText,onClick})=>{
return(
<button className={styles.button} onClick={onClick} id={id}>{btnText}</button>
)
 }
 export default button;
