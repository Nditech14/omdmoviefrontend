import React from "react";

const MovieCard = ({ movie }) => {
   
  return (
    <div className="movie">
      <div>
        <p>{movie.year}</p>
      </div>

      <div>
        <img
          src={movie.poster }
          alt={movie.title}
        />
      </div>

      <div>
        <span>{movie.type}</span>
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;

