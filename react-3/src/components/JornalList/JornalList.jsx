import './JornalList.css'
import {useContext} from "react";
import CardButton from "../CardButton/CardButton.jsx";
import Journalitem from "../Journalitem/Journalitem.jsx";
import {UserContext} from "../../context/user.context.jsx";
function JornalList ({items = [], setItem}) {

    const {userId} = useContext(UserContext);

    if (items.length === 0) {
        return <p>Записей пока нет</p>;
    }

    const sortItems = (a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    };


    return <>
            {items
                .filter(el => el.userId === userId)
                .sort(sortItems)
                .map(el =>(
                <CardButton key={el.id} onClick={() => setItem(el)} >
                    <Journalitem
                        title={el.title}
                        text={el.text}
                        date={new Date(el.date)}
                    />
                </CardButton>
            ))}
        </>;
}

export default JornalList;
