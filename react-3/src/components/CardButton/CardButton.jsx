import styles from './CardButton.module.css'
import {classNames} from "../../utils/classNames.js";

function CardButton ({children, className, ...props}) {
    return (
        <button {...props} className={classNames([styles.card_button], {[className]: className})}>
            {children}
        </button>
    );
}

export default CardButton;
