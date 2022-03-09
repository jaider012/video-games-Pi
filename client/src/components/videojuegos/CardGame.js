import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../css/cardgame.css";

const CardGame = ({ id, name, background_image, genres, rating }) => {
  return (
    <div className="card">
      <Link to={`/home/${id}`} className="Link">
        <div className="top">
          <div className="cover">
            <img src={background_image} alt={name} />
          </div>
          <div className="general-info">
            <h2 className="card-title">{name}</h2>
            <div>
              <span>Genero</span>
              <ul>
                {genres && genres.map((e) => {
                  return (
                    <Fragment key={e}>
                      <li>{e}</li>
                    </Fragment>
                  );
                })}
              </ul>
            </div>
            <div>
              <span>Rating </span>
              <span>{rating}</span>
            </div>
          </div>
        </div>
        <div className="cover1">
          <img src={background_image} alt={name} />
        </div>
      </Link>
    </div>
  );
};

export default CardGame;
