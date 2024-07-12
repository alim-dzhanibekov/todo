import styles from './Button.module.css'
import {useState} from "react";

function Button ({text, onClick}) {

    // let text = 'сохранить';
    // const [text,setText] = useState('Сохранить');
    // const clicked = () => {
    //     setText('Закрыть');
    //     console.log('hello');
    //     // console.log(text);
    // };
    return (
        <button className={styles.button + ' ' + styles.accent} onClick={onClick}>{text}</button>
    );
}

export default Button;
