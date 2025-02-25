export function Input({ value, onChange, placeholder }) {
    return <input className="border p-2 w-full" value={value} onChange={onChange} placeholder={placeholder} />;
}