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
// import { Alchemy, Network } from "alchemy-sdk";
function App() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();
  useEffect(() => {
    if (isConnected) {
      setUserAddress(address);
    }
  });

  const [banner, setBanner] = useState("");
  const [banner1, setBanner1] = useState("");
  const [banner2, setBanner2] = useState("");
  const [banner3, setBanner3] = useState("");
  const [banner4, setBanner4] = useState("");
  const [trending1, setTrending1] = useState("");
  const [trending2, setTrending2] = useState("");
  const [trending3, setTrending3] = useState("");
  const [trending4, setTrending4] = useState("");
  const [trending5, setTrending5] = useState("");
  const [trending6, setTrending6] = useState("");
  const [trending7, setTrending7] = useState("");
  const [trending8, setTrending8] = useState("");
  const [trending9, setTrending9] = useState("");
  const [trending10, setTrending10] = useState("");
  const [trending11, setTrending11] = useState("");
  const [trending12, setTrending12] = useState("");
  const [banners, setBanners] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [displaydata, setDisplaydata] = useState([]);
  const [bannerisLoading, setBannerisLoading] = useState(false);
  const [trendingisLoading, setTrendingisLoading] = useState(false);
  const [trending4NFT, setTrending4NFT] = useState([]);
  const [trending4NFTLoading, setTrending4NFTLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

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
  const TopCollection1 = import.meta.env.VITE_HOME_TRENDING1;
  const TopCollection2 = import.meta.env.VITE_HOME_TRENDING2;
  const TopCollection3 = import.meta.env.VITE_HOME_TRENDING3;
  const TopCollection4 = import.meta.env.VITE_HOME_TRENDING4;
  const TopCollection5 = import.meta.env.VITE_HOME_TRENDING5;
  const TopCollection6 = import.meta.env.VITE_HOME_TRENDING6;
  const TopCollection7 = import.meta.env.VITE_HOME_TRENDING7;
  const TopCollection8 = import.meta.env.VITE_HOME_TRENDING8;
  const TopCollection9 = import.meta.env.VITE_HOME_TRENDING9;
  const TopCollection10 = import.meta.env.VITE_HOME_TRENDING10;
  const TopCollection11 = import.meta.env.VITE_HOME_TRENDING11;
  const TopCollection12 = import.meta.env.VITE_HOME_TRENDING12;
  const TopCollection13 = import.meta.env.VITE_HOME_TRENDING13;
  const tokenId = 1;
  const tokenId1 = 5;
  const tokenId2 = 10;
  const tokenId3 = 15;

  //categories
  const Art = import.meta.env.VITE_HOME_CATEGORY_ART;
  const Gaming = import.meta.env.VITE_HOME_CATEGORY_GAMING;
  const Music = import.meta.env.VITE_HOME_CATEGORY_MUSIC;
  const Photograpghy = import.meta.env.VITE_HOME_CATEGORY_PHOTOGRAPHY;

  useEffect(() => {
    async function getter() {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      try {
        await fetch(
          `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getContractMetadata?contractAddress=${ADDRESS1}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            // // console.log(response);
            setBanner(response.openSeaMetadata);
            // console.log(userNFTdata);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
      try {
        await fetch(
          `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getContractMetadata?contractAddress=${ADDRESS2}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            // // console.log(response);
            setBanner1(response.openSeaMetadata);
            // console.log(userNFTdata);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
      try {
        await fetch(
          `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getContractMetadata?contractAddress=${ADDRESS3}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            // console.log(response);
            setBanner2(response.openSeaMetadata);
            // console.log(userNFTdata);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
      try {
        await fetch(
          `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getContractMetadata?contractAddress=${ADDRESS4}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            // console.log(response);
            setBanner3(response.openSeaMetadata);
            // console.log(userNFTdata);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
      try {
        await fetch(
          `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getContractMetadata?contractAddress=${ADDRESS5}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            // console.log(response);
            setBanner4(response.openSeaMetadata);
            // console.log(userNFTdata);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
      // setBanners([banner, banner1, banner2, banner3, banner4]);
    }
    getter();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setBannerisLoading(false);
      const options = {
        method: "GET",
        headers: { accept: "application/json", "X-API-KEY": HASH },
      };
      try {
        // const response = await fetch(
        //   // `/api/getNftData/ethereum/${contractAddress}/${tokenId}`,

        //   {
        //     headers: {
        //       Accept: "application/json",
        //     },
        //   }
        // );
        // deal with the chain issue
        const response = await fetch(
          `https://api.simplehash.com/api/v0/nfts/collections/trending?chains=ethereum&time_period=7d&limit=15`,
          options
        );
        // console.log("requested");
        const data = await response.json();
        // console.log(data);
        setBanners(data.collections);
        setBannerisLoading(true);
        // console.log(nftsdetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      // setBannerisLoading(false);
      const options = {
        method: "GET",
        headers: { accept: "application/json", "X-API-KEY": HASH },
      };
      setTrendingisLoading(false);
      try {
        // deal with the chain issue
        const response = await fetch(
          `https://api.simplehash.com/api/v0/nfts/collections/top_v2?chains=ethereum&time_period=7d&limit=12`,
          options
        );
        const data = await response.json();
        console.log(data);
        setTrendingData(data.collections);
        setTrendingisLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setBannerisLoading(false);
      const response1 = await fetchContractMetaData(DISPLAY1);
      const response2 = await fetchContractMetaData(DISPLAY2);
      const response3 = await fetchContractMetaData(DISPLAY3);
      const response4 = await fetchContractMetaData(DISPLAY4);
      // setBanners([response1, response2, response3, response4]);
      setBannerisLoading(true);
    }

    fetchData();
  }, []);

  // TRENDING CODE
  useEffect(() => {
    async function fetchTrendingDatas() {
      setTrendingisLoading(false);
      const response1 = await fetchContractMetaData(TopCollection1);
      const response2 = await fetchContractMetaData(TopCollection2);
      const response3 = await fetchContractMetaData(TopCollection3);
      const response4 = await fetchContractMetaData(TopCollection4);
      const response5 = await fetchContractMetaData(TopCollection5);
      const response6 = await fetchContractMetaData(TopCollection6);
      const response7 = await fetchContractMetaData(TopCollection7);
      const response8 = await fetchContractMetaData(TopCollection8);
      const response9 = await fetchContractMetaData(TopCollection9);
      const response10 = await fetchContractMetaData(TopCollection10);
      const response11 = await fetchContractMetaData(TopCollection11);
      const response12 = await fetchContractMetaData(TopCollection12);

      // setTrendingData([
      //   response1,
      //   response3,
      //   response4,
      //   response5,
      //   response6,
      //   response8,
      //   response9,
      //   response10,
      //   response11,
      //   response12,
      // ]);
      setTrendingisLoading(true);
    }

    fetchTrendingDatas();
  }, []);

  //4 TRENDING ITEMS
  useEffect(() => {
    async function fetchSpecificNftData() {
      setTrending4NFTLoading(false);
      const response1 = await fetchSpecificNftMetaData(tokenId);
      const response2 = await fetchSpecificNftMetaData(tokenId1);
      const response3 = await fetchSpecificNftMetaData(tokenId2);
      const response4 = await fetchSpecificNftMetaData(tokenId3);
      setTrending4NFT([response1, response2, response3, response4]);
      setTrending4NFTLoading(true);
      // console.log(trending4NFT)
    }

    fetchSpecificNftData();
  }, []);

  // cateorgy code
  useEffect(() => {
    async function fetchCategoryData() {
      setCategoriesLoading(false);
      const response1 = await fetchContractMetaData(Music);
      const response2 = await fetchContractMetaData(Gaming);
      const response3 = await fetchContractMetaData(Photograpghy);
      const response4 = await fetchContractMetaData(Art);
      setCategories([response1, response2, response3, response4]);
      setCategoriesLoading(true);
      // console.log(categories);
    }

    fetchCategoryData();
  }, []);

  async function fetchContractMetaData(addresses) {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    try {
      const response = await fetch(
        `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getContractMetadata?contractAddress=${addresses}`,
        options
      );
      const data = await response.json();
      // console.log(data)
      return data.openSeaMetadata;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async function fetchSpecificNftMetaData(tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    try {
      const response = await fetch(
        // `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getContractMetadata?contractAddress=${addresses}`,
        `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getNFTMetadata?contractAddress=0xba265b93519e6473f34f46ee35f4b23970f41a3f&tokenId=${tokenIds}&refreshCache=false`,
        options
      );
      const data = await response.json();
      // console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const myFunction = () => {
    var element = document.body;
    element.classList.toggle("dark-theme");

    // Check if dark theme is applied and store the user's preference
    const isDarkMode = element.classList.contains("dark-theme");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  return (
    <>
      <BrowserRouter>
        <Connect />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                banner={banner}
                trendingData={trendingData}
                banners={banners}
                // isLoading={isLoading}
                trendingisLoading={trendingisLoading}
                trending4NFTLoading={trending4NFTLoading}
                categoriesLoading={categoriesLoading}
                categories={categories}
                trending4NFT={trending4NFT}
                bannerisLoading={bannerisLoading}
                banner1={banner1}
                banner2={banner2}
                banner3={banner3}
                banner4={banner4}
                trending1={trending1}
                trending2={trending2}
                trending3={trending3}
                trending4={trending4}
                trending5={trending5}
                trending6={trending6}
                trending7={trending7}
                trending8={trending8}
                trending9={trending9}
                trending10={trending10}
                trending11={trending11}
                trending12={trending12}
                HASH={HASH}
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
