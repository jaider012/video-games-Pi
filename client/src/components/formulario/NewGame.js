import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  createGame,
  getgamebyid,
  getgenres,
  updatevideogame,
} from "../../action/action";
import "../../css/newgame.css";

const NewGame = () => {
  const dispatch = useDispatch();
  const [validador, setvalidador] = useState("");
  // const navigate = useNavigate();

  let plataforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "GameCube",
    "Game Boy",
    "SNES",
    "NES",
    "Commodore",
    "Atari",
    "Genesis",
    "SEGA",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
    "PS5",
    "PS4",
    "PS3",
    "PS2",
    "PS1",
  ];
  const { id } = useParams();
  const gameupdate = useSelector((state) => state.gamedetail);
  const genres = useSelector((state) => state.genres);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    // esto trae los generos
    dispatch(getgenres());
    id && dispatch(getgamebyid(id));
  }, [dispatch, id]);

  const [valor, setvalor] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    background_image: "",
    platforms: [],
    genres: [],
  });

  //****  HANDLES***
  function HandleSubmit(e) {
    e.preventDefault();
    if (valor.name.trim() === "" || valor.name.length < 2) {
      setvalidador("El nombre: debe poseer min 2 carácteres");
    } else if (valor.description.trim() === "") {
      setvalidador("Descripción requerida");
    } else if (valor.released.trim() === "") {
      setvalidador("Fecha de lanzamiento requerida");
    } else if (
      valor.rating.trim() === "" &&
      (valor.rating < 6 || valor.rating > 0)
    ) {
      setvalidador("El  Puntaje del 1 al 5");
    } else if (valor.platforms.length === 0) {
      setvalidador(" Una o más Plataformas");
    } else if (valor.genres.length === 0) {
      setvalidador(" Un o más Generos");
    } else {
      if (valor.name) {
        if (!id) {
          dispatch(createGame(valor));
          alert("juego creado");
        } else {
          dispatch(updatevideogame(id, valor));
          alert("juego modificado");
        }
      }
      setvalidador("");
      setvalor({
        name: "",
        description: "",
        released: "",
        rating: "",
        background_image: "",
        platforms: [],
        genres: [],
      });

      document.getElementById("form").reset();
    }
  }

  if (id && gameupdate.name && !updated) {
    setvalor({
      ...valor,
      name: gameupdate.name,
      description: gameupdate.description,
      released: gameupdate.released,
      rating: gameupdate.rating,
      plataforms: gameupdate.platforms,
      background_image: gameupdate.background_image,
      genres: gameupdate.genres,
    });
    setUpdated(!updated);
  }
  //*** Handles */
  const HandleChange = (e) => {
    e.preventDefault();
    setvalor({
      ...valor,
      [e.target.name]: e.target.value,
    });
  };

  function handleCheckPlataforms(e) {
    if (e.target.checked) {
      setvalor({
        ...valor,
        platforms: [...valor.platforms, e.target.value],
      });
    } else if (!e.target.checked) {
      setvalor({
        ...valor,
        platforms: valor.platforms.filter((plat) => plat !== e.target.value),
      });
    }
  }
  function handleCheckGenres(e) {
    console.log(e.target.value);
    if (e.target.checked) {
      setvalor({
        ...valor,
        genres: [...valor.genres, e.target.value],
      });
    } else if (!e.target.checked) {
      setvalor({
        ...valor,
        genres: valor.genres.filter((genre) => genre !== e.target.value),
      });
    }
  }

  //***** */
  return (
    <div>
      <div>
        <Link to="/home">
          <button className="button-back1">Volver</button>
        </Link>
      </div>
      {id ? (
        <h1 className="titulo-crear">Actualiza tu juego</h1>
      ) : (
        <h1 className="titulo-crear">Crea tu Juego</h1>
      )}

      {validador && <div className="alerta">{validador}</div>}
      <form className="form" id="form" onSubmit={(e) => HandleSubmit(e)}>
        <div className="container-form">
          <div>Nombre:</div>
          <input
            className="input-formulario"
            type="text"
            placeholder="Titulo del juego"
            name="name"
            value={valor.name}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="container-form">
          <div className="sub-title">Descripcion :</div>
          <input
            className="input-formulario"
            type="text"
            placeholder="Descripcion del juego"
            name="description"
            value={valor.description}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="container-form">
          <div>Fecha de lazamiento :</div>
          <input
            className="input-formulario"
            type="date"
            placeholder="fecha de lanzamiento"
            name="released"
            value={valor.released}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="container-form">
          <div>Rating:</div>
          <input
            className="input-formulario"
            type="number"
            max="5"
            min="1"
            placeholder="Descripcion del juego"
            name="rating"
            value={valor.rating}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="container-form">
          <div>Background:</div>
          <input
            className="input-formulario"
            type="text"
            placeholder=" Url de imagen..."
            name="background_image"
            value={valor.background_image}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="platfoms">
          <label>plataformas :</label>
          <div className="grid-check">
            {plataforms.map((e) => (
              <div key={e} className="Inputplasform-Form">
                <input
                  className="Box-Check"
                  type="checkbox"
                  onClick={(e) => handleCheckPlataforms(e)}
                  value={e}
                  name="platforms"
                  key={e}
                />
                {e}
              </div>
            ))}
          </div>
        </div>
        <div className="ge">
          <label>Generos :</label>
          <div className="grid-check">
            {genres.map((e) => (
              <div key={e.name} className="InputGeneros-Form">
                <input
                  className="Box-Check"
                  type="checkbox"
                  onClick={(e) => handleCheckGenres(e)}
                  value={e.name}
                  name="genres"
                  key={e}
                />
                {e.name}
              </div>
            ))}
          </div>
        </div>
        <div className="button-create">
          <button className="button-submit" type="submit">
            Crear Juego 🎮
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewGame;
