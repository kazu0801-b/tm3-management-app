type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => {
  return (
    <p className="rounded border border-red-300 bg-red-50 p-3 text-red-700">
      {message}
    </p>
  );
};
