import { useState, useEffect } from 'react';
import axios from 'axios';

import "./style.css"

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
        <div className="movie-list">
            { movies.map(item => <img key={item.id} src={item.posterURL} alt={item.title} />) }
        </div>
    );
}