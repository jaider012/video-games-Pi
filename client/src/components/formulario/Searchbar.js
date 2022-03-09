import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideoGameByName } from "../../action/action";
import '../../css/searchbar.css'
const Searchbar = () => {
  const dispatch = useDispatch();

  const [game, setgame] = useState("");

  const Hadlesubmit = (e) => {
    e.preventDefault();
    if (!game) {
      return alert("Colocar un busqueda");
    } else {
      dispatch(getVideoGameByName(game));
      setgame("");
      document.querySelector("#inputsearch").value = "";
    }
  };

  const Hadlesearch = (e) => {
    e.preventDefault();
    setgame(e.target.value);
  };
    
  return (
    <div>
      <input
        id="inputsearch"
        className="searchbar"
        type="text"
        placeholder="Busca tu juego"
        onChange={(e) => Hadlesearch(e)}
      />

      <button className="button" type="submit" onClick={(e) => Hadlesubmit(e)}>
        Enviar
      </button>
    </div>
  );
};

export default Searchbar;
