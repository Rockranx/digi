import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Explore from "./pages/Explore";
import Collections from "./pages/Collections";
import Item from "./pages/Item";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Footer from "./pages/Footer";
import ErrorPage from "./pages/ErrorPage";
import Test from "./pages/Test";
function App() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();
  useEffect(() => {
    if (isConnected) {
      setUserAddress(address);
    }
  });


  const [banners, setBanners] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [newBanners, setNewBanners] = useState([]);
  const [bannerisLoading, setBannerisLoading] = useState(false);
  const [trendingisLoading, setTrendingisLoading] = useState(false);
  const [trending4NFT, setTrending4NFT] = useState([]);
  const [trending4NFTLoading, setTrending4NFTLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const API = import.meta.env.VITE_ALCHEMY_API;
  const DISPLAY1 = import.meta.env.VITE_HOME_DISPLAY1;
  const DISPLAY2 = import.meta.env.VITE_HOME_DISPLAY2;
  const DISPLAY3 = import.meta.env.VITE_HOME_DISPLAY3;
  const DISPLAY4 = import.meta.env.VITE_HOME_DISPLAY4;

  const ADDRESS1 = import.meta.env.VITE_HOME_CONTRACT1;
  const ADDRESS2 = import.meta.env.VITE_HOME_CONTRACT2;
  const ADDRESS3 = import.meta.env.VITE_HOME_CONTRACT3;
  const ADDRESS4 = import.meta.env.VITE_HOME_CONTRACT4;
  const ADDRESS5 = import.meta.env.VITE_HOME_CONTRACT5;
  const HASH = import.meta.env.VITE_SIMPLE_HASH;
  const ADDRESS7 = import.meta.env.VITE_HOME_CONTRACT7;
  const ADDRESS8 = import.meta.env.VITE_HOME_CONTRACT8;
  const ADDRESS9 = import.meta.env.VITE_HOME_CONTRACT9;
  const ADDRESS10 = import.meta.env.VITE_HOME_CONTRACT10;
  const ADDRESS11 = import.meta.env.VITE_HOME_CONTRACT11;
  const ADDRESS12 = import.meta.env.VITE_HOME_CONTRACT12;
  const ADDRESS13 = import.meta.env.VITE_HOME_CONTRACT13;

  // trending

  const tokenId = 1;
  const tokenId1 = 5;
  const tokenId2 = 10;
  const tokenId3 = 15;

  //categories


  useEffect(() => {
    async function runnner() {
      const response1 = await NotableDrops(ADDRESS1);
      const response2 = await NotableDrops(ADDRESS2);
      const response3 = await NotableDrops(ADDRESS3);
      const response4 = await NotableDrops(ADDRESS4);
      const response5 = await NotableDrops(ADDRESS5);
      const response6 = await NotableDrops(ADDRESS13);
      const response7 = await NotableDrops(ADDRESS7);
      const response8 = await NotableDrops(ADDRESS8);
      const response9 = await NotableDrops(ADDRESS9);
      const response10 = await NotableDrops(ADDRESS10);
      const response11 = await NotableDrops(ADDRESS11);
      const response12 = await NotableDrops(ADDRESS12);

      const allResponses = [
        response1,
        response2,
        response3,
        response4,
        response5,
        response6,
        response7,
        response8,
        response9,
        response10,
        response11,
        response12,
      ].flat();
      const selectedBanners = getRandomItems(allResponses, 4);

      setNewBanners([selectedBanners]);
    }
    runnner();
  }, []);
  async function NotableDrops(DropsAddress) {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "X-API-KEY": HASH },
    };
    try {
      const response = await fetch(
        `https://api.simplehash.com/api/v0/nfts/collections/ethereum/${DropsAddress}?limit=50`,
        options
      );
      const data = await response.json();
      return data.collections;
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setBannerisLoading(false);
      const options = {
        method: "GET",
        headers: { accept: "application/json", "X-API-KEY": HASH },
      };
      try {
        const response = await fetch(
          `https://api.simplehash.com/api/v0/nfts/collections/trending?chains=ethereum&time_period=7d&limit=15`,
          options
        );
        const data = await response.json();
        setBannerisLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: { accept: "application/json", "X-API-KEY": HASH },
      };
   
      try {
        const response = await fetch(
          `https://api.simplehash.com/api/v0/nfts/collections/top_v2?chains=ethereum&time_period=7d&limit=12`,
          options
        );
        const data = await response.json();
      
        setTrendingData(data.collections);
        setTrendingisLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // TopBanner
  // TopBanner
  // TopBanner
  // TopBanner
  // Helper function to randomly select two items from an array
  const getRandomItems = (array, numItems) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  };

  useEffect(() => {
    async function getTopBanner() {
      setBannerisLoading(false);
      const response1 = await TopBanner(DISPLAY1);
      const response2 = await TopBanner(DISPLAY2);
      const response3 = await TopBanner(DISPLAY3);
      const response4 = await TopBanner(DISPLAY4);
      setBanners([response1, response2, response3, response4]);
      setBannerisLoading(true);
    }
    getTopBanner();
  }, []);
  async function TopBanner(topbanneraddress) {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "X-API-KEY": HASH },
    };
    try {
      // deal with the chain issue
      const response = await fetch(
        `https://api.simplehash.com/api/v0/nfts/collections/ethereum/${topbanneraddress}?limit=1`,
        options
      );
      const data = await response.json();
      return data.collections;
      console.log(data);
      setTrendingData(data.collections);
      setTrendingisLoading(true);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setBannerisLoading(false);
      setBannerisLoading(true);
    }

    fetchData();
  }, []);

  // TRENDING CODE
  useEffect(() => {
    async function fetchTrendingDatas() {
      setTrendingisLoading(true);
    }

    fetchTrendingDatas();
  }, []);

  //4 TRENDING ITEMS
  useEffect(() => {
    async function fetchSpecificNftData() {
      setTrending4NFTLoading(false);
      const response1 = await fetchSpecificNftMetaData(ADDRESS1, tokenId);
      const response2 = await fetchSpecificNftMetaData(ADDRESS2, tokenId1);
      const response3 = await fetchSpecificNftMetaData(ADDRESS3, tokenId2);
      const response4 = await fetchSpecificNftMetaData(ADDRESS4, tokenId3);
      setTrending4NFT([response1, response2, response3, response4]);

      setTrending4NFTLoading(true);
    }

    fetchSpecificNftData();
  }, []);

  // cateorgy code
  useEffect(() => {
    async function fetchCategoryData() {
      setCategoriesLoading(false);
      setCategoriesLoading(true);
   
    }

    fetchCategoryData();
  }, []);


  async function fetchSpecificNftMetaData(tokenAddress, tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "X-API-KEY": HASH },
    };

    try {
      const response = await fetch(
        ` https://api.simplehash.com/api/v0/nfts/ethereum/${tokenAddress}/${tokenIds}`,
        options
      );
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }



  return (
    <>
      <BrowserRouter>
        <Connect />
        <Routes>
          <Route
            path="/"
            element={
              <Home
         
                trendingData={trendingData}
                banners={banners}
                // isLoading={isLoading}
                trendingisLoading={trendingisLoading}
                trending4NFTLoading={trending4NFTLoading}
                categoriesLoading={categoriesLoading}
          
                trending4NFT={trending4NFT}
                bannerisLoading={bannerisLoading}
               
                HASH={HASH}
                newBanners={newBanners}
              />
            }
          />
          <Route
            path="/explore"
            element={<Explore userAddress={userAddress} HASH={HASH} />}
          />
          <Route
            path="/collection/:collectionSlug"
            element={
              <Collections API={API} userAddress={userAddress} HASH={HASH} />
            }
          />
          <Route
            path="/item/:contractAddress/:tokenId"
            element={<Item API={API} HASH={HASH} />}
          />
          <Route exact path="*" element={<ErrorPage />} />
          <Route exact path="/test" element={<Test />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
