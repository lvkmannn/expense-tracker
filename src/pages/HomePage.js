import useFetch from "../hooks/useFetch";
import ExpenseList from "../components/ExpenseList";

const HomePage = () => {
    
    const { data: expenses, isLoading, error } = useFetch('http://localhost:8000/expenses')


    return (
        <div className="HomePage">
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div>}
            { expenses && <ExpenseList expenses={expenses}/>}
        </div>
    )
}

export default HomePage;