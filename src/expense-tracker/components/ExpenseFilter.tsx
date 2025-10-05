import { useState } from "react";
import categories from "../categories";
import { FieldValues } from "react-hook-form";
import ExpenseList from "./ExpenseList";
import { SetStateAction } from "react";

interface Props {
  expenses: FieldValues[];
  onDeleteExpense: (newData: SetStateAction<FieldValues[]>) => void;
}

const ExpenseFilter = ({ expenses, onDeleteExpense }: Props) => {
  if (expenses.length === 0) return null;
  const [selectedCategory, setSelectedCategory] = useState("");
  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;
  const onDelete = (id: number) => {
    onDeleteExpense(expenses.filter((data) => data.id !== id));
  };
  return (
    <div className="ExpenseFilter mt-5">
      <select
        onChange={(event) => setSelectedCategory(event.target.value)}
        className="form-select"
        aria-label="Categories"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
      {visibleExpenses.length ? (
        <ExpenseList expenses={visibleExpenses} onDelete={onDelete} />
      ) : (
        <p className="mt-2">No expenses are stored.</p>
      )}
    </div>
  );
};

export default ExpenseFilter;
