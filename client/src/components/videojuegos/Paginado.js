
import '../../css/paginado.css'
export default function Paginado ({videoGamesparPage, allGames,paging}){
    const pages = []

    for (let i = 1; i <= Math.ceil(allGames/videoGamesparPage); i++) {
        pages.push(i)  
    }

    return(
        <nav >
            <ul>
                {pages?.map(num =>(
                    <li className="Paginado" key={num}>
                        <button className="BotonPaginado" onClick={()=>paging(num)}>{num}</button>
                    </li>
                ))}
            </ul>

        </nav>
    )
}