import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/styles/blog.scss"

class BlogPage extends React.Component {
  render(){
    const data = this.props.data;
    const posts = data.allMarkdownRemark.edges;
    return (
      <Layout location={this.props.location}>
          <SEO title="Page two" />
          <h1 className="heading">Blog</h1>
          <p>Welcome to the blog</p>
          {posts.map(post => {
            return (
              <Link className="blogLink" to="/template/blogPost" state={{postData: post}}>
                <div className="blogPosts" key={post.node.frontmatter.title}>
                  <h1>{post.node.frontmatter.title}</h1>
                  <small>{post.node.frontmatter.date}</small>
                  <p>{post.node.excerpt}</p>
                  <p className="readMore">read more</p>
                </div>
              </Link>
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
        html
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
        }
      }
    }
  }
}
`
