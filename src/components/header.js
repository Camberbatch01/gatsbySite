import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../components/styles/nav.scss"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(faTwitter)

const Header = ({ siteTitle }) => (
  <header className="navBar">
    <ul className="container">
      <li className="companyName">
        <Link className="navLinks" to="/">
          {siteTitle}
        </Link>
      </li>
      <li><Link className="navLinks" activeStyle={{ borderBottom: '2px solid white' }} to="/">Home</Link></li>
      <li><Link className="navLinks" activeStyle={{ borderBottom: '2px solid white' }} to="/page-2/">Blog</Link></li>
      <li><Link className="navLinks" activeStyle={{ borderBottom: '2px solid white' }} to="/contact">Contact</Link></li>
      <li><Link className="navLinks" activeStyle={{ borderBottom: '2px solid white' }} to="/contact"><FontAwesomeIcon icon={['fab', 'twitter']}/></Link></li>
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
