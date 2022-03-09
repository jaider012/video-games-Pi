import { types } from "../types/types";
import axios from "axios";

/***TODA LA DATA  Y  GENEROS */
export function getVideoGames() {
  // Aqui sucede la conexion entre front y back
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/videogames`);
    return dispatch({
      type: types.alldata,
      payload: json.data,
    });
  };
}

export function getVideoGameByName(name) {
  return async function (dispatch) {
    try {
      let game = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );

      return dispatch({
        type: types.byName,
        payload: game.data, //
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getgamebyid(id) {
  return async function (dispatch) {
    try {
      let gameid = await axios.get(`http://localhost:3001/videogame/${id}`);
      console.log("QUE INFO TRAE DE DETAIL :", gameid.data);
      return dispatch({
        type: types.byId,
        payload: gameid.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getgenres() {
  return async function (dispatch) {
    try {
      let allgenres = await axios.get(`http://localhost:3001/genres`);
      return dispatch({
        type: types.genres,
        payload: allgenres.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//****

//**** FILTROS

export function filterVideoGamesByGenres(payload) {
  return {
    type: types.filtergenres,
    payload,
  };
}

export function filtergameDB(payload) {
  return {
    type: types.filterdbgames,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: types.filterbyname,
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: types.filterbyrating,
    payload,
  };
}
export function resetDetailPage() {
  //reset para la pagina de detail
  return {
    type: types.resetgame,
  };
}
//****
//** CREACION DEL JUEGO
export function createGame(payload) {
  return async function (dispatch) {
    const info = await axios.post(`http://localhost:3001/videogame`, payload);
    console.log("QUE INFO TRAE DE POST:", info.data);
    return dispatch({
      type: types.creaVideogame,
      payload: info.data,
    });
  };
}
