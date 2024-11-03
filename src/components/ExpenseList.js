import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const ExpenseList = ({ expenses }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        if (event.target.value == currentYear) {
            setSelectedMonth(new Date().getMonth());
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const groupedExpenses = expenses.reduce((acc, expense) => {
        const date = expense.date; 
        const expenseDate = new Date(date);
        const expenseMonth = expenseDate.getMonth();
        const expenseYear = expenseDate.getFullYear();

        if (expenseMonth === parseInt(selectedMonth) && expenseYear === parseInt(selectedYear)) {
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(expense);
        }

        return acc;
    }, {});

    const groupedArray = Object.keys(groupedExpenses).map(date => ({
        date,
        expenses: groupedExpenses[date]
    }));

    groupedArray.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate total expenses for the selected month and year
    const totalExpenses = groupedArray.reduce((total, group) => {
        return total + group.expenses.reduce((sum, expense) => {
            const amount = Number(expense.amount); // Convert to number
            return sum + (isNaN(amount) ? 0 : amount); // Only add valid numbers
        }, 0);
    }, 0);

    return (
        <div className="expense-list">
            <h2>All Expenses!</h2>

            <label htmlFor="month-select">Select Month:</label>
            <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
                {months.map((month, index) => (
                    <option 
                        key={index} 
                        value={index} 
                        disabled={selectedYear == currentYear && index > new Date().getMonth()}
                    >
                        {month}
                    </option>
                ))}
            </select>

            <label htmlFor="year-select">Select Year:</label>
            <select id="year-select" value={selectedYear} onChange={handleYearChange}>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>

            {/* Only display total expenses if there are grouped expenses */}
            {groupedArray.length > 0 && (
                <h3>Total Expenses for {months[selectedMonth]} {selectedYear}: RM{totalExpenses.toFixed(2)}</h3>
            )}

            {groupedArray.length === 0 ? (
                <p>No data available for the selected month and year.</p>
            ) : (
                groupedArray.map(group => (
                    <div key={group.date}>
                        <h3>{formatDate(group.date)}</h3> 
                        {group.expenses.map(expense => (
                            <div className="expense-preview" key={expense.id}>
                                <Link to={`/expenses/${expense.id}`}>
                                    <h4>{expense.category}</h4>
                                    <p>Amount: RM{expense.amount}</p>
                                    <p>Notes: {expense.notes}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default ExpenseList;
