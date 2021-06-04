import React from "react";

function tablero(props: any) {
  var Noticias: any = props;
  return (
    <div className="tablero">
      <div className="news">
        {Noticias.map((item: any) => (
          <div className="card">
            <div className="banner">
              <p className="source">{item.source.name}</p>
              <img className="banner-img" src={item.urlToImage} alt="imagen" />
            </div>
            <div className="character">
              <h2 className="title">{item.title}</h2>
              <p className="description">{item.description}</p>
              <a className="link" href={item.url} target="_blank">
                Ver más
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default tablero;
