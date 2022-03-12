import React from "react";
import { Link } from "react-router-dom";
import "../css/inicio.css";
import linkedinLOGO from "../img/linkedinLOGO.png";
import twitter from "../img/twitter.png";
export const Inicio = () => {
  return (
    <div className="fondo">
      <div className="flex">
        <div className="alig">
          <h1 className="frase">VIDEOGAMES</h1>
          <h1 className="frase" data-testid="message">
            La esperanza es lo que nos hace fuertes,
            <br /> Es la razón del por qué estamos aquí,
            <br /> Es por lo que peleamos cuando todo lo demás está perdido
          </h1>
        </div>
        <div className="end">
          <Link to="/home">
            <button className="boton">S T A R T</button>
          </Link>
        </div>

        <div className="made">
          <div className="hecho"> Jaider panqueva 👾 </div>

          <div>
            <a
              className="icon"
              href="https://www.linkedin.com/in/jaider-andres-panqueva-447787211/"
              target="_blank"
              rel="noreferrer"
            >
              <img className="icon" src={linkedinLOGO} alt="linkedin"></img>
            </a>
          </div>
          <div>
            <a
              className="icon"
              href="https://twitter.com/jaider_panqueva"
              target="_blank"
              rel="noreferrer"
            >
              <img className="icon" src={twitter} alt="linkedin"></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
