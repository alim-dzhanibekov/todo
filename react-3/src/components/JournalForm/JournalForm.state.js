export const INITTAL_STATE = {
    isValid: {
        title: true,
        text: true,
        date: true
    },
    values: {
        title: '',
        text: '',
        date: '',
    },
    isFormReadyToSubmit: false
};

export function formReducer (state, action) {
    switch (action.type) {
        case 'SET_VALUE':
            return {...state, values: { ...state.values, ...action.payload}};
        case 'CLEAR':
            return {...state, values: INITTAL_STATE.values, isFormReadyToSubmit: false};
        case 'RESET_VALIDITY':
            return {...state, isValid: INITTAL_STATE.isValid};
        case 'SUBMIT' : {
            const titleValidity = typeof state.values.title === 'string' && state.values.title.trim().length > 0;
            const textValidity = typeof state.values.text === 'string' && state.values.text.trim().length > 0;
            const dateValidity = typeof state.values.date === 'string' && state.values.date.trim().length > 0;
            return  {
                ...state,
                isValid: {
                    title: titleValidity,
                    text: textValidity,
                    date: dateValidity
                },
                isFormReadyToSubmit: titleValidity && textValidity && dateValidity
            };
        }
        default:
            return state;
    }
}
