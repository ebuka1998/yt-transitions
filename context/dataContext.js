import React, {createContext, useState} from "react";
import axios from "axios";
export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);

  const BASE_URL = "https://youtube-v3-alternative.p.rapidapi.com";
  const options = {
    // url: `${BASE_URL}/trending`,
    params: {geo: "NG", lang: "en"},
    headers: {
      "X-RapidAPI-Key": "9c82eeb5d0msh088a30cdf897655p157ccdjsn16815e55fabe",
      "X-RapidAPI-Host": "youtube-v3-alternative.p.rapidapi.com",
    },
  };

  const getTrendingVideos = async () => {
    try {
      setIsLoadingVideos(true);
      const {data} = await axios.get(`${BASE_URL}/trending`, options);
      //   console.log(JSON.stringify(data, null, 2));
      setTrendingVideos(data.data);
      setIsLoadingVideos(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DataContext.Provider value={{trendingVideos, getTrendingVideos}}>
      {children}
    </DataContext.Provider>
  );
};
