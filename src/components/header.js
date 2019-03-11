import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../components/styles/nav.scss"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBars} from '@fortawesome/free-solid-svg-icons'

library.add(faBars)
library.add(faTwitter)

const toggleOptions = () =>{
  const menu = document.getElementById("toggleOpt");

  if (menu.className === "small-screen-nav"){
    return menu.className = "small-screen-nav-on";
  } 
  if (menu.className === "small-screen-nav-on"){
    return menu.className = "small-screen-nav";
  }
}

const Header = ({ siteTitle }) => (
  <header className="navBar">
    <div>
      <ul className="container">
        <li className="companyName">
          <Link className="navLinks" to="/">
            {siteTitle}
          </Link>
        </li>
        <div className="large-screen-nav">
          <li><Link className="navLinks" activeStyle={{borderBottom: "2px solid white"}} to="/">Home</Link></li>
          <li><Link className="navLinks" activeStyle={{borderBottom: "2px solid white"}} to={`/page-2/`}>Blog</Link></li>
          <li><Link className="navLinks" activeStyle={{borderBottom: "2px solid white"}} to="/contact">Contact</Link></li>
          <li><Link className="navLinks" id="twitter" to="/contact"><FontAwesomeIcon icon={['fab', 'twitter']}/></Link></li>
        </div>
        <div className="btnDiv">
          <button className="options-toggle" onClick={()=>toggleOptions()}><FontAwesomeIcon icon="bars"/></button>
        </div>
      </ul>
    </div>
    <div className="bottomBar">
      <div className="small-screen-nav" id="toggleOpt">
        <ul>
          <li><Link className="navLinks" activeStyle={{borderBottom: "2px solid white"}} to="/">Home</Link></li>
          <li><Link className="navLinks" activeStyle={{borderBottom: "2px solid white"}} to={`/page-2/`}>Blog</Link></li>
          <li><Link className="navLinks" activeStyle={{borderBottom: "2px solid white"}} to="/contact">Contact</Link></li>
          <li><Link className="navLinks" id="twitter" to="/contact"><FontAwesomeIcon icon={['fab', 'twitter']}/></Link></li>
        </ul>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
