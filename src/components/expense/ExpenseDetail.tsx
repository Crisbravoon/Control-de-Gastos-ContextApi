import { formatDate } from "@/helpers";
import { Expense } from "@/types"
import AmountDisplay from "@/components/AmountDisplay";
import { useMemo } from "react";
import { categories } from "@/data/Categories";

type ExpenseDetailProps = {
    expense: Expense
};

const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {

    const categoryInfo = useMemo(() =>
        categories.filter(cat => cat.id === expense.category)[0]
        , [expense])

    return (
        <div className="flex gap-5 items-center mx-auto bg-white shadow-lg p-10 w-full border-b border-gray-200">

            <div>
                <img className='w-20' src={`/icono_${categoryInfo.icon}.svg`} alt='icono gasto' />
            </div>

            <div className="flex-1 space-y-2">
                <p className="text-sm uppercase text-slate-500 font-bold">{categoryInfo.name}</p>
                <p>{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">
                    {formatDate(expense.date!.toString())}
                </p>
            </div>

            <AmountDisplay
                amount={expense.amount} />
        </div>
    )
}

export default ExpenseDetail