import React, { useEffect, useState } from "react";
import { BsFacebook, BsYoutube, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link, NavLink, useParams } from "react-router-dom";
import logo from "../images/images/logo.png";
import logow from "../images/images/logow.png";
import logoh from "../images/images/logoh.png";
import one from "../images/images/items/one.jpg";
import { FaDiscord, FaSquareXTwitter } from "react-icons/fa6";
import fifteen from "../images/images/items/fifteen.jpg";
import sixteen from "../images/images/items/sixteen.jpg";
import seventeen from "../images/images/items/seventeen.jpg";
import eighteen from "../images/images/items/eighteen.jpg";
import nineteen from "../images/images/items/nineteen.jpg";
import twenty from "../images/images/items/twenty.jpg";
import i from "../images/images/avatar/i.jpg";
import Loader from "./buttons&loaders/Loader";
import Web3 from "web3";
const Collections = ({ API, HASH }) => {
  const { collectionSlug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [nftCollectionLoading, setNftCollectionLoading] = useState(true);
  const [currentNftCollection, setCurrentNftCollection] = useState([]);
  const [nftCollectionBanner, setNftCollectionBanner] = useState([]);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [bodyColor, setBodyColor] = useState("#ffffff");
  const [deploydate, setDeploydate] = useState("");
  const [deploycontract, setDeploycontract] = useState("");
  const [totalSupplys, setTotalSupplys] = useState("");
  const web3 = new Web3(
    "https://mainnet.infura.io/v3/c892c2a72e3040c7b3f86e3078d51f6e"
  );

  useEffect(() => {
    async function fetchNftCollectionData() {
      setNftCollectionLoading(false);
      setCurrentNftCollection([]);
      const response1 = await fetchNftCollection(collectionSlug, currentPage);
      setDeploycontract(response1.nfts[0].contract.address);

      setCurrentNftCollection([response1.nfts]);
      // console.log(currentNftCollection);
      setNftCollectionBanner([response1.nfts[0]]);
      setDisablePrev(currentPage === 1);
      setDisableNext(response1.nfts.length < 100);

      setNftCollectionLoading(true);
    }

    fetchNftCollectionData();
  }, [collectionSlug, currentPage]);

  // console.log(currentPage);
  async function fetchNftCollection(collectionSlug, page) {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    try {
      const response = await fetch(
        `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getNFTsForCollection?collectionSlug=${collectionSlug}&withMetadata=true&startToken=${
          (page - 1) * 100
        }&limit=100`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  useEffect(() => {
    async function fetchNftCollections() {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      try {
        const response = await fetch(
          `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getContractMetadata?contractAddress=${deploycontract}`,
          options
        );
        const data = await response.json();
        // console.log(data)
        setTotalSupplys(data.totalSupply);
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    fetchNftCollections();
  }, [deploycontract]);
  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = async () => {
    if (!disableNext) {
      await handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = async () => {
    if (!disablePrev) {
      await handlePageChange(currentPage - 1);
    }
  };
  useEffect(() => {
    const bodyComputedStyle = window.getComputedStyle(document.body);
    const backgroundColor = bodyComputedStyle.backgroundColor;
    setBodyColor(backgroundColor);

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const updatedBodyComputedStyle = window.getComputedStyle(
            document.body
          );
          const updatedBackgroundColor =
            updatedBodyComputedStyle.backgroundColor;
          setBodyColor(updatedBackgroundColor);
        }
      }
    });

    // Start observing changes in the body's class list
    observer.observe(document.body, { attributes: true });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  async function getBlockTimestamp(blockNumber) {
    try {
      const block = await web3.eth.getBlock(blockNumber);
      if (block) {
        const timestamp = Number(block.timestamp) * 1000; // Convert to number and multiply by 1000
        const date = new Date(timestamp);
        return date.toISOString(); // Convert date to ISO string
      } else {
        throw new Error("Block not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="front" id="main-wrapper">
        <div className="header landing">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="navigation">
                  <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="brand-logo">
                      <NavLink to="/">
                        <img src={logo} alt="" className="logo-primary" />
                        <img src={logow} alt="" className="logo-white" />
                      </NavLink>
                    </div>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarSupportedContent"
                    >
                      <ul className="navbar-nav me-auto">
                        <li className="nav-item dropdown">
                          <NavLink className="nav-link" to="/">
                            Home
                          </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                          <NavLink className="nav-link" to="/explore">
                            Explore
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/collection">
                            Collection
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                    <div className="signin-btn d-flex align-items-center">
                      <div
                        className="dark-light-toggle theme-switch"
                        // onClick={themeToggle()}
                      >
                        <span className="dark">
                          <i className="ri-moon-line"></i>
                        </span>
                        <span className="light">
                          <i className="ri-sun-line"></i>
                        </span>
                      </div>
                      <NavLink className="btn btn-primary" to="/signin">
                        Sign in
                      </NavLink>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {nftCollectionLoading ? (
          <>
            {" "}
            {currentNftCollection.map((item, index) => {
              // console.log(item.length)
              // console.log(item[0]);
              getBlockTimestamp(item[0].contract.deployedBlockNumber)
                .then((date) => {
                  // console.log("Block timestamp:", date);
                  const timestamp = new Date(date);
                  const monthYear = timestamp.toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  });
                  setDeploydate(monthYear);
                  // console.log(monthYear);
                })
                .catch((error) => console.error("Error:", error));
              // setNftCollectionBanner(item[0].collection.bannerImageUrl)
              const imageUrls = item[0].collection.bannerImageUrl;
              let conAddy = item[0].contract.address.slice(0, 4);
              let conAddy2 = item[0].contract.address.slice(38);
              let deployer1 = item[0].contract.contractDeployer.slice(0, 4);
              let deployer2 = item[0].contract.contractDeployer.slice(38);
              return (
                <>
                  <div
                    className="collections section-padding"
                    style={{ padding: "25px 0px" }}
                  >
                    <div
                      className="bannerDisplay"
                      style={{
                        backgroundImage: `
                        
                        linear-gradient(to bottom, rgba(255, 255, 255, 0), ${bodyColor}),
                        url(${imageUrls})
                      `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="collection-imagesection">
                        <div className="lowerBox">
                          <div className="iconbox">
                            <img
                              src={item[0].contract.openSeaMetadata.imageUrl}
                              alt="Image Icon"
                              
                            />
                          </div>
                          <div className="collectionTitle">
                            <span>
                              {item[0].contract.openSeaMetadata.collectionName}
                            </span>
                            <div className="deployer">
                              {/* <span>Deployer</span> */}
                              <span style={{ marginLeft: "5px" }}>
                                {" "}
                                {conAddy}...{conAddy2}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="collection-details">
                        <div className="ups">
                          <div className="descrriptionwriteup">
                            <p>
                              {item[0].contract.openSeaMetadata.description}
                            </p>
                          </div>
                        </div>
                        <div className="downs">
                          <div className="linkinfo">
                            <div className="box1"></div>
                            <div className="box2">
                              <Link
                                to={`${item[0].contract.openSeaMetadata.discordUrl}`}
                              >
                                <span>
                                  <FaDiscord />
                                </span>
                              </Link>
                            </div>
                            <div className="box3">
                              <Link
                                to={`https://twitter.com/${item[0].contract.openSeaMetadata.twitterUsername}`}
                              >
                                <span>
                                  <FaSquareXTwitter />
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="bannerdetails">
                            <div className="itenNo">
                              <span>Items</span>
                              <span> {totalSupplys}</span>
                            </div>
                            <div className="deploydate">
                              <span>deployed</span>
                              <span> {deploydate} </span>
                            </div>
                            <div className="deploychain">
                              <span>Deployer</span>
                              <span>
                                {" "}
                                {deployer1}...{deployer2}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-12">
                          <div className="filter-tab">
                            <div className="filter-tab mb-4">
                              <a className="active">All</a>
                            </div>

                            <div className="row">
                              {item.map((ith, indexs) => {
                                // console.log(ith);
                                return (
                                  <>
                                    <div
                                      className="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6"
                                      key={indexs}
                                    >
                                      <div className="card items">
                                        <div className="card-body">
                                          <div className="items-img position-relative">
                                            <img
                                              className="img-fluid rounded mb-3"
                                              src={ith.image.cachedUrl}
                                              alt=""
                                            />
                                            <img
                                              src="../../images/images/avatar/17.html"
                                              className="creator"
                                              width="50"
                                              alt=""
                                            />
                                          </div>
                                          <NavLink to="/item">
                                            <h4 className="card-title">
                                              {ith.name}
                                            </h4>
                                          </NavLink>
                                          {/* <div className="d-flex justify-content-between">
                                            <div className="text-start">
                                              <p className="mb-2">Auction</p>
                                              <h5 className="text-muted">
                                                3h 1m 50s
                                              </h5>
                                            </div>

                                            <div className="text-end">
                                              <p className="mb-2">
                                                Bid :
                                                <strong className="text-primary">
                                                  0.15 ETH
                                                </strong>
                                              </p>
                                              <h5 className="text-muted">
                                                {" "}
                                                0.15ETH
                                              </h5>
                                            </div>
                                          </div> */}
                                          <div className="d-flex justify-content-center mt-3">
                                            <NavLink
                                              className="btn btn-primary"
                                              to={`/item/${ith.contract.address}/${ith.tokenId}`}
                                            >
                                              Place a Bid
                                            </NavLink>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movementButtons">
                        <button
                          className="btn btn-primary"
                          onClick={handlePrevPage}
                          disabled={disablePrev}
                        >
                          Previous
                        </button>
                        <button
                          className="btn btn-primary space-left"
                          onClick={handleNextPage}
                          disabled={disableNext}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <>
            <div className="fullPageLoader">
              <Loader />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Collections;
