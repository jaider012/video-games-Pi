import "../../css/paginado.css";
export default function Paginado({ videoGamesparPage, allGames, paging }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(allGames / videoGamesparPage); i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul>
        <li className="Paginado">
          <button className="BotonPaginado" onClick={() => paging(1)}>
            primero
          </button>
        </li>
        {pages?.map((num) => (
          <li className="Paginado" key={num}>
            <button className="BotonPaginado" onClick={() => paging(num)}>
              {num}
            </button>
          </li>
        ))}
        <li className="Paginado">
          <button
            className="BotonPaginado"
            onClick={() => paging(pages.length)}
          >
            ultimo
          </button>
        </li>
      </ul>
    </nav>
  );
}
