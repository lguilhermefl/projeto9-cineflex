import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import Header from "./Header"
import Home from "./Home"
import Sessions from "./Sessions"
import Seats from "./Seats"
import OrderSuccess from "./OrderSuccess"

export default function App() {

    const [orderInfo, setOrderInfo] = useState();
    
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home setOrderInfo={setOrderInfo} />} />
                    <Route path="/sessoes/:idMovie" element={<Sessions />} />
                    <Route path="/assentos/:idSession" element={
                        <Seats setOrderInfo={setOrderInfo} />
                    } />
                    <Route path="/sucesso" element={
                        <OrderSuccess orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}