import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

import Status from "./Shared/Status"
import API_URL from './Data/data';


function Poster({ posterURL, title }) {
    return (
        <img src={posterURL} alt={title} />
    );
}

export default function Home() {

    const [movies, setMovies] = useState();

    useEffect(() => {
        const promise = axios.get(`${API_URL}/movies`);

        promise.then(response => {
            setMovies(response.data);
        });
    }, []);

    return (
        <>
            <Status>
                <span>Selecione o filme</span>
            </Status>
            <MovieList>
                { movies?.map(item => 
                    <Link key={item.id} to={`/sessoes/${item.id}`}>
                        <Poster key={item.id} posterURL={item.posterURL}
                            title={item.title} />
                    </Link>)}
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
            cursor: pointer;
        }
`

