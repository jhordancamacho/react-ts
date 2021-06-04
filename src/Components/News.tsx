import { useEffect, useState } from "react";
import "./news.css";

function News() {
  const [Noticias, setNoticias] = useState([]);
  useEffect(() => {
    fetch(
      "http://newsapi.org/v2/top-headlines?country=co&apiKey=939167e7872649b9a97697a91db03fce&languaje=es"
    )
      .then((Response) => Response.json())
      .then((data) => setNoticias(data.articles));
  }, []);

  return (
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
  );
}

export default News;
