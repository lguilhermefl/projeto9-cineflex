import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Status from "./Shared/Status";

export default function OrderSuccess({ orderInfo, setOrderInfo }) {
    return (
        <>
            <Status>
                <Message>Pedido feito com sucesso!</Message>
            </Status>
            <OrderDetails>
                <InfoSection>
                    <h3>Filme e sessão</h3>
                    <span>{orderInfo.movie}</span>
                    <span>{orderInfo.day} {orderInfo.session}</span>
                </InfoSection>
                <InfoSection>
                    <h3>Ingresso(s)</h3>
                    {orderInfo.buyers.map((buyer, index) => <span key={index}>Assento {buyer.idAssento}</span>)}
                </InfoSection>
                <InfoSection>
                    <h3>Comprador(es)</h3>
                    {orderInfo.buyers.map((buyer, index) => <BuyersInfo key={index}> 
                        <span>Nome assento {buyer.idAssento}: {buyer.nome}</span>
                        <span>CPF: {buyer.cpf}</span>
                    </BuyersInfo>)}
                </InfoSection>
                <Container>
                    <Link to="/">
                        <button onClick={() => setOrderInfo()}>Voltar pra Home</button>
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
    max-width: 500px;
    margin-bottom: 40px;

    h3 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    span {
        margin-bottom: 5px;
    }
`

const BuyersInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;

    span {
        margin-bottom: 5px;
        word-wrap: break-word;
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