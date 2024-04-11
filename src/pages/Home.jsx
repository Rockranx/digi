import React, { useEffect, useState } from "react";
import { BiShield } from "react-icons/bi";
import {
  BsArrowRight,
  BsXDiamond,
  BsCircleHalf,
  BsFacebook,
  BsYoutube,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import logoh from "../images/images/logoh.png";
import i from "../images/images/avatar/i.jpg";
import ii from "../images/images/avatar/ii.jpg";
import iii from "../images/images/avatar/iii.jpg";
import iv from "../images/images/avatar/iv.jpg";
import one from "../images/images/items/one.jpg";
import two from "../images/images/items/two.jpg";
import three from "../images/images/items/three.jpg";
import four from "../images/images/items/four.jpg";
import five from "../images/images/items/five.jpg";
import six from "../images/images/items/six.jpg";
import seven from "../images/images/items/seven.jpg";
import eight from "../images/images/items/eight.jpg";
import nine from "../images/images/items/nine.jpg";
import ten from "../images/images/items/ten.jpg";
import eleven from "../images/images/items/eleven.jpg";
import twelve from "../images/images/items/twelve.jpg";
import thirteen from "../images/images/items/thirteen.jpg";
import fourteen from "../images/images/items/fourteen.jpg";
import fifteen from "../images/images/items/fifteen.jpg";
import sixteen from "../images/images/items/sixteen.jpg";
import Loader from "./buttons&loaders/Loader";
import { flare } from "viem/chains";

const Home = ({
  banner,
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
  HASH,
  trending8,
  trending9,
  trending10,
  trending11,
  trending12,
  banners,
  trendingData,
}) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentBanner, setCurrentBanner] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (banners !== null) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000); // Change the time interval as needed
      setCurrentBanner(banners[currentBannerIndex]);
      return () => clearInterval(interval);
    }
  }, [banners.length]);
  console.log(banners)
  useEffect(() => {
    if (banners !== null) {
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
                  <div className="intro-btn mt-5">
                    <NavLink className="btn btn-primary" to="/explore">
                      Explore{" "}
                      <strong>
                        <BsArrowRight style={{ color: "white" }} />
                      </strong>
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* {
             currentBanner.map((item, index)=>{
               return(
                 <div>
                 {item.collectionName}
                 </div>
                 )
                })
              } */}{" "}
              <div className="col-xl-5 col-lg-6 col-12">
                {bannerisLoading ? (
                  <>
                    {open ? (
                      <>
                        <div className="intro-slider">
                          <div className="slider-item">
                            <img
                              src={banners[currentBannerIndex].bannerImageUrl}
                              alt=""
                              className="img-fluid"
                            />
                            <div className="slider-item-avatar">
                              <NavLink  to={`/collection/${banners[currentBannerIndex].collectionSlug}`}>
                                {" "}
                                <img
                                  src={banners[currentBannerIndex].imageUrl}
                                  alt=""
                                />{" "}
                              </NavLink>
                              {/* deal with the to in navlink */}
                              <div>
                                <h5>
                                  {banners[currentBannerIndex].collectionName}
                                </h5>
                                <p>
                                  Floor Price:{" "}
                                  {banners[currentBannerIndex].floorPrice} ETH
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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
              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card">
                  <img
                    className="img-fluid card-img-top"
                    src={banner1.bannerImageUrl}
                    alt=""
                  />
                  <div className="card-body">
                    <div className="notable-drops-content-img"></div>
                    <h4 className="card-title">{banner1.collectionName}</h4>
                    {/* <p>Make your offers before 12pm EST Nov 29th</p> */}
                    <NavLink to="/explore">
                      Explore
                      <BsArrowRight />
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card">
                  <img
                    className="img-fluid card-img-top"
                    src={banner2.bannerImageUrl}
                    alt=""
                  />
                  <div className="card-body">
                    <div className="notable-drops-content-img"></div>
                    <h4 className="card-title">{banner2.collectionName}</h4>
                    {/* <p>50 1/1's from Roger Allan Cleaves around the world</p> */}
                    <NavLink to="/explore">
                      Explore
                      <BsArrowRight />
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card">
                  <img
                    className="img-fluid card-img-top"
                    src={banner3.bannerImageUrl}
                    alt=""
                  />
                  <div className="card-body">
                    <div className="notable-drops-content-img"></div>
                    <h4 className="card-title">{banner3.collectionName}</h4>
                    {/* <p>A collection of 100 1/1 Extra Dimensional Beings</p> */}
                    <NavLink to="/explore">
                      Explore
                      <BsArrowRight />
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card">
                  <img
                    className="img-fluid card-img-top"
                    src={banner4.bannerImageUrl}
                    alt=""
                  />
                  <div className="card-body">
                    <div className="notable-drops-content-img"></div>
                    <h4 className="card-title">{banner4.collectionName}</h4>
                    {/* <p>A collection of 100 1/1 Extra Dimensional Beings</p> */}
                    <NavLink to="/explore">
                      Explore
                      <BsArrowRight />
                    </NavLink>
                  </div>
                </div>
              </div>
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
                    // console.log(data)
                    return (
                      <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <NavLink
                          className="top-collection-content d-block"
                          to={`/collection/${data.collectionSlug}`}
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <span className="top-img">
                                <img
                                  className="img-fluid"
                                  src={data.imageUrl}
                                  alt=""
                                  width="70"
                                />
                              </span>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h5>{data.collectionName}</h5>
                              <p className="text-muted">
                                {`Floor Price:  ${data.floorPrice} `}
                              </p>
                            </div>
                            {/* <h5 className="text-success">{trending3.floorPrice}</h5> */}
                          </div>
                        </NavLink>
                      </div>
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
                    // console.log(item)
                    return (
                      <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
                        <div className="card items">
                          <div className="card-body">
                            <div className="items-img position-relative">
                              <img
                                src={item.image.cachedUrl}
                                className="img-fluid rounded mb-3"
                                alt=""
                              />
                              <NavLink to={`/item/${item.contract.address}/${item.tokenId}`}>
                                <img
                                  className="creator"
                                  src={i}
                                  width="50"
                                  alt=""
                                />
                              </NavLink>
                            </div>
                            <NavLink to={`/item/${item.contract.address}/${item.tokenId}`}>
                              <h4 className="card-title">
                                {item.collection.name}
                              </h4>
                            </NavLink>
                            <p></p>
                            <div className="d-flex justify-content-between">
                              <div className="text-start">
                                <p className="mb-2"> TokenID:</p>
                              </div>
                              <div className="text-end">
                                <p className="mb-2">
                                  
                                  <strong className="text-primary">
                                    {item.tokenId}
                                  </strong>
                                </p>
                                <h5 className="text-muted">
                                
                                </h5>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                              <NavLink className="btn btn-primary"  to={`/item/${item.contract.address}/${item.tokenId}`}>
                                Place a Bid
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
              {/* 
              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card items">
                  <div className="card-body">
                    <div className="items-img position-relative">
                      <img
                        src={six}
                        className="img-fluid rounded mb-3"
                        alt=""
                      />
                      <NavLink to="/profile">
                        <img className="creator" src={ii} width="50" alt="" />
                      </NavLink>
                    </div>
                    <NavLink to="/item">
                      <h4 className="card-title">Liguid Wave</h4>
                    </NavLink>
                    <p></p>
                    <div className="d-flex justify-content-between">
                      <div className="text-start">
                        <p className="mb-2"> Auction</p>
                        <h5 className="text-muted">3h 1m 50s</h5>
                      </div>
                      <div className="text-end">
                        <p className="mb-2">
                          Bid:{" "}
                          <strong className="text-primary">0.55 ETH</strong>
                        </p>
                        <h5 className="text-muted"> 0.55 ETH</h5>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <NavLink className="btn btn-primary" to="/item">
                        Place a Bid
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card items">
                  <div className="card-body">
                    <div className="items-img position-relative">
                      <img
                        src={seven}
                        className="img-fluid rounded mb-3"
                        alt=""
                      />
                      <NavLink to="/profile">
                        <img className="creator" src={iii} width="50" alt="" />
                      </NavLink>
                    </div>
                    <NavLink to="/item">
                      <h4 className="card-title">Liguid Wave</h4>
                    </NavLink>
                    <p></p>
                    <div className="d-flex justify-content-between">
                      <div className="text-start">
                        <p className="mb-2"> Auction</p>
                        <h5 className="text-muted">3h 1m 50s</h5>
                      </div>
                      <div className="text-end">
                        <p className="mb-2">
                          Bid:{" "}
                          <strong className="text-primary">0.55 ETH</strong>
                        </p>
                        <h5 className="text-muted"> 0.55 ETH</h5>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <NavLink className="btn btn-primary" to="/item">
                        Place a Bid
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card items">
                  <div className="card-body">
                    <div className="items-img position-relative">
                      <img
                        src={eight}
                        className="img-fluid rounded mb-3"
                        alt=""
                      />
                      <NavLink to="/profile">
                        <img className="creator" src={iv} width="50" alt="" />
                      </NavLink>
                    </div>
                    <NavLink to="/item">
                      <h4 className="card-title">Liguid Wave</h4>
                    </NavLink>
                    <p></p>
                    <div className="d-flex justify-content-between">
                      <div className="text-start">
                        <p className="mb-2"> Auction</p>
                        <h5 className="text-muted">3h 1m 50s</h5>
                      </div>
                      <div className="text-end">
                        <p className="mb-2">
                          Bid:{" "}
                          <strong className="text-primary">0.55 ETH</strong>
                        </p>
                        <h5 className="text-muted"> 0.55 ETH</h5>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <NavLink className="btn btn-primary" to="/item">
                        Place a Bid
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div> */}
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
                    <NavLink to="/explore">
                      Explore
                      <BsArrowRight />
                    </NavLink>
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
                    <NavLink to="/explore">
                      Explore
                      <BsArrowRight />
                    </NavLink>
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
                    <NavLink to="/explore">
                      Explore
                      <BsArrowRight />
                    </NavLink>
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
                    <NavLink to="/explore">
                      Explore
                      <BsArrowRight />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="browse-category section-padding border-top">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8">
                <div className="section-title text-center">
                  <h2>Browse by category</h2>
                  <p>
                    Here are a few reasons why you should choose Digital Eden
                  </p>
                </div>
              </div>
            </div>
            {categoriesLoading ? (
              <>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="card browse-cat">
                      <img
                        className="img-fluid card-img-top"
                        src={categories[0].bannerImageUrl}
                        alt=""
                      />
                      <div className="card-body">
                        <h4>Music</h4>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="card browse-cat">
                      <img
                        className="img-fluid card-img-top"
                        src={categories[1].bannerImageUrl}
                        alt=""
                      />
                      <div className="card-body">
                        <h4>Gaming</h4>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="card browse-cat">
                      <img
                        className="img-fluid card-img-top"
                        src={categories[2].bannerImageUrl}
                        alt=""
                      />
                      <div className="card-body">
                        <h4>Photographgy</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="card browse-cat">
                      <img
                        className="img-fluid card-img-top"
                        src={categories[3].bannerImageUrl}
                        alt=""
                      />
                      <div className="card-body">
                        <h4>Art</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Loader />
              </>
            )}
          </div>
        </div>

      
      </div>
    </>
  );
};

export default Home;
