import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Status from "./Status";

export default function OrderSuccess({ orderInfo }) {
    return (
        <>
            <Status>
                <Message>Pedido feito com sucesso!</Message>
            </Status>
            <OrderDetails>
                <InfoSection>
                    <span>Filme e sessão</span>
                    <span>{orderInfo.movie}</span>
                    <span>{orderInfo.day} {orderInfo.session}</span>
                </InfoSection>
                <InfoSection>
                    <span>Ingressos</span>
                    {orderInfo.ids.map((seat, index) => <span key={index}>Assento {seat}</span>)}
                </InfoSection>
                <InfoSection>
                    <span>Comprador</span>
                    <span>Nome: {orderInfo.name}</span>
                    <span>CPF: {orderInfo.cpf}</span>
                </InfoSection>
                <Container>
                    <Link to="/">
                        <button>Voltar pra Home</button>
                    </Link>
                </Container>
            </OrderDetails>
        </>
    );
}

const Message = styled.span`
    color: #247A6B;
    font-weight: 700;
    max-width: 250px;
    text-align: center;
`

const OrderDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 25px;
    margin: 20px 0 25px;
`

const InfoSection = styled.div`
    font-size: 22px;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 40px;

    span {
        margin-bottom: 5px;
    }

    span:nth-child(1) {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 40px;

    button {
        font-size: 18px;
        width: 225px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #fff;
        background: #E8833A;
        border-radius: 3px;
        border: none;
    }
`