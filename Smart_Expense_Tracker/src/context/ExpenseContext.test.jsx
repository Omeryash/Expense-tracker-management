import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { ExpenseProvider, useExpenses } from "./ExpenseContext";

describe("ExpenseContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add a new expense", () => {
    const { result } = renderHook(() => useExpenses(), {
      wrapper: ExpenseProvider,
    });

    const initialLength = result.current.expenses.length;

    act(() => {
      result.current.addExpense({
        title: "Pizza",
        amount: "500",
        category: "Food",
      });
    });

    expect(result.current.expenses.length).toBe(initialLength + 1);

    expect(result.current.expenses[0].title).toBe("Pizza");

    expect(result.current.expenses[0].amount).toBe(500);

    expect(result.current.expenses[0].type).toBe("expense");

    expect(result.current.expenses[0].status).toBe("completed");
  });

  it("should update an existing expense", () => {
    const { result } = renderHook(() => useExpenses(), {
      wrapper: ExpenseProvider,
    });

    const expenseId = result.current.expenses[0].id;

    act(() => {
      result.current.updateExpense(expenseId, {
        title: "Updated Grocery",
        amount: "999",
      });
    });

    const updatedExpense = result.current.expenses.find(
      (expense) => expense.id === expenseId,
    );

    expect(updatedExpense.title).toBe("Updated Grocery");

    expect(updatedExpense.amount).toBe(999);
  });

  it("should delete an existing expense", () => {
    const { result } = renderHook(() => useExpenses(), {
      wrapper: ExpenseProvider,
    });

    const expenseId = result.current.expenses[0].id;

    const initialLength = result.current.expenses.length;

    act(() => {
      result.current.deleteExpense(expenseId);
    });

    expect(result.current.expenses.length).toBe(initialLength - 1);

    expect(
      result.current.expenses.some((expense) => expense.id === expenseId),
    ).toBe(false);
  });

  it("should save expenses to localStorage", () => {
    const { result } = renderHook(() => useExpenses(), {
      wrapper: ExpenseProvider,
    });

    act(() => {
      result.current.addExpense({
        title: "Pizza",
        amount: "500",
        category: "Food",
      });
    });

    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));

    expect(savedExpenses).not.toBeNull();

    expect(savedExpenses[0].title).toBe("Pizza");

    expect(savedExpenses[0].amount).toBe(500);
  });
});
