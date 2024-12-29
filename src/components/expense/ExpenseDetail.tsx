import { formatDate } from "../../helpers";
import { Expense } from "../../types"

type ExpenseDetailProps = {
    expense: Expense
};

const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
    return (
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200">

            <div>

            </div>
            <div>
                <p>{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">
                    {formatDate(expense.date!.toString())}
                </p>
            </div>
            <div>

            </div>

        </div>
    )
}

export default ExpenseDetail