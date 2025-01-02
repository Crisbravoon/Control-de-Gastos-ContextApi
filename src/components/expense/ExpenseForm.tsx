
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import 'react-date-picker/dist/DatePicker.css';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'

import type { DraftExpense, Value } from "@/types";
import { categories } from "@/data/Categories";
import { useBudget } from "@/hooks/useBudget";
import ErrorMessage from "./ErrorMessage";
import Swal from "sweetalert2";


const ExpenseForm = () => {

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: '',
    amount: 0,
    category: '',
    date: new Date(),
  });

  const [error, setError] = useState('');
  const [previousAmount, setPreviousAmount] = useState(0);
  const { dispatch, state, totalRemaining } = useBudget();

  useEffect(() => {

    if (state.editingId) {
      const expenseToEdit = state.expenses.filter((exp) => exp.id === state.editingId)[0];
      setExpense(expenseToEdit);
      setPreviousAmount(expenseToEdit.amount);
    }
  }, [state.editingId])


  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    // Obtenemos el nombre y el valor de los inputs
    const { name, value } = e.target;

    // Validamos que la cantidad sea un número positivo
    const isAmountField = ['amount'].includes(name);

    // Actualizamos el estado del gasto con el nuevo valor
    setExpense(
      { ...expense, [name]: isAmountField ? Number(value) : value })
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    // Trae todo los valores de forma de array y si es que estan vacios 
    if (Object.values(expense).includes('')) {
      setError('Todos  los campos son obligatorios ');
      return;
    };

    if ((expense.amount - previousAmount) > totalRemaining) {
      setError('Sobre pasa el presupuesto')
      return;
    }

    //Agregando o Actuliazando el gasto.
    state.editingId
      ? (dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
        , Swal.fire({
          title: "Gasto Actualizado",
          text: "Tu gasto se ha actulizado correctamente...",
          icon: "success"
        }))

      : (dispatch({ type: 'add-expense', payload: { expense } })
        , Swal.fire({
          title: "Gasto Registrado",
          text: "Se registro tu gasto correctamente...",
          icon: "success"
        }))

    setExpense({
      expenseName: '',
      amount: 0,
      category: '',
      date: new Date(),
    });

    setPreviousAmount(0);
  };

  return (

    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId ? 'Actualización Gasto' : 'Nuevo Gasto'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="expenseName"
          className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          value={expense.expenseName}
          id="expenseName"
          name="expenseName"
          placeholder="Ej. Gasolina"
          className="bg-slate-100 p-2  rounded-lg"
          onChange={handleChange} />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="amount"
          className="text-xl">
          Cantidad
        </label>
        <input
          type="number"
          id="amount"
          value={expense.amount}
          name="amount"
          placeholder="Añade la cantidad"
          className="bg-slate-100 p-2  rounded-lg"
          onChange={handleChange} />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-xl">
          Categoria
        </label>
        <select
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          className="bg-slate-100 p-2  rounded-lg" >

          <option value="">Seleccione una Categoria </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}

        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="expenseName"
          className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          className='bg-slate-100 p-2 rounded-lg'
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input type="submit"
        className="bg-blue-600 uppercase w-full cursor-pointer text-white font-bold p-2 rounded-lg "
        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'} />
    </form>
  )
}

export default ExpenseForm;
