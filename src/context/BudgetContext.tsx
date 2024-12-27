

import {
    useReducer,
    createContext,
    Dispatch,
    ReactNode
} from "react";

import {
    budgetAction,
    budgetReducer,
    budgetState,
    initialState
} from "../reducers/budget-reducer";


type BudgetContextProps = {
    state: budgetState,
    dispatch: Dispatch<budgetAction>
};

type BugetProviderProps = {
    children: ReactNode
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BugetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState);

    return (
        <BudgetContext.Provider value={{ state, dispatch }}>
            {children}
        </BudgetContext.Provider>
    )
};