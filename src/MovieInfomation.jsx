import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieInformation = ({ match }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7113/api/Movie/${match.params.id}`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [match.params.id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movieDetails.Title}</h1>
      <p>Year: {movieDetails.Year}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default MovieInformation;