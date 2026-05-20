import {createContext,useContext,useState} from "react";

const WebsiteContext = createContext();

export const WebsiteProvider =
  ({ children }) => {

    const [websiteData, setWebsiteData] =useState(null);

    return (

      <WebsiteContext.Provider
        value={{
          websiteData,
          setWebsiteData,
        }}
      >
        {children}
      </WebsiteContext.Provider>

    );
};

export const useWebsite = () =>
  useContext(WebsiteContext);