import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"



const BlogPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Blog</h1>
    <p>Welcome to the blog</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default BlogPage

export const blogQuery = graphql`
query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    edges {
      node {
        excerpt
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
        }
      }
    }
  }
}
`
