const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genres } = require("../db");
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
    for (let i = 1; i < 8; i++) {
      let pages = await axios.get(url);
      pages.data?.results.forEach((e) => {
        games.push({
          id: e.id,
          name: e.name,
          background_image: e.background_image,
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
// const getvideogames = () => {
//   try {
//     const games = [];
//     let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
//     for (let i = 1; i < 8; i++) {
//       axios.get(url).then((resultado) => {
//         url = resultado.data.next;
//       });
//     }
//     console.log(games)
//     return games;
//   } catch (error) {
//     console.log(error);
//   }
// };
const getdbgames = async () => {
  let dbgamesdata = await Videogame.findAll({
    //busca el juego en la base de datos y o retorna
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  let newdatagame = dbgamesdata.map((e) => {
    return {
      id: e.id,
      name: e.name,
      rating: e.rating,
      background_image: e.background_image,
      genres: e.genres.map((e) => e.name),
      description: e.description,
      released: e.released,
      createdVideoGame: e.createdVideoGame,
      plataforms: e.plataforms,
    };
  });
  return newdatagame;
};

// const getAllInfo = async () => {
//   //Concatena el array que viene tanto por la api como por la db
//   try {
//     let apInfo = await getvideogames();
//     let dbgames = await getdbgames();

//     const allinfo = apInfo.concat(dbgames);

//     return allinfo; //info concat
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllInfo = () => {
  //Concatena el array que viene tanto por la api como por la db
  try {
    let allinfo = Promise.all([getvideogames(), getdbgames()]).then(
      (resultado) => {
       return [...resultado[0], ...resultado[1]];
      }
    );

    return allinfo; //info concat
  } catch (error) {
    console.log(error);
  }
};
router.get("/videogames", async (req, res) => {
  //DEVUELVE LOS JUEGOS SI NO LE PASAN QUERY, SI LE PASAN QUERY LO BUSCA Y DEVUELVE LAS PRIMERAS 15 COINCIDENCIAS
  const { name } = req.query;

  const allgames = await getAllInfo();
  if (name) {
    let gameName = allgames
      .filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
      .slice(0, 16);
    gameName.length
      ? res.status(200).json(gameName)
      : res.status(404).send("no existe el juego");
  } else {
    res.status(200).send(allgames);
  }
});

router.get("/videogame/:id", async function (req, res) {
  const { id } = req.params;
  try {
    if (id.length > 7 && typeof id === "string") {
      let gameCreated = await getdbgames();
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
    res.status(500).send(error.message)
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
      Genres.findOrCreate({ where: { name: el } });
    });

    const allGenres = await Genres.findAll();
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
      description,
      released,
      rating,
      genres,
      platforms,
      createdVideoGame,
    } = req.body;

    if (!name || !description || !platforms || !genres) {
      // le pregunto si estan esos datos, sino debe completarlos // esta validacion tambien esta en el front
      res.status(404).send("Falta data");
    } else {
      let newGame = await Videogame?.create({
        // creo mi video juegos en la base de datos

        name,
        background_image:
          background_image ||
          "https://ceinaseg.com/wp-content/uploads/2021/09/videogames-controller-1920x1080-1.jpg",
        description,
        released,
        rating,
        platforms,
        createdVideoGame,
      });

      genres.forEach(async (e) => {
        console.log(e);
        // recorro por los generos que me pasen y los busco en mi base de datos
        let genderDB = await Genres.findAll({ where: { name: e } });
        await newGame.addGenres(genderDB); // le agrego a mi juego creado el genero seleccionado de la base/
      });

      console.log(newGame);
      res.status(200).json(newGame);
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/videogame/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const gameupid = await Videogame.findOne({
      where: {
        id: id,
      },
    });

    await gameupid.update({
      name: req.body.name,
      rating: req.body.rating,
      released: req.body.released,
      description: req.body.description,
      platforms: req.body.platforms,
    });

    req.body.genres.forEach(async (e) => {
      // recorro por los generos que me pasen y los busco en mi base de datos
      let genderDB = await Genres.findAll({ where: { name: e } });
      await gameupid.setGenres(genderDB);
    });

    res.send(gameupid);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/videogame/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const videogamedelete = await Videogame.findByPk(id);
    if (videogamedelete) {
      await videogamedelete.destroy();
      return res.send("video juego elimindado");
    }
    res.status(404).send("videogame no encontrado");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
