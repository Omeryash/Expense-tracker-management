import { createContext, useContext, useState, useEffect } from "react";

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within ExpenseProvider");
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Grocery Shopping",
            amount: 245,
            category: "Food",
            date: "2024-01-15",
            icon: "🛒",
            type: "expense",
            status: "completed",
          },
          {
            id: 2,
            title: "Netflix Subscription",
            amount: 15,
            category: "Entertainment",
            date: "2024-01-14",
            icon: "🎬",
            type: "expense",
            status: "completed",
          },
          {
            id: 3,
            title: "Uber Ride",
            amount: 32,
            category: "Transport",
            date: "2024-01-13",
            icon: "🚗",
            type: "expense",
            status: "completed",
          },
          {
            id: 4,
            title: "Electricity Bill",
            amount: 120,
            category: "Bills",
            date: "2024-01-12",
            icon: "⚡",
            type: "expense",
            status: "completed",
          },
          {
            id: 5,
            title: "Amazon Shopping",
            amount: 89,
            category: "Shopping",
            date: "2024-01-11",
            icon: "📦",
            type: "expense",
            status: "completed",
          },
          {
            id: 6,
            title: "Salary Deposit",
            amount: 5000,
            category: "Salary",
            date: "2024-01-15",
            icon: "💰",
            type: "income",
            status: "completed",
          },
          {
            id: 7,
            title: "Freelance Project",
            amount: 1200,
            category: "Freelance",
            date: "2024-01-12",
            icon: "💻",
            type: "income",
            status: "pending",
          },
          {
            id: 8,
            title: "Investment Return",
            amount: 350,
            category: "Investment",
            date: "2024-01-08",
            icon: "📈",
            type: "income",
            status: "completed",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      type: expense.type || "expense",
      status: "completed",
      amount: parseFloat(expense.amount),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const updateExpense = (id, updatedData) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, ...updatedData, amount: parseFloat(updatedData.amount) }
          : e,
      ),
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, updateExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
