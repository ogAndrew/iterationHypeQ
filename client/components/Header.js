import React from "react"
import clapperBoard from "./images/clapperBoard.png"

function Header() {
  return (
    <div className="header-div">

      <h1><img id="logo" src={clapperBoard} />
      <span id="title">hype<span className="black">Q</span></span>
      </h1>
    </div>
  )
}

export default Header;