import {useCounter} from "../context/CounterContext"

export function CounterControls() {
    const { increment, decrement, reset } = useCounter();

    return (
        <>
            <button onClick={increment}>Add</button>
            <button onClick={decrement}>Remove</button>
            <button onClick={reset}>Reset Counter</button>
        </>
    )
}