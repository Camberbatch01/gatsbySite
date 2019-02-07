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
      <li><Link className="navLinks" to="/">Home</Link></li>
      <li><Link className="navLinks" to="/page-2/">Blog</Link></li>
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
