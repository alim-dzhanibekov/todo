import styles from './JournalForm.module.css'
import Button from "../Button/Button.jsx";
import {useContext, useEffect, useMemo, useReducer, useRef} from "react";
import {formReducer, INITTAL_STATE} from "./JournalForm.state.js";
import {UserContext} from "../../context/user.context.jsx";

function JournalForm({ onSubmit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITTAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef(null);
    const dateRef = useRef(null);
    const textRef = useRef(null);
    const {userId} = useContext(UserContext);
    const focusError = (isValid) => {
        if (titleRef.current && !isValid.title) {
            titleRef.current.focus();
        } else if (dateRef.current && !isValid.date) {
            dateRef.current.focus();
        } else if (textRef.current && !isValid.text) {
            textRef.current.focus();
        }
    }

    useEffect(() => {
        dispatchForm({ type: 'SET_VALUE', payload: { ...data }});
    }, [data]);

    useEffect(() => {
        let timerID;
        if (!isValid.title || !isValid.date || !isValid.text) {
            timerID = setTimeout(() => {
                focusError(isValid);
                dispatchForm({ type: 'RESET_VALIDITY' });
            }, 2000);
        }
        return () => {
            clearTimeout(timerID);
        };
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit(values);
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({ type: 'SET_VALUE', payload: { userId }});
        }
    }, [isFormReadyToSubmit, values, onSubmit, userId]);

    useEffect(() => {
        dispatchForm({ type: 'SET_VALUE', payload: { userId }})
    }, [userId]);
    const onChange = (e) => {
        dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } })
    }

    const addJournalItem = (e) => {
        e.preventDefault();
        dispatchForm({ type: 'SUBMIT' });
    }

    const titleInputClass = useMemo(() => {
        let titleClass = styles.input_title;
        if (!isValid.title) {
            titleClass += ' ' + styles.invalid;
        }
        return titleClass
    }, [isValid.title]);

    const dateInputClass = styles.input + ' ' + (isValid.date ? '' : styles.invalid);
    const textInputClass = styles.input + ' ' + (isValid.text ? '' : styles.invalid);

    return (
        <form className={styles['journal_form']} onSubmit={addJournalItem}>
            <div>
                <input
                    type='text'
                    ref={titleRef}
                    onChange={onChange}
                    value={values.title}
                    name='title'
                    className={titleInputClass} />
                {
                    data.id && <button
                        className={styles['delete']}
                        type={"button"}
                        onClick={() => onDelete(data.id)}>
                            delete
                   </button>
                }
            </div>
            <div className={styles.flo_row}>
                <label htmlFor='date' className={styles.form_label}>
                    <span>Дата</span>
                </label>
                <input
                    type='date'
                    ref={dateRef}
                    onChange={onChange}
                    value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
                    name='date'
                    id='date'
                    className={dateInputClass}
                />
            </div>
            <div className={styles.text_row}>
                <label htmlFor='text' className={styles.form_label}>
                    <span>Метки</span>
                </label>
                <input type='text' onChange={onChange} value={values.text} name='text' id='text' className={styles.input} />
            </div>
            <textarea name="text" ref={textRef} onChange={onChange} value={values.text} cols="30" rows="10" className={textInputClass}></textarea>
            <Button text="Сохранить" />
        </form>
    );
}

export default JournalForm;
