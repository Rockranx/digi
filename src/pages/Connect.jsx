import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/images/logo.png";
import logow from "../images/images/logow.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeButton from "./buttons&loaders/ThemeButton";

const Connect = ({myFunction}) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [Accountaddress1, setAccountaddress1] = useState("");
  const [Accountaddress2, setAccountaddress2] = useState("");
  

  return (
    <div>
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
                  {/* <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                                
                            </button> */}
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
                    {/* <div
                      className="dark-light-toggle theme-switch"
                      // onClick={themeToggle()}
                    >
                      <span className="dark">
                        <i className="ri-moon-line"></i>
                      </span>
                      <span className="light">
                        <i className="ri-sun-line"></i>
                      </span>
                    </div> */}
                  <div className="sharer">

                    {!currentAccount ? (
                      <ConnectButton.Custom>
                        {({
                          account,
                          chain,
                          openAccountModal,
                          openChainModal,
                          openConnectModal,
                          authenticationStatus,
                          mounted,
                        }) => {
                          if (account) {
                            // console.log(account);
                            setAccountaddress1(account.address.slice(0, 4))
                            setAccountaddress2(account.address.slice(38, 42))
// console.log(chain)
                            try {
                             
                            } catch (error) {}
                          }
                          return (
                            <>
                              <button
                               className="btn btn-primary"
                               tabIndex={0}
                                type="button"
                                onClick={() => {
                                  account
                                    ? openChainModal()
                                    : openConnectModal();
                                }}
                              >
                                {account ?` ${Accountaddress1}...${Accountaddress2} `: "Connect"}

                                <span className="MuiTouchRipple-root mui-style-w0pj6f" />
                              </button>
                            </>
                          );
                        }}
                      </ConnectButton.Custom>
                    ) : (
                      <div className="btn btn-primary">
                        {/* {shortenAddress(currentAccount)} */}
                      </div>
                    )}
                  <div className="togglebutton">
                    <ThemeButton myFunction={myFunction}/>
                  </div>
                  </div>
                  </div>
                  {/* <NavLink className="btn btn-primary" to="/signin">Sign in</NavLink> */}
                </nav>
              
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
