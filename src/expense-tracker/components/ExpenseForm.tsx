import { FieldValues, useForm } from "react-hook-form";
import z, { map } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction } from "react";
import categories from "../categories";

const schema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .min(3, { message: "Description should be at least 3 charaters." }),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(0.01, { message: "Amount should be at least 0.01." }),
  // category: z
  //   .string()
  //   .min(1, { message: "Category is required." })
  //   .refine(
  //     (val) => ["Groceries", "Utilities", "Entertainment"].includes(val),
  //     {
  //       message: "Invalid category selected.",
  //     }
  //   ),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onAddExpense: (expenses: SetStateAction<FieldValues[]>) => void;
}

const ExpenseForm = ({ onAddExpense }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (newExpense: ExpenseFormData) => {
    onAddExpense((prevExpenses) => [
      ...prevExpenses,
      { ...newExpense, id: Date.now() },
    ]);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          id="description"
          type="text"
          className="form-control"
          {...register("description")}
        />
        {<p className="text-danger">{errors.description?.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          className="form-control"
          {...register("amount", { valueAsNumber: true })}
        />
        {<p className="text-danger">{errors.amount?.message}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          aria-label="Categories"
          {...register("category")}
        >
          <option value="">Please Select</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {<p className="text-danger">{errors.category?.message}</p>}
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
