
import { v4 as uuidv4 } from 'uuid';
import { DraftExpense, Expense, Category } from "@/types";



export type budgetAction =
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'editing-expense', payload: { id: Expense['id'] } } |
    { type: 'delete-expense', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'filter-category', payload: {id: Category['id']} } |
    { type: 'reset-budget' } |
    { type: 'show-modal' }


export type budgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategory: Category['id']
};

const initialBudget = () : number=>{
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget? Number(localStorageBudget) : 0;
};

const localStorageExpenses = () : Expense[] =>{
    const localStorageExpenses = localStorage.getItem('expenses');
    return localStorageExpenses? JSON.parse(localStorageExpenses) : [];
};

export const initialState: budgetState = {
    budget: initialBudget(),
    expenses: localStorageExpenses(),
    modal: false,
    editingId: '',
    currentCategory: ''
};

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
};

export const budgetReducer = (state: budgetState = initialState, action: budgetAction): budgetState => {

    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget: action.payload.budget
            }

        case 'reset-budget':
            return {
                ...state,
                budget: 0,
                modal: false,
                expenses: [],
            }

        case 'show-modal':
            return {
                ...state,
                modal: !state.modal,
                editingId: ''
            }

        case 'add-expense':

            const expense = createExpense(action.payload.expense)

            return {
                ...state,
                expenses: [...state.expenses, expense],
                modal: false

            }

        case 'delete-expense':
            return {
                ...state,
                expenses: state.expenses.filter(exp => exp.id !== action.payload.id)
            }

        case 'editing-expense':
            return {
                ...state,
                editingId: action.payload.id,
                modal: true,
            }

        case 'update-expense':
            return {
                ...state,

                expenses: state.expenses.map(
                    exp => exp.id === action.payload.expense.id ? action.payload.expense : exp),
                    modal: false,
                    editingId: '',
            }

        case 'filter-category':
            return {
               ...state,
                currentCategory: action.payload.id
            }

        default:
            return state;
    }
};