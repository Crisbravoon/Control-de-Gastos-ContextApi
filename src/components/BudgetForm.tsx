
import { useMemo, useState } from "react";

const BudgetForm = () => {

    const [budget, setBudget] = useState(0);

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setBudget(+e.target.value);
    };


    return (
        <form className="space-y-5">
            <div className="flex flex-col space-y-5">
                <label
                    htmlFor="budget"
                    className="text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
            </div>

            <input
                id="budget"
                type="number"
                className="w-full bg-white border border-gray-200 p-2"
                placeholder="Define tu presupuesto"
                name="budget"
                value={budget}
                onChange={handleChange} />

            <input
                type="submit"
                className=" bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 
                uppercase text-white font-black disabled:opacity-40"
                value='Definir Presupuesto'
                disabled={isValid}
            />
        </form>
    )
}

export default BudgetForm;