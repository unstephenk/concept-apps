import { createContext, useContext, useState, type ReactNode } from "react";

type CounterContextValue = {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
};

type CounterProviderProps = {
    children: ReactNode;
}

const CounterContext = createContext<CounterContextValue | undefined>(undefined)

export function CounterProvider({ children }: CounterProviderProps) {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount((currentCount) => currentCount + 1)
    }

    const decrement = () => {
        setCount((currentCount) => currentCount - 1)
    }

    const reset = () => {
        setCount(0)
    }


    return (
        <CounterContext.Provider
            value={{
                count,
                increment,
                decrement,
                reset,
            }}>
            {children}
        </CounterContext.Provider>
    )
}

export function useCounter() {
    const context = useContext(CounterContext);

    if (!context) {
        throw new Error("useCounter must be used within a CounterProvider")
    }

    return context;
}