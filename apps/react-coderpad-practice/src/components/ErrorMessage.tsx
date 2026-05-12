type ErrorMessageProps = {
    message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <>
            <p>{message}</p>
        </>
    )
}

export default ErrorMessage;