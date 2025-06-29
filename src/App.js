import {useEffect} from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';
import { useState} from "react";

// const API_URL = 'http://www.omdbapi.com/?apikey=1117b6ac';
const API_URL = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        const response = await fetch (`${API_URL}&s=${title}`);
        const data = await response.json();

        // console.log(data.Search);
        setMovies(data.Search);
    }

    useEffect (() => {
        searchMovies('Spiderman')
    }, []);
    return (
        <div className="app">
            <h1>Filmoriel</h1>

            <div className="search">
                <input placeholder="Search any movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ?(
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )}

        </div>
    );
}

export default App;