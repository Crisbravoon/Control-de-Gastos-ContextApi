
import AmountDisplay from "@/components/AmountDisplay";
import { useBudget } from "@/hooks/useBudget";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

export const BudgetTracker = () => {

  const { state, dispatch, totalExpenses, totalRemaining } = useBudget();

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <div className="flex justify-center">
        <CircularProgressbar 
        value={percentage}
        styles={buildStyles({
          pathColor:  percentage === 100 ? '#DC2626' :"#2196F3",
          trailColor: "#D3D3D3",
          textSize: 10,
          textColor: percentage === 100 ? '#DC2626' :"#2196F3",
        })}
        text={`${percentage}% Gastado` }
        />
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
