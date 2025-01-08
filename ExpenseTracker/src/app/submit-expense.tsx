"use client";
import { useState } from "react";
import { Category } from "@/db/schema/categories";
import { twMerge } from "tailwind-merge";
import { createExpense } from "@/actions/createExpense";
import { v4 as uuidv4 } from "uuid";

export default function SubmitExpense({
  categories,
}: {
  categories: Category[];
}) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [content, setContent] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (content.length < 3) {
      setError("Description should contain at least 3 characters");
      setIsLoading(false);
      return;
    }
    if (!amount || !content) {
      setError("Amount and Description must be filled out");
      setIsLoading(false);
      return;
    }
    try {
      await createExpense({
        id: uuidv4(),
        description: content,
        amount,
        date,
        categoryId: selectedCategory,
      });
      setContent("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
      setSelectedCategory(categories[0].id);
    } catch (e) {
      setError("Failed to add expense");
    }
    setIsLoading(false);
  };
  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <input
            type="date"
            name="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <select
            value={selectedCategory}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
          />
        </div>
        <div>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={twMerge(
            "w-full bg-indigo-500 dark:bg-indigo-700 text-white p-3 rounded-xl shadow hover:bg-indigo-700 dark:hover:bg-indigo-800",
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          {isLoading ? "Adding..." : "Add Expense"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
