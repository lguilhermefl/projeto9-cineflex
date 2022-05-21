import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Status from './Status';
import Footer from './Footer';
import API_URL from './Data/data';

function ShowTime({ idSession, time }) {
    return (
        <Link to={`/assentos/${idSession}`} >
            <Time>{time}</Time>
        </Link>
    );
}

function Session({ day, date, showtimes }) {
    return (
        <Showtime>
            <Day>{day} - {date}</Day>
            <Sessions>
                {showtimes.map(showtime => <ShowTime key={showtime.id} time={showtime.name}
                    idSession={showtime.id} />)}
            </Sessions>
        </Showtime>
    );
}

export default function Movie() {

    const { idMovie } = useParams();
    const [sessions, setSessions] = useState();

    useEffect(() => {
        const promise = axios.get(`${API_URL}/movies/${idMovie}/showtimes`);

        promise.then(response => {
            setSessions(response.data);
        });
    }, []);

    return (
        <>
            <Status>
                <span>Selecione o horário</span>
            </Status>
            <SessionsList>
                {!sessions ? "Carregando..." :
                    sessions.days.map(session =>
                        <Session key={session.id} day={session.weekday}
                            date={session.date} showtimes={session.showtimes} />)
                }
            </SessionsList>
            <Footer>
                <MovieInfo>
                    <Poster src={sessions?.posterURL} />
                    <SessionDetails>
                        <span>{sessions?.title}</span>
                    </SessionDetails>
                </MovieInfo>
            </Footer>
        </>
    );
}

const SessionsList = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 25px;
    width: 100%;
    margin-bottom: 115px;
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
    font-size: 24px;
`

const Showtime = styled.div`
    display: flex;
    flex-direction: column;
`

const Day = styled.span`
    font-size: 20px;
`

const Sessions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 25px 0;
`

const Time = styled.div`
    padding: 15px;
    border-radius: 3px;
    background-color: #E8833A;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
`