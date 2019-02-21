import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../components/styles/nav.scss"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(faTwitter)

const underline = (e) => {
  const links = document.getElementsByClassName("navLinks");
  for (let i=0; i<links.length; i++){
    links[i].id = links[i].id.replace("active", "");
  }
  e.target.id += "active";
}

const Header = ({ siteTitle }) => (
  <header className="navBar">
    <ul className="container">
      <li className="companyName">
        <Link className="navLinks" to="/">
          {siteTitle}
        </Link>
      </li>
      <li><Link className="navLinks" onClick={underline} to="/">Home</Link></li>
      <li><Link className="navLinks" onClick={underline} to="/page-2/?entries=1&tag=">Blog</Link></li>
      <li><Link className="navLinks" onClick={underline} to="/contact">Contact</Link></li>
      <li><Link className="navLinks" id="twitter" to="/contact"><FontAwesomeIcon icon={['fab', 'twitter']}/></Link></li>
    </ul>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
