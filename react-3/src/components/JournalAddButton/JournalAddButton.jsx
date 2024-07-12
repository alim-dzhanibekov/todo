import './JournalAddButton.css'
import CardButton from "../CardButton";

function JournalAddButton () {
    return (
        <CardButton className='journal-add'>
            <img src="/plus-svgrepo-com.svg" alt="плюююсик"/>
            Новое воспоминание
        </CardButton>
    );
}

export default JournalAddButton;
