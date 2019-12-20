import React from "react";
import TronLinkGuide from "../TronLinkGuide";
import TronWeb from "tronweb";
import Utils from "../../utils";
import Swal from "sweetalert2";
import logo from "../../assets/BlockMatrix-logo(white).png";
import backgroundvideo from "../../assets/backgroundvideo.mp4";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

import "./App.scss";

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randompassword: "",
      chargeamount: 10,
      tronWeb: {
        installed: false,
        loggedIn: false
      }
    };
    this.Getaddress = this.Getaddress.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await new Promise(resolve => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {
          const TRONGRID_API = "https://api.trongrid.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false
            }
          });

          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) return tries++;

        this.setState({
          tronWeb: tronWebState
        });

        resolve();
      }, 100);
    });

    if (!this.state.tronWeb.loggedIn) {
      // Set default address (foundation address) used for contract calls
      // Directly overwrites the address object as TronLink disabled the
      // function call
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS
      };

      window.tronWeb.on("addressChanged", () => {
        if (this.state.tronWeb.loggedIn) return;

        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true
          }
        });
      });
    }
    await Utils.setTronWeb(window.tronWeb);
  }

  async Getaddress() {
    Utils.contract.Generator().send({
      callValue: this.state.chargeamount * 1000000
    });

    let checkbalance = await Utils.contract
      .gererateaddress()
      .watch((err, { result }) => {
        if (err) {
          Swal.fire({
            title: "Error, Try Again !",
            type: "error"
          });
        }
        if (result) {
          this.setState({
            randompassword: `${result.returnaddress}`
          });
          Swal.fire({
            title: "Successfully generated",
            type: "success"
          });
          checkbalance.stop();
        }
      });
  }

  render() {
    if (!this.state.tronWeb.installed) return <TronLinkGuide />;

    if (!this.state.tronWeb.loggedIn) return <TronLinkGuide installed />;

    return (
      <div className="container-fluid">
        <nav className="navbar bg-dark">
          <a calss="navbar-brand" href="#">
            <img
              src={logo}
              width="150"
              height="100"
              className="img-fluid"
              style={{ margin: ".9%" }}
            ></img>
          </a>
        </nav>
        <div
          className="jumbotron text-center"
          style={{ backgroundColor: "#d3d3d3" }}
        >
          <h1
            className="font-weight-bold"
            style={{ fontSize: "250%", color: "#ffffff" }}
          >
            BlockMatrix Password Generator
          </h1>
        </div>
        <div className="col-lg-12 text-center">
          <button
            style={{ marginTop: "40px" }}
            className="btn btn-primary btn-lg"
            onClick={event => {
              event.preventDefault();
              this.Getaddress();
            }}
          >
            Generate
          </button>
          <br></br>
          <div className="text-center">
            <video autoPlay muted loop width="800px" height="400px">
              <source src={backgroundvideo}></source>
            </video>
          </div>

          <h3 className="text-light">
            Your Generated Password is :{this.state.randompassword}
          </h3>
        </div>
      </div>
    );
  }
}

export default App;
