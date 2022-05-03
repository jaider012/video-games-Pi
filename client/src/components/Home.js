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
import Page404 from "./videojuegos/Page404";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // ***aqui traigo mis  datos del estado global***
  const { Copiavideogames, genres} = useSelector((store) => store);

  // ****PAGINADO***

  const [Orden, setOrden] = useState("");

  const [currentPage, setCurrentPage] = useState(1); //declaro un estado local y la pag actual, marcando el estado con el que va arrancar.
  const [videoGamesparPage, setvideoGamesPerPage] = useState(16); //declaro otro estado local donde tengo la cantidad de juegos por pagina
  const inOfLastGame = currentPage * videoGamesparPage; //seteo el indice del ultimo juego y le digo sobre la pag actual multiplicame la cantidad de juegos por pagina
  const inOfFristGame = inOfLastGame - videoGamesparPage; // necesito setear el indice de mi primer juego en cad apag, ya que a medida q cambie la pag el primer juego cambia
  const currentVideoGames = Copiavideogames?.slice(inOfFristGame, inOfLastGame);

  const paging = (pages) => {
    setCurrentPage(pages);
  };

  //**** */

  const getdata = () => {
    dispatch(getVideoGames());
    setLoading(true);
  };
  useEffect(() => {
    // trae todos los juegos
    getdata();
  }, [dispatch]);

  useEffect(() => {
    // esto trae los generos
    dispatch(getgenres());
  }, [dispatch]);

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
    setCurrentPage(1);
  
  };

  //**** */

  return (
    <div>
      <NavBar />

      <div className="contenedor-filtro">
        <Paginado
          videoGamesparPage={videoGamesparPage}
          allGames={Copiavideogames.length}
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
            REFRESCAR
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
        {loading ? (
          currentVideoGames.length > 0 ? (
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
       <img src={mariogirando} alt="mario" className="mario"></img>
            //
          )
        ) : (
          <img src={mariogirando} alt="mario" className="mario" />
        )}
      </div>
      <div className="contenedor-filtro">
        <Paginado
          videoGamesparPage={videoGamesparPage}
          allGames={Copiavideogames.length}
          paging={paging}
        />
      </div>
    </div>
  );
};

export default Home;
