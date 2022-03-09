import "../css/home.css";
import mariogirando from "../img/mariogirando.webp";
import NavBar from "./NavBar";
import CardGame from "./videojuegos/CardGame";

import { useDispatch, useSelector } from "react-redux";
import {
  filterVideoGamesByGenres,
  filtergameDB,
  getgenres,
  getVideoGames,
  orderByName,
  orderByRating,
} from "../action/action";
import { useEffect, useState } from "react";

import Paginado from "./videojuegos/Paginado";
const Home = () => {
  const dispatch = useDispatch();
  // ***aqui traigo mis  datos del estado global***
  const { videogames, genres } = useSelector((store) => store);

  useEffect(() => {
    // trae todos los juegos
    dispatch(getVideoGames());
  }, [dispatch]);

  useEffect(() => {
    // esto trae los generos
    dispatch(getgenres());
  }, [dispatch]);

  // ****PAGINADO***
  const [Orden,setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //declaro un estado local y la pag actual, marcando el estado con el que va arrancar.
  const [videoGamesPerPage,setvideoGamesPerPage] = useState(16); //declaro otro estado local donde tengo la cantidad de juegos por pagina
  const inOfLastGame = currentPage * videoGamesPerPage; //seteo el indice del ultimo juego y le digo sobre la pag actual multiplicame la cantidad de juegos por pagina
  const inOfFristGame = inOfLastGame - videoGamesPerPage; // necesito setear el indice de mi primer juego en cad apag, ya que a medida q cambie la pag el primer juego cambia
  const currentVideoGames = videogames.slice(inOfFristGame, inOfLastGame);

  const paging = (pages) => {
    setCurrentPage(pages);
  };

  //**** */

  //****  HANDLES***

  const HandlesortName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  };

  const HandlesortRating = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  };
  const HandlesortGenero = (e) => {
    e.preventDefault();
    dispatch(filterVideoGamesByGenres(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  };
  const handleFilterVideoGamesDB = (e) => {
    e.preventDefault();
    dispatch(filtergameDB(e.target.value));
  };

  //**** */
  return (
    <div>
      <NavBar />

      <div className="contenedor-filtro">
        <Paginado
          videoGamesPerPage={videoGamesPerPage}
          allGames={videogames.length}
          paging={paging}
        />
      </div>

      <div className="contenedor-filtro">
        <div>
          <button
            className="button-reset"
            onClick={() => {
              window.location.reload();
            }}
          >
            perron
          </button>
        </div>
        <div>
          <select className="Selector" onChange={(e) => HandlesortName(e)}>
            <option className="options" value="az">
              DE A-Z
            </option>
            <option className="options" value="za">
              DE Z-A
            </option>
          </select>
        </div>
        <div>
          <select className="Selector" onChange={(e) => HandlesortRating(e)}>
            <option className="options">Rating</option>
            <option className="options" value="Max-Min">
              Max a Min
            </option>
            <option className="options" value="Min-Max">
              Min a Max
            </option>
          </select>
        </div>
        <div>
          <select
            className="Selector"
            onChange={(e) => handleFilterVideoGamesDB(e)}
          >
            <option className="fondo-selector" value="All">
              Todos
            </option>
            <option className="fondo-selector" value="db">
              Juegos Creados
            </option>
            <option className="fondo-selector" value="api">
              Existentes
            </option>
          </select>
        </div>
        <div>
          <select className="Selector" onChange={(e) => HandlesortGenero(e)}>
            <option className="options" value="todos">
              Generos
            </option>
            {genres.map((e) => {
              return (
                <option key={e.id} className="options" value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="container">
        {currentVideoGames.length > 0 ? (
          currentVideoGames.map((e) => {
            return (
              <CardGame
                key={e.id}
                id={e.id}
                name={e.name}
                background_image={e.background_image}
                genres={e.genres}
                rating={e.rating}
              />
            );
          })
        ) : (
          <img src={mariogirando} alt="mario" className="mario" />
        )}
      </div>
      <div className="contenedor-filtro">
        <Paginado
          videoGamesPerPage={videoGamesPerPage}
          allGames={videogames.length}
          paging={paging}
        />
      </div>
    </div>
  );
};

export default Home;
