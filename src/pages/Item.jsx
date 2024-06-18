import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import Loader from "./buttons&loaders/Loader";
import { ethers } from "ethers";
import "./ss.css";
const Item = ({ API, HASH }) => {
  const { contractAddress, tokenId } = useParams();
  const [nftOwner, setNftOwner] = useState([]);
  const [currentNft, setCurrentNft] = useState([]);
  const [currentNftLoading, setCurrentNftLoading] = useState("");
  const [traitstab, setTraitstab] = useState(false);
  const [traitsdetails, setTraitsdetails] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isdetailsExpanded, setIsdetailsExpanded] = useState(false);
  const [islistingExpanded, setIslistingExpanded] = useState(false);
  const [isOfferExpanded, setIsOfferExpanded] = useState(false);
  const [transData, setTransData] = useState([]);
  const [transData2, setTransData2] = useState([]);
  const [isFetchdata, setIsFetchdata] = useState(false);
  const [nftsdetails, setNftsdetails] = useState([]);
  const [nftsListings, setNftsListings] = useState([]);
  const [noNftsListings, setNoNftsListings] = useState(false);
  const [currentOffer, setCurrentOffer] = useState([]);
  const [expirationDate, setExpirationDate] = useState([]);
  const [weiValue, setWeiValue] = useState(0);
  const [eth, setEth] = useState(0);
  const [currentPriceValue, setCurrentPriceValue] = useState("");
  const [currentDateValue, setCurrentDateValue] = useState("");
  const [currentTimeValue, setCurrentTimeValue] = useState("");

  // console.log(contractAddress, tokenId);
  useEffect(() => {
    async function fetchSpecificNftData() {
      setCurrentNftLoading(false);
      setCurrentNft([]);
      const response1 = await fetchSpecificNftMetaData(
        contractAddress,
        tokenId
      );
      const response2 = await fetchNftOwner(contractAddress, tokenId);
      // const response3 = await fetchBids(contractAddress, tokenId)
      // console.log("bids", response3)
      setCurrentNft([response1]);
      // console.log(response1);
      setTraitsdetails(response1.raw.metadata.attributes);
      if (response1) {
        // console.log(response1);
      }
      setNftOwner([response2]);
      setCurrentNftLoading(true);
      // console.log(nftOwner);
    }

    fetchSpecificNftData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
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
          `https://api.simplehash.com/api/v0/nfts/ethereum/${contractAddress}/${tokenId}`,
          options
        );
        // console.log("requested");
        const data = await response.json();
        // console.log(data);
        setNftsdetails(data);
        // console.log(nftsdetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  let Pricey;
  let PriceValues;

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: { accept: "application/json", "X-API-KEY": HASH },
      };
      try {
        setIsFetchdata(false);
        // const response = await fetch(
        //   `/api/getNftListing/ethereum/${contractAddress}/${tokenId}`,
        //   {
        //     headers: {
        //       Accept: "application/json",
        //     },
        //   }
        //   // `http://localhost:3000/getNftListing/ethereum/${contractAddress}/${tokenId}`
        // );
        const response = await fetch(
          `https://api.simplehash.com/api/v0/nfts/listings/ethereum/${contractAddress}/${tokenId}?marketplaces=opensea&order_by=listing_timestamp_desc&limit=50`,
          options
        );
        const data = await response.json();
        // console.log(data)
        if (data.listings.length === 0) {
          console.log(data.listings.length);
          setNoNftsListings(true);
        } else {
          setNoNftsListings(false);
          // console.log("first")
          setNftsListings(data.listings);
          await setCurrentOffer(data.listings[0]);
          Pricey = data.listings[0].price;
          const weiStringValue = Pricey.toString();
          const etherValue = ethers.utils.formatEther(weiStringValue);
          PriceValues = etherValue;
          await setCurrentPriceValue(etherValue);
          const timestamp = data.listings[0].expiration_timestamp;
          const date = new Date(timestamp);
          const localDateString = date.toLocaleDateString();
          const localTimeString = date.toLocaleTimeString();
          await setCurrentTimeValue(localTimeString);
          await setCurrentDateValue(localDateString);
        }
        setIsFetchdata(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function ret() {
      if (nftsListings) {
        await setWeiValue(nftsListings[0].price);
        const weiStringValue = weiValue.toString();
        const etherValue = ethers.utils.formatEther(weiStringValue);
        setEth(etherValue);
        // console.log(etherValue);
      } else {
      }
    }
    ret();
    // const etherValue = ethers.utils.formatEther(nftsListings[0].price);
  }, [nftsListings]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: { accept: "application/json", "X-API-KEY": HASH },
      };
      try {
        setIsFetchdata(false);
        // const response = await fetch(
        //   `/api/getNftTrans/ethereum/${contractAddress}/${tokenId}`,
        //   {
        //     headers: {
        //       Accept: "application/json",
        //     },
        //   }
        //   // `http://localhost:3000/getNftTrans/ethereum/${contractAddress}/${tokenId}`
        // );
        const response = await fetch(
          `https://api.simplehash.com/api/v0/nfts/transfers/ethereum/${contractAddress}/${tokenId}?order_by=timestamp_desc&limit=100`,
          options
        );
        const data = await response.json();
        // console.log(data)
        setTransData(data.transfers);
        // setIsFetchdata(true);
        // console.log(data);
        // console.log(nftsListings[0].price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  let nftconshort1 = contractAddress.slice(0, 5);
  let nftconshort2 = contractAddress.slice(38);

  // console.log(nftconshort1)

  async function fetchSpecificNftMetaData(contractAddress, tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    try {
      const response = await fetch(
        `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenIds}&refreshCache=false`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async function fetchNftOwner(contractAddress, tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    try {
      const response = await fetch(
        `https://eth-mainnet.g.alchemy.com/nft/v3/${API}/getOwnersForNFT?contractAddress=${contractAddress}&tokenId=${tokenIds}&refreshCache=false`,
        options
      );
      const data = await response.json();
      return data;
      console.log(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  // console.log(nftsdetails)
  function tuner() {
    setTraitstab(!traitstab);
  }
  // console.log(traitstab);

  const handleBodyClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDetailsClick = () => {
    setIsdetailsExpanded(!isdetailsExpanded);
  };
  const handlelistingClick = () => {
    setIslistingExpanded(!islistingExpanded);
  };
  const handleOfferClick = () => {
    setIsOfferExpanded(!isOfferExpanded);
  };
  return (
    <>
      <div className="home initDisplay" id="main-wrapper">
        {currentNftLoading ? (
          <>
            {currentNft.map((item, index) => {
              // console.log(item);
              // console.log(item.raw.metadata.attributes);
              const deployerLink = item.contract.contractDeployer;
              let deployer1 = item.contract.contractDeployer.slice(0, 5);
              let deployer2 = item.contract.contractDeployer.slice(38);

              return (
                <>
                  <div className="item-single section-padding" key={index}>
                    <div className="container">
                      <div className="row">
                        <div className="col-xxl-12">
                          <div className="top-bid">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="Desktop modi">
                                    <h5 className="mb-3">
                                      <Link
                                        to={`/collection/${item.contract.openSeaMetadata.collectionSlug}`}
                                      >
                                        {" "}
                                        {
                                          item.contract.openSeaMetadata
                                            .collectionName
                                        }{" "}
                                      </Link>
                                    </h5>
                                    <h3 className="mb-3"> {item.name} </h3>
                                    <div className="d-flex align-items-center mb-3">
                                      <div className="flex-grow-1">
                                        <div className="nfttitle">
                                          <h6 className="mb-0">Owner</h6>
                                          {nftOwner.map((owner, indexes) => {
                                            // console.log(owner)
                                            let owner1 = owner.owners[0].slice(
                                              0,
                                              5
                                            );
                                            let owner2 =
                                              owner.owners[0].slice(38);
                                            // console.log(owner1)
                                            return (
                                              <>
                                                <h5
                                                  className="mb-0"
                                                  key={indexes}
                                                >
                                                  <Link
                                                    to={`https://etherscan.io/address/${owner.owners[0]}`}
                                                  >
                                                    {owner1}...{owner2}
                                                  </Link>
                                                </h5>
                                              </>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item2">
                                    <img
                                      src={item.image.cachedUrl}
                                      className="img-fluid rounded"
                                      alt="..."
                                    />
                                  </div>
                                  <div>
                                    <div className="Desktop">
                                      <div className="offerbox">
                                        {/* {nftsListings[0].map((offerdata, offerIndex) =>{
                                      console.log(offerdata)
                                    })} */}
                                        <div>
                                          <h5>Current Price</h5>
                                        </div>
                                        {noNftsListings ? (
                                          <>
                                            {" "}
                                            <div className="noData">
                                              <h1>No Data</h1>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <div>
                                              <h1>{currentPriceValue} ETH</h1>
                                            </div>
                                            <div>
                                              {/* <button> */}
                                              <h4>
                                                Expires by : {currentTimeValue}{" "}
                                                {currentDateValue}{" "}
                                              </h4>
                                              {/* </button> */}
                                            </div>
                                          </>
                                        )}
                                      </div>

                                      <div className="offerbox">
                                        <div
                                          className="Listingheader"
                                          onClick={handlelistingClick}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <h4>Listings</h4>
                                        </div>
                                        <div
                                          className={`listingdropdown ${
                                            islistingExpanded ? "expanded" : ""
                                          }`}
                                        >
                                          {islistingExpanded && (
                                            <>
                                              {noNftsListings ? (
                                                <>
                                                  <div className="noData">
                                                    <h1>No Data</h1>
                                                  </div>
                                                </>
                                              ) : (
                                                <>
                                                  <hr />

                                                  <div className="detailsContainer">
                                                    <table className="table-container">
                                                      <thead>
                                                        <tr>
                                                          <th>From</th>
                                                          <th>Price</th>
                                                          {/* <th>In USD</th> */}
                                                          <th>Expiration</th>
                                                          <th>Quantity</th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        {nftsListings.map(
                                                          (data, indexes) => {
                                                            // console.log(data);
                                                            const timestamp =
                                                              data.expiration_timestamp;
                                                            const date =
                                                              new Date(
                                                                timestamp
                                                              );

                                                            // Get the local date string
                                                            const localDateString =
                                                              date.toLocaleDateString();

                                                            // Get the local time string
                                                            const localTimeString =
                                                              date.toLocaleTimeString();

                                                            let sellerAddy1 =
                                                              data.seller_address.slice(
                                                                0,
                                                                5
                                                              );
                                                            let sellerAddy2 =
                                                              data.seller_address.slice(
                                                                38
                                                              );
                                                            let ListingPrice;
                                                            let ListingPriceValues;
                                                            let ethh;
                                                            if (data.price) {
                                                              ListingPrice =
                                                                data.price;

                                                              const weiStringValue =
                                                                ListingPrice.toString();
                                                              const etherValue =
                                                                ethers.utils.formatEther(
                                                                  weiStringValue
                                                                );

                                                              ListingPriceValues =
                                                                etherValue;
                                                              ethh = "ETH";
                                                            }
                                                            return (
                                                              <>
                                                                <tr>
                                                                  <td>
                                                                    {
                                                                      sellerAddy1
                                                                    }
                                                                    ...
                                                                    {
                                                                      sellerAddy2
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      ListingPriceValues
                                                                    }{" "}
                                                                    ETH
                                                                  </td>
                                                                  <td>
                                                                    {localDateString +
                                                                      " " +
                                                                      localTimeString}
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      data.quantity
                                                                    }
                                                                  </td>
                                                                </tr>
                                                              </>
                                                            );
                                                          }
                                                        )}
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                </>
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </div>

                                      <div className="d-flex Ender">
                                        <a
                                          href={`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`}
                                        >
                                          <button className="btn btn-primary">
                                            View on OpenSea
                                          </button>
                                        </a>
                                        {/* <NavLink to='' className='btn btn-primary'>Place a Bid</NavLink> */}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="boxbelowimage item1">
                                    <div className="descriptionbox">
                                      <div className="topdesc">
                                        <h4>Description</h4>
                                      </div>
                                      <hr />
                                      <p className="mb-3">
                                        {
                                          item.contract.openSeaMetadata
                                            .description
                                        }
                                      </p>
                                    </div>
                                    <div className="traitssection">
                                      <div
                                        className="topdesc"
                                        onClick={handleBodyClick}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <h4>
                                          Traits
                                          <RiArrowRightSLine />
                                        </h4>
                                      </div>

                                      <div
                                        className={`traitsdropdown ${
                                          isExpanded ? "expanded" : ""
                                        }`}
                                      >
                                        {isExpanded && (
                                          <>
                                            <hr />
                                            <div className="bid mb-3 card">
                                              <div className="activity-content card-body py-0">
                                                <ul className="splitdisplay">
                                                  {traitsdetails.map(
                                                    (details, detailsindex) => {
                                                      // console.log(details);
                                                      return (
                                                        <>
                                                          <li
                                                            className="d-flex justify-content-between align-items-center split"
                                                            key={detailsindex}
                                                          >
                                                            <div className="activity-info text-center">
                                                              <h5 className="mb-0">
                                                                {
                                                                  details.trait_type
                                                                }
                                                              </h5>
                                                              {/* <p>0.05 ETH</p> */}
                                                            </div>

                                                            <div className="text-center">
                                                              <span className="text-muted">
                                                                {details.value}
                                                              </span>
                                                            </div>
                                                          </li>
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </ul>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div className="detailssection">
                                      <div
                                        className="topdesc"
                                        onClick={handleDetailsClick}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <h4>
                                          Details
                                          <RiArrowRightSLine />
                                        </h4>
                                      </div>
                                      <div
                                        className={`detailsdropdown ${
                                          isdetailsExpanded ? "expanded" : ""
                                        }`}
                                      >
                                        {isdetailsExpanded && (
                                          <>
                                            <hr />
                                            <div className="detailsContainer">
                                              <div className="detailsItem">
                                                <span>Contract Address</span>
                                                <span>
                                                  <Link
                                                    to={`https://etherscan.io/address/${contractAddress}`}
                                                  >
                                                    {nftconshort1}...
                                                    {nftconshort2}
                                                  </Link>
                                                </span>
                                              </div>
                                              <div className="detailsItem">
                                                <span>Token Id</span>
                                                <span>
                                                  {nftsdetails.token_id}
                                                </span>
                                              </div>
                                              <div className="detailsItem">
                                                <span>Token Standard</span>
                                                <span>
                                                  {nftsdetails.contract.type}
                                                </span>
                                              </div>
                                              <div className="detailsItem">
                                                <span>Chain</span>
                                                <span
                                                  style={{
                                                    textTransform: "capitalize",
                                                  }}
                                                >
                                                  {nftsdetails.chain}
                                                </span>
                                              </div>
                                              <div className="detailsItem">
                                                <span>Deployer</span>
                                                <span>
                                                  <Link
                                                    to={`https://etherscan.io/address/${item.contract.contractDeployer}`}
                                                  >
                                                    {deployer1}...{deployer2}
                                                  </Link>
                                                </span>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* <div
                                    className="flex-grow-1"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-end",
                                    }}
                                  >
                                    <h6 className="mb-0">Deployer</h6>
                                    <h5 className="mb-0">
                                      <Link
                                        to={`https://etherscan.io/address/${item.contract.contractDeployer}`}
                                      >
                                        {deployer1}...{deployer2}
                                      </Link>
                                    </h5>
                                  </div> */}
                                </div>

                                <div className="col-md-6 mobile">
                                  <h5 className="mb-3">
                                    <Link
                                      to={`/collection/${item.contract.openSeaMetadata.collectionSlug}`}
                                    >
                                      {" "}
                                      {
                                        item.contract.openSeaMetadata
                                          .collectionName
                                      }{" "}
                                    </Link>
                                  </h5>
                                  <h3 className="mb-3"> {item.name} </h3>
                                  <div className="d-flex align-items-center mb-3">
                                    <div className="flex-grow-1">
                                      <div className="nfttitle">
                                        <h6 className="mb-0">Owner</h6>
                                        {nftOwner.map((owner, indexes) => {
                                          // console.log(owner)
                                          let owner1 = owner.owners[0].slice(
                                            0,
                                            5
                                          );
                                          let owner2 =
                                            owner.owners[0].slice(38);
                                          // console.log(owner1)
                                          return (
                                            <>
                                              <h5
                                                className="mb-0"
                                                key={indexes}
                                              >
                                                <Link
                                                  to={`https://etherscan.io/address/${owner.owners[0]}`}
                                                >
                                                  {owner1}...{owner2}
                                                </Link>
                                              </h5>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="offerbox">
                                    {/* {nftsListings[0].map((offerdata, offerIndex) =>{
                                      console.log(offerdata)
                                    })} */}
                                    <div>
                                      <h5>Current Price</h5>
                                    </div>
                                    {noNftsListings ? (
                                      <>
                                        {" "}
                                        <div className="noData">
                                          <h1>No Data</h1>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div>
                                          <h1>{currentPriceValue} ETH</h1>
                                        </div>
                                        <div>
                                          {/* <button> */}
                                          <h4>
                                            Expires by : {currentTimeValue}{" "}
                                            {currentDateValue}{" "}
                                          </h4>
                                          {/* </button> */}
                                        </div>
                                      </>
                                    )}
                                  </div>

                                  <div className="offerbox">
                                    <div
                                      className="Listingheader"
                                      onClick={handlelistingClick}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <h4>Listings</h4>
                                    </div>
                                    <div
                                      className={`listingdropdown ${
                                        islistingExpanded ? "expanded" : ""
                                      }`}
                                    >
                                      {islistingExpanded && (
                                        <>
                                          {noNftsListings ? (
                                            <>
                                              <div className="noData">
                                                <h1>No Data</h1>
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <hr />

                                              <div className="detailsContainer">
                                                <table className="table-container">
                                                  <thead>
                                                    <tr>
                                                      <th>From</th>
                                                      <th>Price</th>
                                                      {/* <th>In USD</th> */}
                                                      <th>Expiration</th>
                                                      <th>Quantity</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {nftsListings.map(
                                                      (data, indexes) => {
                                                        // console.log(data);
                                                        const timestamp =
                                                          data.expiration_timestamp;
                                                        const date = new Date(
                                                          timestamp
                                                        );

                                                        // Get the local date string
                                                        const localDateString =
                                                          date.toLocaleDateString();

                                                        // Get the local time string
                                                        const localTimeString =
                                                          date.toLocaleTimeString();

                                                        let sellerAddy1 =
                                                          data.seller_address.slice(
                                                            0,
                                                            5
                                                          );
                                                        let sellerAddy2 =
                                                          data.seller_address.slice(
                                                            38
                                                          );
                                                        let ListingPrice;
                                                        let ListingPriceValues;
                                                        let ethh;
                                                        if (data.price) {
                                                          ListingPrice =
                                                            data.price;

                                                          const weiStringValue =
                                                            ListingPrice.toString();
                                                          const etherValue =
                                                            ethers.utils.formatEther(
                                                              weiStringValue
                                                            );

                                                          ListingPriceValues =
                                                            etherValue;
                                                          ethh = "ETH";
                                                        }
                                                        return (
                                                          <>
                                                            <tr>
                                                              <td>
                                                                {sellerAddy1}...
                                                                {sellerAddy2}
                                                              </td>
                                                              <td>
                                                                {
                                                                  ListingPriceValues
                                                                }{" "}
                                                                ETH
                                                              </td>
                                                              <td>
                                                                {localDateString +
                                                                  " " +
                                                                  localTimeString}
                                                              </td>
                                                              <td>
                                                                {data.quantity}
                                                              </td>
                                                            </tr>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  <div className="d-flex Ender">
                                    <a
                                      href={`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`}
                                    >
                                      <button className="btn btn-primary">
                                        View on OpenSea
                                      </button>
                                    </a>
                                    {/* <NavLink to='' className='btn btn-primary'>Place a Bid</NavLink> */}
                                  </div>
                                </div>

                                <div className="offerbox">
                                  <div
                                    className="Listingheader"
                                    onClick={handleOfferClick}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <h4>Activity</h4>
                                  </div>
                                  <div
                                    className={`listingdropdown ${
                                      isOfferExpanded ? "expanded" : ""
                                    }`}
                                  >
                                    {isOfferExpanded && (
                                      <>
                                        <div className="detailsContainer">
                                          <table className="table-container">
                                            <thead>
                                              <tr>
                                                <th>Event</th>
                                                <th>Price</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Date</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {transData.map(
                                                (data, indexes) => {
                                                  const timestamp =
                                                    data.timestamp;

                                                  // Create a new Date object using the timestamp
                                                  const date = new Date(
                                                    timestamp
                                                  );

                                                  // Get the local date string
                                                  const localDateString =
                                                    date.toLocaleDateString();

                                                  // Get the local time string
                                                  const localTimeString =
                                                    date.toLocaleTimeString();
                                                  let FromAddy1;
                                                  let FromAddy2;
                                                  let Spacer;
                                                  if (data.from_address) {
                                                    FromAddy1 =
                                                      data.from_address.slice(
                                                        0,
                                                        5
                                                      );

                                                    FromAddy2 =
                                                      data.from_address.slice(
                                                        38
                                                      );
                                                    Spacer = "...";
                                                  }
                                                  let ToAddy1;
                                                  let ToAddy2;
                                                  if (data.to_address) {
                                                    ToAddy1 =
                                                      data.to_address.slice(
                                                        0,
                                                        5
                                                      );

                                                    ToAddy2 =
                                                      data.to_address.slice(38);
                                                  }
                                                  let Price;
                                                  let etherValues;
                                                  let ethhy;
                                                  if (
                                                    data.sale_details !== null
                                                  ) {
                                                    Price =
                                                      data.sale_details
                                                        .total_price;

                                                    const weiStringValue =
                                                      Price.toString();
                                                    const etherValue =
                                                      ethers.utils.formatEther(
                                                        weiStringValue
                                                      );
                                                    // setEth(etherValue);
                                                    // console.log(etherValue);
                                                    etherValues = etherValue;
                                                    ethhy = "ETH";
                                                  }

                                                  return (
                                                    <>
                                                      <tr key={indexes}>
                                                        <td>
                                                          {data.event_type}
                                                        </td>
                                                        <td>
                                                          {etherValues} {ethhy}
                                                        </td>
                                                        <td>
                                                          <Link
                                                            to={`https://etherscan.io/address/${data.from_address}`}
                                                          >
                                                            {FromAddy1}
                                                            {Spacer}
                                                            {FromAddy2}
                                                          </Link>
                                                        </td>
                                                        <td>
                                                          <Link
                                                            to={`https://etherscan.io/address/${data.from_address}`}
                                                          >
                                                            {ToAddy1}...
                                                            {ToAddy2}
                                                          </Link>
                                                        </td>
                                                        <td>
                                                          {localDateString +
                                                            " " +
                                                            localTimeString}
                                                        </td>
                                                      </tr>
                                                    </>
                                                  );
                                                }
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <div className="fullPageLoader">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default Item;
