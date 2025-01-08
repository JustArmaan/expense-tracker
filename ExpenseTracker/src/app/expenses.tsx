import DeleteExpense from "./delete-expense";
import {
  getAllExpensesWithCategory,
  getTotalExpenses,
} from "@/actions/sandboxActions";

export default async function Expenses({ date }: { date?: string }) {
  const allExpenses = await getAllExpensesWithCategory(date);
  const allAmount = await getTotalExpenses(date);

  const totalAmount = allAmount.reduce((a, c) => a + Number(c.amount), 0);

  return (
    <>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Expenses</h2>

        {allExpenses.length === 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No expenses found, add an expense
          </p>
        ) : (
          allExpenses.map((expense) => (
            <div>
              <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md mb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">
                    {expense.expenses.description}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {expense.expenses.date}
                  </p>
                </div>
                <div className="flex gap-x-4 h-full items-center text-right">
                  <div>
                    <p className="text-lg font-bold">
                      ${expense.expenses.amount}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {expense.categories.name}
                    </p>
                  </div>
                  <DeleteExpense expenseId={expense.expenses.id} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Total Expenses</h2>
        {totalAmount === 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-400">No expense</p>
        ) : (
          <p className="text-lg font-bold">${totalAmount}</p>
        )}
      </div>
    </>
  );
}
