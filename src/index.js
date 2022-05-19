import ReactDOM from 'react-dom';
import App from "./components/App";
import "./assets/css/reset.css"
import "./assets/css/style.css"

const API_URL = "https://mock-api.driven.com.br/api/v5/cineflex";

export default API_URL;

ReactDOM.render(<App />, document.querySelector('.root'));