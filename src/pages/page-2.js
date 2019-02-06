import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPage extends React.Component {
  render(){
    const data = this.props.data;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout>
          <SEO title="Page two" />
          <h1>Blog</h1>
          <p>Welcome to the blog</p>
          {posts.map(post => {
            return (
              <div key={post.node.frontmatter.title}>
                <h1>{post.node.frontmatter.title}</h1>
                <small>{post.node.frontmatter.date}</small>
                <p>{post.node.excerpt}</p>
              </div>
            );
          })}
          <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
  }
}

export default BlogPage

export const blogQuery = graphql`
query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    edges {
      node {
        excerpt
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
        }
      }
    }
  }
}
`
