import {
    useReducer,
    createContext,
    Dispatch,
    ReactNode,
    useMemo
} from "react";

import {
    budgetAction,
    budgetReducer,
    budgetState,
    initialState
} from "../reducers/budget-reducer";


type BudgetContextProps = {
    state: budgetState,
    dispatch: Dispatch<budgetAction>,
    totalExpenses: number,
    totalRemaining: number
};

type BugetProviderProps = {
    children: ReactNode
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BugetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState);

      const totalExpenses = useMemo(() => 
        state.expenses.reduce((total, expense) => total + expense.amount, 0)
      , [state.expenses]);
    
      const totalRemaining = useMemo(() => 
        state.budget - totalExpenses
      , [state.budget, totalExpenses]);

    return (
        <BudgetContext.Provider value={{ state,
         dispatch,
         totalExpenses,
         totalRemaining  }}>
            {children}
        </BudgetContext.Provider>
    )
};