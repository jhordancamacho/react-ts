import { useEffect, useState } from "react";

export const useNews = (innitState: any) => {
  const [Noticias, setNoticias] = useState([]);
  useEffect(() => {
    fetch(
      "http://newsapi.org/v2/top-headlines?country=co&apiKey=939167e7872649b9a97697a91db03fce&languaje=es"
    )
      .then((Response) => Response.json())
      .then((data) => setNoticias(data.articles));
  }, []);

  return {
    Noticias,
  };
};
