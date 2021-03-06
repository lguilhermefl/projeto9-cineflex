import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Status from './Shared/Status';
import Footer from './Shared/Footer';
import API_URL from './Data/data';

function BuyersInfo({ seatNumber, buyersInfo, setBuyersInfo, index }) {

    const formatCPf = e => {
        let cpf = e.target.value.replace(/[^\d]/g, "");
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }    

    const handleInputName = e => {
        const regexName = new RegExp("[a-zA-Z\s]{1,50}");

        if (!regexName.test(e.target.value)) {
            e.target.setCustomValidity('Informe um nome válido! (somente letras, max. 50)')
        }
    }

    const handleInputCpf = e => {
        const regexCpf = new RegExp("(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))");

        if (!regexCpf.test(e.target.value)) {
            e.target.setCustomValidity('Informe um CPF válido!');
        }
    }

    const getName = e => {
        try { e.target.setCustomValidity('') } catch (e) { };
        let newBuyer = [...buyersInfo];
        newBuyer[index].nome = e.target.value;
        setBuyersInfo(newBuyer);
    }

    const getCpf = e => {
        try { e.target.setCustomValidity('') } catch (e) { };
        let newBuyer = [...buyersInfo];
        newBuyer[index].cpf = formatCPf(e);
        setBuyersInfo(newBuyer);
    }

    return (
        <InfoFields>
            <label htmlFor="name">Nome do comprador assento <b>{seatNumber}</b>:</label>
            <input required type="text" placeholder="Digite seu nome..." id="name"
                pattern="[a-zA-Z\s]{1,50}"
                maxLength={50}
                onInvalid={handleInputName}
                value={buyersInfo[index].nome}
                onChange={getName}
            />
            <label htmlFor="cpf">CPF do comprador:</label>
            <input required type="text" placeholder="Digite seu CPF..." id="cpf"
                pattern="(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))"
                onInvalid={handleInputCpf}
                maxLength={14}
                value={buyersInfo[index].cpf}
                onChange={getCpf}
            />
        </InfoFields>
    );
}

function Seat({ number, isAvailable, chosenSeatsIds, setChosenSeatsIds, id,
    seatsNumbers, setSeatsNumbers, buyersInfo, setBuyersInfo }) {

    const available = { bgColor: "#C3CFD9", borderColor: "#808F9D" };
    const unavailable = { bgColor: "#FBE192", borderColor: "#F7C52B" };
    const selected = { bgColor: "#8DD7CF", borderColor: "#45BDB0" };

    const [seatState, setSeatState] = useState({ ...available });

    const seatSelected = () => {
        setSeatState({ ...selected });
        setChosenSeatsIds([...chosenSeatsIds, id]);
        setSeatsNumbers([...seatsNumbers, number]);
        setBuyersInfo([...buyersInfo, {idAssento: number, nome: "", cpf: ""}]);
    };

    const seatAvailable = () => {
        if(!window.confirm(`Deseja remover o assento ${number} e apagar os dados preenchidos?`)){
            return;
        }
        setSeatState({ ...available });
        setChosenSeatsIds(chosenSeatsIds.filter(seat => seat !== id));
        setSeatsNumbers(seatsNumbers.filter(seat => seat !== number));
        setBuyersInfo(buyersInfo.filter(buyer => buyer.idAssento !== number));
    };

    const selectSeat = e => {
        if (!isAvailable) {
            alert("Esse assento não está disponível");
        } else {
            seatState.bgColor === available.bgColor ?
                seatSelected() :
                seatAvailable();
        }
    };

    return (
        <SeatNumber
            bgColor={isAvailable ? seatState.bgColor : unavailable.bgColor}
            borderColor={isAvailable ? seatState.borderColor : unavailable.borderColor}
            onClick={selectSeat}
        >{number}</SeatNumber>
    );
}

export default function Seats({ setOrderInfo }) {

    const [seats, setSeats] = useState();
    const [chosenSeatsIds, setChosenSeatsIds] = useState([]);
    const [seatsNumbers, setSeatsNumbers] = useState([]);
    const [buyersInfo, setBuyersInfo] = useState([]);

    const { idSession } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get(`${API_URL}/showtimes/${idSession}/seats`);

        promise.then(response => {
            setSeats(response.data);
        });
    }, []);

    const sendOrder = e => {

        e.preventDefault();

        if (chosenSeatsIds.length === 0) {
            alert("Selecione ao menos um assento!");
            return;
        }

        const body = {
            ids: chosenSeatsIds,
            compradores: buyersInfo
        }

        setOrderInfo({
            movie: seats.movie.title,
            day: seats.day.date,
            session: seats.name,
            buyers: buyersInfo
        });

        axios
            .post(`${API_URL}/seats/book-many`, body)
            .then(() => navigate("/sucesso"));
    };

    return (
        <>
            <Status>
                <span>Selecione o(s) acento(s)</span>
            </Status>
            <SeatsInfo>
                <AllSeats>
                    {seats?.seats.map(
                            seat =>
                                <Seat key={seat.id} number={seat.name} isAvailable={seat.isAvailable}
                                    chosenSeatsIds={chosenSeatsIds} id={seat.id}
                                    setChosenSeatsIds={setChosenSeatsIds} seatsNumbers={seatsNumbers}
                                    setSeatsNumbers={setSeatsNumbers} buyersInfo={buyersInfo}
                                    setBuyersInfo={setBuyersInfo} />
                        )
                    }
                </AllSeats>
                <Caption>
                    <Symbol>
                        <Selected></Selected>
                        <span>Selecionado</span>
                    </Symbol>
                    <Symbol>
                        <Available></Available>
                        <span>Disponível</span>
                    </Symbol>
                    <Symbol>
                        <Unavailable></Unavailable>
                        <span>Indisponível</span>
                    </Symbol>
                </Caption>
                <BuyerInfo onSubmit={sendOrder}>
                    {seatsNumbers.length > 0 ? 
                        seatsNumbers.map(
                            (seatNumber, index) => 
                                <BuyersInfo key={index} seatNumber={seatNumber} buyersInfo={buyersInfo}
                                    setBuyersInfo={setBuyersInfo} index={index}/>) : 
                        null
                    }
                    <Container>
                        <button type="submit">Reservar assento(s)</button>
                    </Container>
                </BuyerInfo>
            </SeatsInfo>
            <Footer>
                <MovieInfo>
                    <Poster src={seats?.movie.posterURL} />
                    <SessionDetails>
                        <span>{seats?.movie.title}</span>
                        <span>{seats?.day.weekday} - {seats?.name}</span>
                    </SessionDetails>
                </MovieInfo>
            </Footer>
        </>
    );

}

const SeatsInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 25px;
    margin-bottom: 115px;
`

const AllSeats = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 7px;
    font-size: 11px;
    max-width: 500px;
`

const Caption = styled.div`
    display: flex;
    justify-content: space-evenly;
    font-size: 13px;
    max-width: 500px;
    margin-top: 15px;
    width: 100%;
`

const Symbol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    div {
        border-radius: 12px;
        box-sizing: border-box;
        width: 26px;
        height: 26px;
    }
`

const BuyerInfo = styled.form`
    margin: 40px 0;
    font-size: 18px;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
`

const InfoFields = styled.div`

    margin-bottom: 20px;

    input {
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        background: #fff;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        margin: 5px 0;
        padding: 18px;
        font-size: 18px
    }

    input::placeholder {
        font-style: italic;
    }

    input:nth-child(2) {
        margin-bottom: 10px;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 500px;
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

const MovieInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0px 10px;
    max-width: 500px;
    width: 100%;
    box-sizing: border-box;
`

const Poster = styled.img`
    width: 64px;
    height: 89px;
    box-sizing: border-box;
    padding: 8px;
    background-color: #fff;
`

const SessionDetails = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 26px;
`

const Selected = styled.div`
    border: 1px solid #1AAE9E;
    background-color: #8DD7CF;
`

const Available = styled.div`
    border: 1px solid #808F9D;
    background-color: #C3CFD9;
`

const Unavailable = styled.div`
    border: 1px solid #F7C52B;
    background-color: #FBE192;
`

const SeatNumber = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    border: 1px solid;
    background-color: ${props => props.bgColor};
    border-color: ${props => props.borderColor};
    border-radius: 12px;
    box-sizing: border-box;
    width: 26px;
    height: 26px;
    cursor: pointer;
`