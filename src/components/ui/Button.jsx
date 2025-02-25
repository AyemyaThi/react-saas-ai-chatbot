export function Button({ onClick, children }) {
    return <button className="bg-blue-500 text-white p-2 rounded" onClick={onClick}>{children}</button>;
}