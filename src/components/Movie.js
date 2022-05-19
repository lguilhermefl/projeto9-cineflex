import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Status from './Status';
import API_URL from '../index';

function ShowTime({ time }) {
    return (
        <Time>{time}</Time>
    );
}

function Session({ day, date, showtimes }) {
    return (
        <Showtime>
            <Day>{day} - {date}</Day>
            <Sessions>
                {showtimes.map(showtime => <ShowTime key={showtime.id} time={showtime.name} />)}
            </Sessions>
        </Showtime>
    );
}

export default function Movie() {

    const { idMovie } = useParams();
    const [sessions, setSessions] = useState(false);

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
                { !sessions ? "Carregando..." :
                    sessions.days.map(session => 
                    <Session key={session.id} day={session.weekday}
                        date={session.date} showtimes={session.showtimes} />)
                }
            </SessionsList>
        </>
    );
}

const SessionsList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 25px;
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
`