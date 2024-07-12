import styles  from './Header.module.css'
import SelectUser from "../SelectUser/SelectUser.jsx";

function Header () {
    return (
        <>
            <div className={styles.logo}>logo</div>
            <SelectUser/>
        </>
    );
}

export default Header;
