import { types } from "../types/types";

const inicialState = {
  videogames: [],
  Copiavideogames: [],
  genres: [],
  gamedetail: [],
};  

export const reducer = (state = inicialState, action) => {
  ///****MANEJO DEL ESTADO */
  switch (action.type) {
    case types.alldata:
      return {
        ...state,
        videogames: action.payload,
        Copiavideogames: action.payload,
      };
    case types.byName:
      return {
        ...state,
        Copiavideogames: action.payload,
      };
    case types.byId:
      return {
        ...state,
        gamedetail: action.payload,
      };

    case types.genres:
      return {
        ...state,
        genres: action.payload,
      };

    case types.creaVideogame:
      return {
        ...state,
      };

    case types.deletevideogame:
      return {
        ...state,
      };
    case types.updatevideogame:
      return {
        ...state,
      };
    //*****FILTROS
    case types.filterbyname:
      const orderGames =
        action.payload === "az"
          ? state.Copiavideogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.Copiavideogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        Copiavideogames: orderGames,
      };

    case types.filtergenres:
      let Copiaestado = state.videogames;
      let filterGenre = Copiaestado.filter((el) =>
        el.genres.includes(action.payload)
      );
      return {
        ...state,
        Copiavideogames: action.payload === "todos" ? Copiaestado : filterGenre,
      };

    case types.filterdbgames:
      const totalGames = state.videogames;
      const filterCreatedGames =
        action.payload === "db"
          ? totalGames.filter((ele) => ele.createdVideoGame === true)
          : totalGames.filter((ele) => ele.createdVideoGame !== true);
      return {
        ...state,
        Copiavideogames:
          action.payload === "All" ? totalGames : filterCreatedGames,
      };

    case types.filterbyrating:
      const orderGamesRating =
        action.payload === "Min-Max"
          ? state.Copiavideogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.Copiavideogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        Copiavideogames: orderGamesRating,
      };

    default:
      return state;
  }
};
