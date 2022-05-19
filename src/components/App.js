import { BrowserRouter, Routes, Route } from "react-router-dom";

import Top from "./Top/Top"
import Status from "./Status/Status"
import Home from "./Home/Home"
import Movie from "./Movie"
import Session from "./Session"
import OrderSuccess from "./OrderSuccess"
import Footer from "./Footer/Footer";

export default function App() {
    return (
        <>
            <Top />
            <Status>
                <span>Selecione o filme</span>
            </Status>
            <Home />
        </>
    );
}