import React, { useState, useEffect } from "react";
import Button from "../components/button/Button.tsx";

const EditExpenseForm = ({ expense, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        amount: '',
        category: '',
        notes: ''
    });

    // Initialize form with existing expense data
    useEffect(() => {
        if (expense) {
            setFormData({
                title: expense.title,
                date: expense.date,
                amount: expense.amount,
                category: expense.category,
                notes: expense.notes
            });
        }
    }, [expense]);

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Save changes and call onSave
    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Expense</h2>
                <form>
                    <div class="formfield">
                        <label>Title:</label>
                        <input
                            type="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class="formfield">
                        <label>Date:</label>
                        <input 
                            type="date" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div class="formfield">
                        <label>Amount:</label>
                        <input 
                            type="number" 
                            name="amount" 
                            value={formData.amount} 
                            onChange={handleChange} 
                            required
                        />
                    </div>        
                    <div class="formfield">
                    <label>Category:</label>
                        <select 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange}>
                            <option value="Needs">Needs</option>
                            <option value="Wants">Wants</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div class="formfield">
                        <label>Notes:</label>
                        <textarea 
                            name="notes" 
                            value={formData.notes} 
                            onChange={handleChange} 
                        ></textarea>
                    </div>
                </form>
                 <div class="btn">
                    <Button
                        text="Save"
                        onClick={handleSave}
                        color='#3e8e41'
                    />
                    <Button
                        text="Cancel"
                        onClick={onCancel}
                        color='#FF4D4D'
                    />
                </div>
            </div>
        </div>
    );
};

export default EditExpenseForm;