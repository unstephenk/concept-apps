import {useCounter} from "../context/CounterContext"

function CounterControls() {
    const { increment, decrement, reset } = useCounter();

    return (
        <>
            <button type="button" onClick={increment}>Add</button>
            <button type="button" onClick={decrement}>Remove</button>
            <button type="button" onClick={reset}>Reset Counter</button>
        </>
    )
}

export default CounterControls;