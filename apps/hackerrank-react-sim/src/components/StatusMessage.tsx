type StatusMessageProps = {
  message: string;
};

function StatusMessage({ message }: StatusMessageProps) {
  return <p className="status">{message}</p>;
}

export default StatusMessage;
