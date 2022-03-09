import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { createGame, getgenres } from "../../action/action";

const NewGame = () => {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);

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

  useEffect(() => {
    // esto trae los generos
    dispatch(getgenres());
  }, [dispatch]);

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
      return alert("Coloca un nombre: debe poseer min 2 carácteres");
    } else if (valor.description.trim() === "") {
      return alert("Descripción requerida");
    } else if (valor.released.trim() === "") {
      return alert("Fecha de lanzamiento requerida");
    } else if (valor.rating.trim() === "") {
      return alert("Coloca un Puntaje del 1 al 5");
    } else if (valor.platforms.length === 0) {
      return alert("Coloca una o más Plataformas");
    } else if (valor.genres.length === 0) {
      return alert("Coloca un o más Generos");
    } else {
      dispatch(createGame(valor));
      alert("Juego Creado");
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
        platforms: valor.platforms.filter((plata) => plata !== e.target.value),
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
        genres: valor.genres.filter((plata) => plata.name !== e.target.value),
      });
    }
  }
  //***** */
  return (
    <div>
      <h1 className="titulo-crear">Crea tu Juego</h1>

      <form className="form" id="form" onSubmit={(e) => HandleSubmit(e)}>
        <div className="container-form">
          <label>Nombre:</label>
          <input
            className="input-formuldivario"
            type="text"
            placeholder="Titulo del juego"
            name="name"
            value={valor.name}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="container-form">
          <label>Descripcion :</label>
          <input
            className="input-formuldivario"
            type="text"
            placeholder="Descripcion del juego"
            name="description"
            value={valor.description}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="container-form">
          <label>Fecha de lazamiento :</label>
          <input
            className="input-formuldivario"
            type="date"
            placeholder="fecha de lanzamiento"
            name="released"
            value={valor.released}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="container-form">
          <label>Rating:</label>
          <input
            className="input-formuldivario"
            type="number"
            placeholder="Descripcion del juego"
            name="rating"
            value={valor.rating}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="container-form">
          <label>Rating:</label>
          <input
            className="input-formuldivario"
            type="text"
            placeholder=" Url de imagen..."
            name="background_image"
            value={valor.background_image}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="container-form">
          <label>plataformas :</label>
          {plataforms.map((e) => (
            <label key={e} className="InputGeneros-Form">
              <input
                className="Box-Check"
                type="checkbox"
                onClick={(e) => handleCheckPlataforms(e)}
                value={e}
                name="platforms"
                key={e}
              />
              {e}
            </label>
          ))}
        </div>
        <div className="container-form">
          <label>Generos :</label>
          {genres.map((e) => (
            <label key={e.name} className="InputGeneros-Form">
              <input
                className="Box-Check"
                type="checkbox"
                onClick={(e) => handleCheckGenres(e)}
                value={e.name}
                name="genres"
                key={e}
              />
              {e.name}
            </label>
          ))}
        </div>
        <div>
          <button className="button-submit" type="submit">
            Crear Juego 🎮
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewGame;
