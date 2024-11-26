import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import InfoButton from './button/InfoButton.tsx';


const ExpenseList = ({ expenses }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedCategory, setSelectedCategory] = useState("All"); // Add state for selected category

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
        if (event.target.value === currentYear) {
            setSelectedMonth(new Date().getMonth());
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Group expenses by date, filter by month, year, and category
    const groupedExpenses = expenses.reduce((acc, expense) => {
        const date = expense.date; 
        const expenseDate = new Date(date);
        const expenseMonth = expenseDate.getMonth();
        const expenseYear = expenseDate.getFullYear();

        // Filter by month, year, and category
        if (
            expenseMonth === parseInt(selectedMonth) &&
            expenseYear === parseInt(selectedYear) &&
            (selectedCategory === "All" || expense.category === selectedCategory)
        ) {
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

    // Calculate total expenses for the selected month, year, and category
    const totalExpenses = groupedArray.reduce((total, group) => {
        return total + group.expenses.reduce((sum, expense) => {
            const amount = Number(expense.amount); // Convert to number
            return sum + (isNaN(amount) ? 0 : amount); // Only add valid numbers
        }, 0);
    }, 0);

    return (
        <div className="expense-list">
            <h2>All Expenses!</h2>

            <div className='list-select'>
                <label htmlFor="month-select">Select Month: </label>
                <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
                    {months.map((month, index) => (
                        <option 
                            key={index} 
                            value={index} 
                            disabled={selectedYear === currentYear && index > new Date().getMonth()}
                        >
                            {month}
                        </option>
                    ))}
                </select>

                <label htmlFor="year-select">Select Year: </label>
                <select id="year-select" value={selectedYear} onChange={handleYearChange}>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <label htmlFor="category-select">Select Category: </label>
                <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="All">All</option>
                    <option value="Needs">Needs</option>
                    <option value="Wants">Wants</option>
                    <option value="Others">Others</option>
                </select>
            </div>

            {groupedArray.length > 0 && (
                <h3 className='title'>
                    Total Expenses for {months[selectedMonth]} {selectedYear} ({selectedCategory}): RM{totalExpenses.toFixed(2)}
                </h3>
            )}

            {groupedArray.length === 0 ? (
                <p>No data available for the selected month, year, and category.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Category<InfoButton/></th>
                            <th>Amount (RM)</th>
                            <th>Notes</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedArray.map(group => (
                            group.expenses.map(expense => (
                                <tr key={expense.id}>
                                    <td>{formatDate(group.date)}</td>
                                    <td>{expense.title}</td>
                                    <td>{expense.category}</td>
                                    <td>{Number(expense.amount).toFixed(2)}</td>
                                    <td>{expense.notes}</td>
                                    <td>
                                        <Link to={`/expenses/${expense.id}`}>View Details</Link>
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            )}


        </div>
    );
}

export default ExpenseList;
