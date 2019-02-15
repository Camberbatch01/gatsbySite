import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../components/styles/nav.scss"

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
      <li><Link className="navLinks" activeStyle={{ borderBottom: '2px solid white' }} to="/contact">t</Link></li>
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
