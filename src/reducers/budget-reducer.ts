
import { DraftExpense, Expense } from "../types";
import { v4 as uuidv4 } from 'uuid';


export type budgetAction =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'reset-budget' } |
    { type: 'show-modal' }


export type budgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[]
};

export const initialState: budgetState = {
    budget: 0,
    modal: false,
    expenses: []
};

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
};

export const budgetReducer = (state: budgetState = initialState, action: budgetAction) => {

    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget: action.payload.budget
            }

        case 'reset-budget':
            return {
                budget: 0,
                modal: false
            }

        case 'show-modal':
            return {
                ...state,
                modal: !state.modal
            }

        case 'add-expense':

            const expense = createExpense(action.payload.expense)

            return {
                ...state,
                expenses: [...state.expenses, expense],
                modal: false

            }
    }
};