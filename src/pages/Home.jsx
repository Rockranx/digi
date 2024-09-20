import React, { useEffect, useState } from "react";
import { BiShield } from "react-icons/bi";
import { BsArrowRight, BsXDiamond, BsCircleHalf } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import i from "../images/images/avatar/i.jpg";
import Loader from "./buttons&loaders/Loader";
const Home = ({
  banner1,
  banner2,
  banner3,
  banner4,
  bannerisLoading,
  trendingisLoading,
  trending4NFT,
  trending4NFTLoading,
  categories,
  categoriesLoading,
  banners,
  trendingData,
  newBanners,
}) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(banners[0]);
  const [currentBanner1, setCurrentBanner1] = useState("");

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % banners.length;
          setCurrentBanner(banners[newIndex]);
          return newIndex;
        });
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [banners]);

  useEffect(() => {
    setCurrentBanner(banners[currentBannerIndex]);
   
  }, [currentBannerIndex, banners]);
  useEffect(() => {
    if (currentBanner) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  });
  return (
    <>
      <div className="home" id="main-wrapper">
        <br />

        <div className="intro1 section-padding">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-xl-5 col-lg-6 col-12">
                <div className="intro-content my-5">
                  <h1 className="mb-3">
                    Discover, collect, and sell<span> extraordinary NFTs</span>
                  </h1>
                  <p> on the world's first &amp; largest NFT marketplace</p>
                  <div className="intro-btn mt-5"></div>
                </div>
              </div>

              <div className="col-xl-5 col-lg-6 col-12">
                {bannerisLoading ? (
                  <>
                    {open ? (
                      <>
                        {currentBanner.map((ijass, inas) => {
                          let directionName;
                          ijass.marketplace_pages.map((jjggsd, siod) => {
                            const searchTerm = "OpenSea";
                            if (jjggsd.marketplace_name === searchTerm) {
                              directionName = jjggsd.marketplace_collection_id;
                            }
                          });
                          return (
                            <>
                              <NavLink to={`/collection/${directionName}`}>
                                <div className="intro-slider" key={inas}>
                                  <div className="slider-item">
                                    <img
                                      src={ijass.banner_image_url}
                                      alt=""
                                      className="img-fluid"
                                    />

                                    <div className="slider-item-avatar">
                                      <NavLink to={`/collection`}>
                                        {" "}
                                        <img
                                          src={ijass.image_url}
                                          alt=""
                                        />{" "}
                                      </NavLink>
                                      <div>
                                        <h5>{ijass.name}</h5>
                                        {ijass.floor_prices.map(
                                          (ijas1, inas) => {
                                            const searchTerm = "OpenSea";

                                            if (
                                              ijas1.marketplace_name ===
                                              searchTerm
                                            ) {
                                              let Price;
                                              let etherValues;
                                              let ethhy;
                                              if (ijas1 !== null) {
                                                Price = ijas1.value;

                                                const weiStringValue =
                                                  Price.toString();
                                                const etherValue =
                                                  ethers.utils.formatEther(
                                                    weiStringValue
                                                  );
                                                etherValues = etherValue;
                                                ethhy = "ETH";
                                              }
                                              return (
                                                <div key={inas}>
                                                  <span>
                                                    {ijas1.marketplace_name}:{" "}
                                                    {etherValues} {ethhy}
                                                  </span>
                                                </div>
                                              );
                                            } else {
                                              return null;
                                            }
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </NavLink>
                            </>
                          );
                          return <></>;
                        })}
                      </>
                    ) : (
                      <>
                        <Loader />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div
                      className="intro-slider"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Loader />
                    </div>
                  </>
                )}
                <div className="intro-slider"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="notable-drops section-padding bg-light triangle-top-light triangle-bottom-light">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-title text-center d=flex justify-content-between mb-3">
                  <h2>Notable Drops</h2>
                </div>
              </div>
            </div>

            <div className="row">
              {newBanners.map((item, index) => {
             
                return (
                  <>
                    {item.map((newItem, newIndex) => {
                  
                      return (
                        <>
                          <div
                            className="col-xl-3 col-lg-6 col-md-6"
                            key={newIndex}
                          >
                            <div className="card">
                              <img
                                className="img-fluid card-img-top"
                                src={newItem.banner_image_url}
                                alt=""
                              />
                              <div className="card-body mobycard">
                                <div className="notable-drops-content-img"></div>
                                <h4 className="card-title">{newItem.name}</h4>
                                {newItem.marketplace_pages.map(
                                  (marId, marIndex) => {
                                    const searchTerm = "OpenSea";
                                    if (marId.marketplace_name === searchTerm) {
                                      let directionName =
                                        marId.marketplace_collection_id;
                                      return (
                                        <>
                                          <div key={marIndex}>
                                            <NavLink
                                              to={`/collection/${directionName}`}
                                              style={{
                                                display: "flex",
                                                width: "90px",
                                                alignItems: "center",
                                                justifyContent: "space-evenly",
                                              }}
                                            >
                                              Explore
                                              <BsArrowRight />
                                            </NavLink>
                                          </div>
                                        </>
                                      );
                                    }
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <br />

        <div className="top-collection sectioin-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8">
                <div className="section-title text-center">
                  <h2>Top Collections over the last 7 days</h2>
                  <p>
                    Here are a few reasons why you should choose Digital Eden
                  </p>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              {trendingisLoading ? (
                <>
                  {trendingData.map((data, index) => {
                    return (
                      <>
                        {data.collection_details.marketplace_pages.map(
                          (jug, inds) => {
                            const searchTerm = "OpenSea";
                            if (jug.marketplace_name === searchTerm) {
                              let directionName = jug.marketplace_collection_id;

                              return (
                                <div
                                  className="col-xl-4 col-lg-6 col-md-6"
                                  key={index}
                                >
                                  <NavLink
                                    className="top-collection-content d-block"
                                    to={`/collection/${directionName}`}
                                  >
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0">
                                        <span className="top-img">
                                          <img
                                            className="img-fluid"
                                            src={
                                              data.collection_details.image_url
                                            }
                                            alt=""
                                            width="70"
                                          />
                                        </span>
                                      </div>
                                      <div className="flex-grow-1 ms-3">
                                        <h5>{data.collection_details.name}</h5>
                                        {data.collection_details.floor_prices.map(
                                          (ijas, inas) => {
                                            const searchTerm = "OpenSea";
                                            if (
                                              ijas.marketplace_name ===
                                              searchTerm
                                            ) {
                                              let Price;
                                              let etherValues;
                                              let ethhy;
                                              if (ijas !== null) {
                                                Price = ijas.value;

                                                const weiStringValue =
                                                  Price.toString();
                                                const etherValue =
                                                  ethers.utils.formatEther(
                                                    weiStringValue
                                                  );
                                                etherValues = etherValue;
                                                ethhy = "ETH";
                                              }
                                              return (
                                                <div>
                                                  <p className="text-muted">
                                                    {`Floor Price:  ${etherValues} ${ethhy} `}
                                                  </p>
                                                </div>
                                              );
                                            } else {
                                              return null;
                                            }
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </NavLink>
                                </div>
                              );
                            }
                          }
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <div
                    style={{
                      minHeight: "150px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Loader />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="trending-category section-padding bg-light triangle-top-ligh triangle-bottom-light">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-title text-center d-flex justify-content-between mb-3">
                  <h2>Trending Items</h2>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              {trending4NFTLoading ? (
                <>
                  {trending4NFT.map((item, index) => {
                    let directionName;
                    item.collection.marketplace_pages.map((jjggsd, siod) => {
                      const searchTerm = "OpenSea";
                      if (jjggsd.marketplace_name === searchTerm) {
                        directionName = jjggsd.marketplace_collection_id;
                      }
                    });
                    return (
                      <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
                        <div className="card items">
                          <div className="card-body">
                            <div className="items-img position-relative">
                              <img
                                src={item.image_url}
                                className="img-fluid rounded mb-3"
                                alt=""
                              />
                              <NavLink
                                to={`/item/${item.contract_address}/${item.token_id}`}
                              >
                                <img
                                  className="creator"
                                  src={item.collection.image_url}
                                  width="50"
                                  alt=""
                                />
                              </NavLink>
                            </div>
                            <NavLink
                              to={`/item/${item.contract_address}/${item.token_id}`}
                            >
                                <NavLink
                                  to={`/collection/${directionName}`}
                                >
                              <h4 className="card-title">
                                  {item.collection.name}
                              </h4>
                                </NavLink>
                            </NavLink>
                            <p></p>
                            <div className="d-flex justify-content-between">
                              <div className="text-start">
                                <p className="mb-2"> TokenID:</p>
                              </div>
                              <div className="text-end">
                                <p className="mb-2">
                                  <strong className="text-primary">
                                    {item.token_id}
                                  </strong>
                                </p>
                                <h5 className="text-muted"></h5>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                              <NavLink
                                className="btn btn-primary"
                                to={`/item/${item.contract_address}/${item.token_id}`}
                              >
                                View Item
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <Loader />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="create-sell section-padding">
          <div className="container">
            <div className="row justify-content-cneter">
              <div className="col-xl-8">
                <div className="section-title text-center">
                  <h2>Create and Sell your NFTs</h2>
                  <p>
                    Here are a few reasons why you should choose Digital Eden
                  </p>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="create-sell-content">
                  <div className="create-sell-content-icon">
                    <BiShield />
                  </div>
                  <div>
                    <h4>Set up your wallet</h4>
                    <p>
                      Once you’ve set up your wallet of choice, connect it to
                      Digital Eden by clicking the wallet icon in the top right
                      corner. Learn about the wallets we support.
                    </p>
                   
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="create-sell-content">
                  <div className="create-sell-content-icon">
                    <BsXDiamond />
                  </div>
                  <div>
                    <h4>Create your collection</h4>
                    <p>
                      Click My Collections and set up your collection. Add
                      social links, a description, profile &amp; banner images,
                      and set a secondary sales fee.
                    </p>
                   
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="create-sell-content">
                  <div className="create-sell-content-icon">
                    <BsCircleHalf />
                  </div>
                  <div>
                    <h4>Add your NFTs</h4>
                    <p>
                      Upload your work (image, video, audio, or 3D art), add a
                      title and description, and customize your NFTs with
                      properties, stats, and unlockable content.
                    </p>
                   
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="create-sell-content">
                  <div className="create-sell-content-icon">
                    <BsCircleHalf />
                  </div>
                  <div>
                    <h4>List them for sale</h4>
                    <p>
                      Choose between auctions, fixed-price listings, and
                      declining-price listings. You choose how you want to sell
                      your NFTs, and we help you sell them!
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Home;
