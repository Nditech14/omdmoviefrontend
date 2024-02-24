import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import "./OMDMovieApp.css";
import axios from "axios";
import MovieInformation from "./MovieInfomation";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://omdmovie.onrender.com/api/Movie/SearchByTitle?title=${searchTerm}`
      );
      setSearchResults(response.data.search);
      setMovies(response.data.search);
      
      saveSearchToHistory(searchTerm);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const saveSearchToHistory = (query) => {
    // Get existing search history from local storage
    const existingHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Add the new query to the history
    const updatedHistory = [query, ...existingHistory.slice(0, 4)];

    // Save the updated history to local storage
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    // Set the search history state
    setSearchHistory(updatedHistory);
  };

  useEffect(() => {
   // Fetch the initial search history from local storage
   const initialHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
   setSearchHistory(initialHistory);
  }, []);

  return (
    <Router>
      <div className="app">
        <h1>OMDMovieApp</h1>

        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchMovies();
              }
            }}
          />
          <button onClick={searchMovies}>Search</button>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                {searchResults !== null && searchResults?.length > 0 ? (
                  <div className="container">
                    {movies &&
                      movies.map((movie) => (
                        <Link key={movie.imdbID} to={`https://omdmovie.onrender.com/api/Movie/${movie.imdbID}`}>
                          <MovieCard movie={movie} />
                        </Link>
                      ))}
                  </div>
                ) : (
                  <div className="empty">
                    <h1>
                      {searchResults !== null
                        ? "No search found"
                        : "No movie found"}
                    </h1>
                  </div>
                )}

                <div>
                  <h2>Search History:</h2>
                  <ul>
                    {searchHistory.map((query, index) => (
                      <li key={index}>{query}</li>
                    ))}
                  </ul>
                </div>
              </div>
            }
          />
          <Route path="https://omdmovie.onrender.com/api/Movie/:id" element={<MovieInformation/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default Movie;