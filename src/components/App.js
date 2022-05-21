import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import Header from "./Header"
import Home from "./Home"
import Movie from "./Movie"
import Seats from "./Seats"
import OrderSuccess from "./OrderSuccess"

export default function App() {

    const [orderInfo, setOrderInfo] = useState();

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sessoes/:idMovie" element={<Movie />} />
                    <Route path="/assentos/:idSession" element={
                        <Seats setOrderInfo={setOrderInfo} />
                    } />
                    <Route path="/sucesso" element={<OrderSuccess orderInfo={orderInfo} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}