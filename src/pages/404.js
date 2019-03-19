import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"
import {Link} from "gatsby"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    {Banner()}

    <div className="pageContentContainer">
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <br></br>
      <h4>Perhaps you were looking for one of these?</h4>
      <ul>
        <li><Link to="/">Home page: /</Link></li>
        <li><Link to="/page-2/">Blog page: /blog/</Link></li>
        <li><Link to="/contact">Contact page: /contact</Link></li>
      </ul>
    </div>
    
  </Layout>
)

export default NotFoundPage
