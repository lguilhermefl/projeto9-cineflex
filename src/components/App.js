import { BrowserRouter, Routes, Route } from "react-router-dom";

import Top from "./Top"
import Home from "./Home"
import Movie from "./Movie"
import Session from "./Session"
import OrderSuccess from "./OrderSuccess"
import Footer from "./Footer";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Top />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sessoes/:idMovie" element={<Movie />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}