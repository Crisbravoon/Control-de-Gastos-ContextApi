
import { useMemo } from "react";

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';

import 'react-swipeable-list/dist/styles.css';

import AmountDisplay from "@/components/AmountDisplay";
import { categories } from "@/data/Categories";
import { useBudget } from '@/hooks/useBudget';
import { formatDate } from "@/helpers";
import { Expense } from "@/types"

type ExpenseDetailProps = {
    expense: Expense
};

const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {

    const { dispatch } = useBudget();

    const categoryInfo = useMemo(() =>
        categories.filter(cat => cat.id === expense.category)[0]
        , [expense]);


    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => 
                dispatch({ type: 'editing-expense', payload: { id: expense.id } })}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => dispatch({ type: 'delete-expense', payload: { id: expense.id } })}
            >
                Eliminiar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}>

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
                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseDetail