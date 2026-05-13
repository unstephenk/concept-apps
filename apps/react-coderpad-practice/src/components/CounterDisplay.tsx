import { useCounter } from "../context/CounterContext";

function CounterDisplay() {
    const { count } = useCounter();

    return(
        <p>Count: {count}</p>
    )
}

export default CounterDisplay;