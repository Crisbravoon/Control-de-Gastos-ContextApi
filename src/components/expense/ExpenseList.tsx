
import { useMemo } from "react";

import ExpenseDetail from "@/components/expense/ExpenseDetail";
import { useBudget } from "@/hooks/useBudget"

const ExpenseList = () => {

    const { state } = useBudget();

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

    return (
        <div>
            {isEmpty ? (
                <p className='text-center text-2xl font-bold text-gray-600'>No hay gastos registrados.</p>
            ) : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">
                        Listado de Gastos.
                    </p>
                    {state.expenses.map(expenses => (
                        <div key={expenses.id} className="items-center my-2">

                            <ExpenseDetail key={expenses.id}
                            expense ={expenses}/>
                        </div>
                    ))}

                </>
            )}
        </div>
    )
}

export default ExpenseList 