const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genero } = require("../db");
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getvideogames = async () => {
  try {
    const games = [];
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    for (let i = 1; i < 6; i++) {
      let pages = await axios.get(url);
      pages.data?.results.forEach((e) => {
        games.push({
          id: e.id,
          name: e.name,
          background_image: e.background_image, // en lo de otros dice brack_ground
          rating: e.rating,
          genres: e.genres.map((gender) => gender.name),
          platforms: e.platforms.map((platform) => platform.platform.name),
        });
      });
      url = pages.data.next;
    }
    return games;
  } catch (error) {
    console.log(error);
  }
};
const getdbgames = async () => {
  try {
    let dbgamesdata = await Videogame.findAll({
      include: {
        model: Genero,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const dbgames = dbgamesdata.map((e) => {
      return {
        id: e.id,
        name: e.name,
        rating: e.rating,
        backgroundimage: e.backgroundimage,
        genres: e.genres.map((e) => e.name),
        description: e.description,
        released: e.released,
        plataforms: e.plataforms.map((p) => p.plataforms.name),
      };
    });
    return dbgames;
  } catch (error) {
    console.log(error);
  }
};

const getAllInfo = async () => {
  try {
    let apInfo = await getvideogames();
    let dbgames = await getdbgames();

    const allinfo = apInfo.concat(dbgames);
    return allinfo;
  } catch (error) {
    console.log(error);
  }
};

router.get("/videogames", async (req, res) => {
  //DEVUELVE LOS JUEGOS SI NO LE PASAN QUERY, SI LE PASAN QUERY LO BUSCA Y DEVUELVE LAS PRIMERAS 15 COINCIDENCIAS
  const { name } = req.query;
  try {
    const allgames = await getAllInfo();
    if (name) {
      let gameName = allgames.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      gameName.lexngth
        ? res.status(200).json(gameName)
        : res.status(404).send("no esta el juego");
    } else {
      console.log("pasa por aqui");
      res.status(200).json(allgames);
    }
  } catch (error) {
    console.log(error);
  }
  // const dbgames = await getdbgames();
  // res.send(dbgames);
});

router.get("/videogame/:id", async function (req, res) {
  const { id } = req.params;
  try {
    if (id.length > 7 && typeof id === "string") {
      let gameCreated = await getGameDataBase();
      let gameID = await gameCreated.filter((gi) => gi.id === id);

      return res.status(200).json(gameID);
    } else {
      // COMO PROMESA
      // axios.get(`https://api.rawg.io/api/games/3498?key=232664f6fc6541e2a787c5d2528caac5`).then((z) =>{
      //     res.send(z.data)
      // }).catch(e => next(e))
      const gameById = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const oneGame = {
        id: gameById.data.id,
        name: gameById.data.name,
        background_image: gameById.data.background_image,
        rating: gameById.data.rating,
        released: gameById.data.released, //
        description: gameById.data.description,
        genres: gameById.data.genres.map((g) => g.name),
        platforms: gameById.data.parent_platforms.map((p) => p.platform.name),
      };
      return res.status(200).json(oneGame);
    }
  } catch (error) {
    console.log("monda");
  }
});

router.get("/genres", async function (req, res) {
  try {
    const genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );

    const genres = genresApi.data.results.map((g) => g.name);
    //bulkcreate >>> squelize
    genres.forEach((el) => {
      Genero.findOrCreate({ where: { name: el } });
    });

    const allGenres = await Genero.findAll();
    console.log(allGenres);
    res.send(allGenres);
  } catch (error) {
    console.log(error);
  }
});

router.post("/videogame", async function (req, res) {
  try {
    let {
      name,
      background_image,
      descripcion,
      released,
      rating,
      genres,
      plataforma,
      createdVideoGame,
    } = req.body;
 
    if (!name || !descripcion || !plataforma||!genres) {
      // le pregunto si estan esos datos, sino debe completarlos
      res.status(404).send("Falta data");
    } else {
      
      let newGame = await Videogame.create({
        // creo mi video juegos en la base de datos

        name,
        background_image:
          background_image ||
          "https://ceinaseg.com/wp-content/uploads/2021/09/videogames-controller-1920x1080-1.jpg",
        descripcion,
        released,
        rating,
        plataforma,
        createdVideoGame,
      });
 
      genres.forEach(async (e) => {
        //recorro por los generos que me pasen y los busco en mi base de datos

        let genderDB = await Genero.findAll({ where: { name: e.name } });
        newGame.addGenre(genderDB); // le agrego a mi juego creado el genero seleccionado de la base
      });
      res.status(200).json({ message: "Juego creado ", newGame });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
