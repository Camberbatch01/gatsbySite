import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../components/styles/nav.scss"

const Header = ({ siteTitle }) => (
  <header className="navBar">
    <div className="container">
    <div className="companyName">
        <h1 style={{ margin: 0 }}>
          <Link className="navLinks" to="/">
            {siteTitle}
          </Link>
        </h1> 
      </div>
      <p><Link className="navLinks" to="/">Home</Link></p>
      <p><Link className="navLinks" to="/page-2/">Blog</Link></p>
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
