import React from "react";
import mario from "../../img/mariogirando.webp"
import "../../css/page404.css";

const Page404 = () => {
  return (
    <div className="center1">
      <div className="grid3">
        <div>
          <img className="img404" src={mario} alt="img-404page"></img>
        </div>
        <div>
          <div>
    
            <div className="stage">
              <div className="layer"></div>
              <h2>UH OH! You're lost.</h2>
            </div>
          </div>

          <div className="ert">
            <p>
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click the button below to go back to the
              homepage.
            </p>
          </div>
          <button
            className="button-submit1"
            onClick={() => {
              window.location.reload();
            }}
          >
            home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page404;
