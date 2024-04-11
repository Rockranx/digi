import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsFacebook, BsYoutube, BsLinkedin, BsTwitter } from "react-icons/bs";
import logo from "../images/images/logo.png";
import logow from "../images/images/logow.png";
import i from "../images/images/avatar/i.jpg";
import logoh from "../images/images/logoh.png";
import { useChainId } from "wagmi";
const Explore = ({ userAddress, HASH }) => {
  const [userNFTdata, setUserNFTdata] = useState([]);
  const [httpsreq, setHttpsreq] = useState("");
  const chainid = useChainId();
  // console.log(chainid)
  useEffect(() => {
    if (chainid === 1) {
      setHttpsreq("https://eth-mainnet.g.alchemy.com");
    } else if (chainid === 137) {
      setHttpsreq("https://polygon-mainnet.g.alchemy.com");
    } else if (chainid === 5) {
      setHttpsreq("https://eth-goerli.g.alchemy.com");
    } else if (chainid === 11155111) {
      setHttpsreq("https://eth-sepolia.g.alchemy.com");
    }
  }, [chainid]);
  useEffect(() => {
    async function getter() {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      try {
        await fetch(
          // `https://eth-sepolia.g.alchemy.com/nft/v3/qVIMc5ET2Pht7xiaTPgO5gbOcfpCovLm/getNFTsForOwner?owner=${userAddress}`,
          // `https://eth-sepolia.g.alchemy.com/nft/v3/qVIMc5ET2Pht7xiaTPgO5gbOcfpCovLm/getNFTsForOwner?owner=${userAddress}`,
          // `https://eth-sepolia.g.alchemy.com/nft/v3/qVIMc5ET2Pht7xiaTPgO5gbOcfpCovLm/getNFTsForOwner?owner=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&withMetadata=true&pageSize=100`,
          `${httpsreq}/v2/qVIMc5ET2Pht7xiaTPgO5gbOcfpCovLm/getNFTsForOwner?owner=${userAddress}&withMetadata=true&pageSize=100`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            setUserNFTdata(response.ownedNfts);
            // console.log(userNFTdata);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
      // console.log(response)
    }
    getter();
  }, [httpsreq]);
  return (
    <>
      <div className="home" id="main-wrapper">
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
                      {/* <NavLink className="btn btn-primary" to="/signin">Sign in</NavLink> */}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="explore section-padding">
          <div className="container">
            <div className="row">
              <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-3">
                <div className="filter-sidebar">
                  <div className="filter-sidebar-content">
                    <h5>Status</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault1"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault1"
                      >
                        Recently Listed
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault2"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault2"
                      >
                        Price: Low to High
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault3"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault3"
                      >
                        Price: High to Low
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault4"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault4"
                      >
                        Alphabetical
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-10 col-xl-9 col-lg-9 col-md-9">
                <div className="row">
                  {userNFTdata.map((nftsdata, index) => {
                    const NftConAddy1 = nftsdata.contract.address.slice(0, 4);
                    const NftConAddy2 = nftsdata.contract.address.slice(38, 42);
                    return (
                      <>
                        <div
                          key={index}
                          className="col-xxl-4 col-xl-4 col-lg-6 col-md-6"
                        >
                          <div className="card items">
                            <div className="card-body">
                              <div className="items-img position-relative">
                                <img
                                  className="img-fluid rounded mb-3"
                                  src={nftsdata.metadata.image}
                                  alt=""
                                />
                                <NavLink to="/profile">
                                  <img className="creator" src={i} alt="" />
                                </NavLink>
                              </div>
                              <NavLink to="/item">
                                <h4 className="card-title">
                                  {nftsdata.contractMetadata.name}
                                </h4>
                              </NavLink>
                              <p></p>
                              <div className="d-flex justify-content-between">
                                <div className="text-start">
                                  <p className="mb-2">Auction</p>
                                  <h5 className="text-muted">
                                    {nftsdata.contractMetadata.tokenType}
                                  </h5>
                                </div>
                                <div className="text-end">
                                  <p className="mb-2">
                                    Bid :{" "}
                                    <strong className="text-primary">
                                      0.55 ETH
                                    </strong>
                                  </p>
                                  <h5 className="text-muted">
                                    {" "}
                                    {NftConAddy1}....{NftConAddy2}{" "}
                                  </h5>
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
                      </>
                    );
                  })}

                  {/* <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                    <div className="card items">
                      <div className="card-body">
                        <div className="items-img position-relative">
                          <img
                            className="img-fluid rounded mb-3"
                            src={two}
                            alt=""
                          />
                          <NavLink to="/profile">
                            <img className="creator" src={ii} alt="" />
                          </NavLink>
                        </div>
                        <NavLink to="/item">
                          <h4 className="card-title">Liguid Wave</h4>
                        </NavLink>
                        <p></p>
                        <div className="d-flex justify-content-between">
                          <div className="text-start">
                            <p className="mb-2">Auction</p>
                            <h5 className="text-muted"> 3h 1m 50s</h5>
                          </div>
                          <div className="text-end">
                            <p className="mb-2">
                              Bid :{" "}
                              <strong className="text-primary">0.55 ETH</strong>
                            </p>
                            <h5 className="text-muted"> 0.55ETH</h5>
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

                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                    <div className="card items">
                      <div className="card-body">
                        <div className="items-img position-relative">
                          <img
                            className="img-fluid rounded mb-3"
                            src={three}
                            alt=""
                          />
                          <NavLink to="/profile">
                            <img className="creator" src={iii} alt="" />
                          </NavLink>
                        </div>
                        <NavLink to="/item">
                          <h4 className="card-title">Liguid Wave</h4>
                        </NavLink>
                        <p></p>
                        <div className="d-flex justify-content-between">
                          <div className="text-start">
                            <p className="mb-2">Auction</p>
                            <h5 className="text-muted"> 3h 1m 50s</h5>
                          </div>
                          <div className="text-end">
                            <p className="mb-2">
                              Bid :{" "}
                              <strong className="text-primary">0.55 ETH</strong>
                            </p>
                            <h5 className="text-muted"> 0.55ETH</h5>
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

                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                    <div className="card items">
                      <div className="card-body">
                        <div className="items-img position-relative">
                          <img
                            className="img-fluid rounded mb-3"
                            src={four}
                            alt=""
                          />
                          <NavLink to="/profile">
                            <img className="creator" src={iv} alt="" />
                          </NavLink>
                        </div>
                        <NavLink to="/item">
                          <h4 className="card-title">Liguid Wave</h4>
                        </NavLink>
                        <p></p>
                        <div className="d-flex justify-content-between">
                          <div className="text-start">
                            <p className="mb-2">Auction</p>
                            <h5 className="text-muted"> 3h 1m 50s</h5>
                          </div>
                          <div className="text-end">
                            <p className="mb-2">
                              Bid :{" "}
                              <strong className="text-primary">0.55 ETH</strong>
                            </p>
                            <h5 className="text-muted"> 0.55ETH</h5>
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

                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                    <div className="card items">
                      <div className="card-body">
                        <div className="items-img position-relative">
                          <img
                            className="img-fluid rounded mb-3"
                            src={five}
                            alt=""
                          />
                          <NavLink to="/profile">
                            <img className="creator" src={v} alt="" />
                          </NavLink>
                        </div>
                        <NavLink to="/item">
                          <h4 className="card-title">Liguid Wave</h4>
                        </NavLink>
                        <p></p>
                        <div className="d-flex justify-content-between">
                          <div className="text-start">
                            <p className="mb-2">Auction</p>
                            <h5 className="text-muted"> 3h 1m 50s</h5>
                          </div>
                          <div className="text-end">
                            <p className="mb-2">
                              Bid :{" "}
                              <strong className="text-primary">0.55 ETH</strong>
                            </p>
                            <h5 className="text-muted"> 0.55ETH</h5>
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

                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                    <div className="card items">
                      <div className="card-body">
                        <div className="items-img position-relative">
                          <img
                            className="img-fluid rounded mb-3"
                            src={six}
                            alt=""
                          />
                          <NavLink to="/profile">
                            <img className="creator" src={vi} alt="" />
                          </NavLink>
                        </div>
                        <NavLink to="/item">
                          <h4 className="card-title">Liguid Wave</h4>
                        </NavLink>
                        <p></p>
                        <div className="d-flex justify-content-between">
                          <div className="text-start">
                            <p className="mb-2">Auction</p>
                            <h5 className="text-muted"> 3h 1m 50s</h5>
                          </div>
                          <div className="text-end">
                            <p className="mb-2">
                              Bid :{" "}
                              <strong className="text-primary">0.55 ETH</strong>
                            </p>
                            <h5 className="text-muted"> 0.55ETH</h5>
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

                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                    <div className="card items">
                      <div className="card-body">
                        <div className="items-img position-relative">
                          <img
                            className="img-fluid rounded mb-3"
                            src={seven}
                            alt=""
                          />
                          <NavLink to="/profile">
                            <img className="creator" src={vii} alt="" />
                          </NavLink>
                        </div>
                        <NavLink to="/item">
                          <h4 className="card-title">Liguid Wave</h4>
                        </NavLink>
                        <p></p>
                        <div className="d-flex justify-content-between">
                          <div className="text-start">
                            <p className="mb-2">Auction</p>
                            <h5 className="text-muted"> 3h 1m 50s</h5>
                          </div>
                          <div className="text-end">
                            <p className="mb-2">
                              Bid :{" "}
                              <strong className="text-primary">0.55 ETH</strong>
                            </p>
                            <h5 className="text-muted"> 0.55ETH</h5>
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

                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                    <div className="card items">
                      <div className="card-body">
                        <div className="items-img position-relative">
                          <img
                            className="img-fluid rounded mb-3"
                            src={eight}
                            alt=""
                          />
                          <NavLink to="/profile">
                            <img className="creator" src={viii} alt="" />
                          </NavLink>
                        </div>
                        <NavLink to="/item">
                          <h4 className="card-title">Liguid Wave</h4>
                        </NavLink>
                        <p></p>
                        <div className="d-flex justify-content-between">
                          <div className="text-start">
                            <p className="mb-2">Auction</p>
                            <h5 className="text-muted"> 3h 1m 50s</h5>
                          </div>
                          <div className="text-end">
                            <p className="mb-2">
                              Bid :{" "}
                              <strong className="text-primary">0.55 ETH</strong>
                            </p>
                            <h5 className="text-muted"> 0.55ETH</h5>
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

                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                    <div className="card items">
                      <div className="card-body">
                        <div className="items-img position-relative">
                          <img
                            className="img-fluid rounded mb-3"
                            src={nine}
                            alt=""
                          />
                          <NavLink to="/profile">
                            <img className="creator" src={ix} alt="" />
                          </NavLink>
                        </div>
                        <NavLink to="/item">
                          <h4 className="card-title">Liguid Wave</h4>
                        </NavLink>
                        <p></p>
                        <div className="d-flex justify-content-between">
                          <div className="text-start">
                            <p className="mb-2">Auction</p>
                            <h5 className="text-muted"> 3h 1m 50s</h5>
                          </div>
                          <div className="text-end">
                            <p className="mb-2">
                              Bid :{" "}
                              <strong className="text-primary">0.55 ETH</strong>
                            </p>
                            <h5 className="text-muted"> 0.55ETH</h5>
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
          </div>
        </div>

     
      </div>
    </>
  );
};

export default Explore;
