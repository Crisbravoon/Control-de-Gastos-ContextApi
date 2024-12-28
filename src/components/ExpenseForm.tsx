
import { ChangeEvent, useState } from "react";

import 'react-date-picker/dist/DatePicker.css';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'

import { categories } from "../data/Categories";
import type { DraftExpense, Value } from "../types";


const ExpenseForm = () => {

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: '',
    amount: 0,
    category: '',
    date: new Date(),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

    e.preventDefault();
    const { name, value } = e.target;

    const isAmountField = ['amount'].includes(name);

    setExpense(
      {
        ...expense,
        [name]: isAmountField ? Number(value) : value,
      })
  };


  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  return (

    <form className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>

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
        value={'Registrar Gasto'} />
    </form>
  )
}

export default ExpenseForm;
