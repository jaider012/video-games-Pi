import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletevideogame,
  getgamebyid,
  updataPokemon,
  updatevideogame,
} from "../../action/action";
import { useEffect } from "react";
import "../../css/gamedetail.css";

export default function Carddetailes() {
  let params = useParams();
  const id = params.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getgamebyid(id));
  }, [dispatch, id]);

  let gamedatalles = useSelector((state) => state.gamedetail);

  const handleDelete = () => {
    dispatch(deletevideogame(id));
    navigate("/home");
  };
  const handleUpdata = () => {
    dispatch(updatevideogame(id));
    navigate(`/updatevideogame/${id}`);
  };
  return gamedatalles.length > 0 ? (
    <div className="Fondo-Detail">
      <div className="container-info">
        <div className="Contenedor-Boton">
          <div>
            <Link to="/home">
              <button className="button-back">Volver</button>
            </Link>
          </div>
          <div>
            {typeof gamedatalles[0].id === "string" && (
              <button onClick={handleUpdata} className="button-back">
                UPDATE
              </button>
            )}
          </div>
          <div>
            {typeof gamedatalles[0].id === "string" && (
              <button onClick={handleDelete} className="button-back">
                DELETE
              </button>
            )}
          </div>
        </div>
        <div className="Conte-Sub">
          <div className="Conte-General">
            <h1 className="Titulo-Detail">{gamedatalles[0].name}</h1>
            <div className="img-center">
              <div>
                <img
                  className="ImagenDetail"
                  src={gamedatalles[0].background_image}
                  alt=""
                />
              </div>
            </div>
            <h4 className="TituloRating">⭐ Rating :</h4>
            <p className="Conte-Rating">{gamedatalles[0].rating}</p>

            <h4 className="TituloFecha">📆 Fecha de Lanzamiento :</h4>
            <p className="Conte-Fecha">{gamedatalles[0].released}</p>

            <h4 className="TituloPlataforma">👾 Plataformas :</h4>
            <div className="Conte-Plataform">
              {gamedatalles[0].platforms &&
                gamedatalles[0].platforms.join(",  ")}
            </div>

            <h4 className="TituloGeneros"> 🏹 Generos :</h4>
            <div className="Conte-Generos">
              {gamedatalles[0].genres.join(",  ")}
            </div>

            <h4 className="TituloDescripcion">📖 Descripción :</h4>
            <p
              className="Descripcion-Detalle"
              dangerouslySetInnerHTML={{ __html: gamedatalles[0].description }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="Fondo-Detail">
      <div className="container-info">
        <div className="Contenedor-Boton">
          <div>
            <Link to="/home">
              <button className="button-back"> Volver</button>
            </Link>
          </div>
        </div>
        <div className="Conte-Sub">
          <div className="Conte-General">
            <h1 className="Titulo-Detail">{gamedatalles.name}</h1>
            <div className="img-center">
              <div>
                <img
                  className="ImagenDetail"
                  src={gamedatalles.background_image}
                  alt={gamedatalles.name}
                />
              </div>
            </div>
            <h4 className="TituloRating">⭐ Rating :</h4>
            <p className="Conte-Rating">{gamedatalles.rating}</p>

            <h4 className="TituloFecha">📆 Fecha de Lanzamiento :</h4>
            <p className="Conte-Fecha">{gamedatalles.released}</p>

            <h4 className="TituloPlataforma">👾 Plataformas :</h4>
            <div className="Conte-Plataform">
              {gamedatalles.platforms && gamedatalles.platforms.join(",  ")}
            </div>

            <h4 className="TituloGeneros"> 🏹 Generos :</h4>
            <div className="Conte-Generos">
              {gamedatalles.genres && gamedatalles.genres.join(",  ")}
            </div>

            <h4 className="TituloDescripcion">📖 Descripción :</h4>
            <p
              className="Descripcion-Detalle"
              dangerouslySetInnerHTML={{ __html: gamedatalles.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
