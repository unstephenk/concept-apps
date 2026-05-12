
type EmptyStateProps = {
    message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
    return (
        <p>{message}</p>
    )
}

export default EmptyState;