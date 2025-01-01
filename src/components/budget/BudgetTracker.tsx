
import AmountDisplay from "@/components/AmountDisplay";
import { useBudget } from "@/hooks/useBudget";
import { useMemo } from "react";


export const BudgetTracker = () => {

  const { state, dispatch } = useBudget();

  const totalExpenses = useMemo(() => 
    state.expenses.reduce((total, expense) => total + expense.amount, 0)
  , [state.expenses]);

  const totalRemaining = useMemo(() => 
    state.budget - totalExpenses
  , [state.budget, totalExpenses]);
    

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="Gráfica de gastos" />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          onClick={()=> dispatch({type:'reset-budget'})}
          className="bg-pink-600 w-full p-2 rounded-lg uppercase text-white font-bold">
          Resetear app
        </button>
        <AmountDisplay
          label='Presupuesto'
          amount={state.budget}
        />
        <AmountDisplay
          label='Disponible'
          amount={totalRemaining}
        />
        <AmountDisplay
          label='Gastado'
          amount={totalExpenses}
        />
      </div>
    </div>
  )
};
