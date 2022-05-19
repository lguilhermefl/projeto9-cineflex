import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Status from "./Status"

const API_URL = "https://mock-api.driven.com.br/api/v5/cineflex";

export default function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const requisicao = axios.get(`${API_URL}/movies`);

        requisicao.then(response => {
            setMovies(response.data);
        });
    }, []);

    return (
        <>
            <Status>
                <span>Selecione o filme</span>
            </Status>
            <MovieList>
                {movies.map(item => <img key={item.id} src={item.posterURL} alt={item.title} />)}
            </MovieList>

        </>

    );
}

const MovieList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 0 25px;
    justify-content: center;
    margin-bottom: 25px;

        img {
            width: 145px;
            height: 209px;
            padding: 8px;
            box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
        }
`

