

import { categories } from "@/data/Categories"
import { useBudget } from "@/hooks/useBudget"
import { ChangeEvent } from "react";

const FilterByCategory = () => {

    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {

        dispatch({ type: 'filter-category', payload: { id: e.target.value } })

    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-10">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="text-blue-600 font-bold text-2xl" htmlFor="category">Filtrar Gastos</label>
                    <select
                        id="category"
                        className="bg-slate-100 p-3 flex-1 rounded"
                        onChange={handleChange}>
                        <option value="">
                            --- Todas las Categorias
                        </option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}

export default FilterByCategory