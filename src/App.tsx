
import { useEffect, useMemo } from 'react';

import { BudgetTracker } from '@/components/budget/BudgetTracker';
import ExpenseModal from './components/expense/ExpenseModal';
import ExpenseList from '@/components/expense/ExpenseList';
import BudgetForm from '@/components/budget/BudgetForm';
import { useBudget } from '@/hooks/useBudget';
import './index.css'

function App() {

  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
    localStorage.setItem('expenses', JSON.stringify(state.expenses));

  }, [state]);

  return (
    <>
      <header className='bg-blue-600 py-8 max-h-72'>
        <h1 className='text-center text-4xl text-white uppercase font-black'>
          Planificador de Gastos
        </h1>
      </header>

      <div className='bg-white rounded-lg shadow-lg max-w-3xl mx-auto mt-10 p-10'>
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBudget &&
        (
          <main className='max-w-3xl mx-auto py-10'>
            <ExpenseList/>
            <ExpenseModal />
          </main>
        )}
    </>
  )
}

export default App
