type Props = {
    label: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
};

export const Input = ({
    label,
    value,
    placeholder,
    onChange,
}: Props) => {
    return (
        <label>
            <span>{label}</span>

            <input
                className="rounded border px-3 py-2"
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)} />
        </label>
    );
};