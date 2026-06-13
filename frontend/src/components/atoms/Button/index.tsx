type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export const Button = ({
  children,
  variant = "primary",
}: Props) => {
  const baseClass =
    "rounded px-4 py-2 font-bold";

  const variantClass =
    variant === "primary"
      ? "bg-blue-600 text-white"
      : "bg-gray-200 text-black";

  return (
    <button
      className={`${baseClass} ${variantClass}`}
    >
      {children}
    </button>
  );
};