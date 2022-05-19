import "./style.css"

export default function Status({ children }) {
    return (
        <div className="status">
            { children }
        </div>
    );
}