

export type budgetAction =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'reset-budget'} |
    { type: 'show-modal' } 


export type budgetState = {
    budget: number,
    modal: boolean
};

export const initialState: budgetState = {
    budget: 0,
    modal: false
};


export const budgetReducer = (state: budgetState = initialState, action: budgetAction) => {

    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget: action.payload.budget
            }

        case 'reset-budget':
            return{
                budget: 0,
                modal: false
            }

        case 'show-modal':
            return {
                ...state,
                modal: !state.modal 
            }
    }
};