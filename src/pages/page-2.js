import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/styles/blog.scss"
import Banner from "../components/banner"

const pageName = "Blog";
const pageDesc = "Welcome to the blog!";

class BlogPage extends React.Component {
  constructor(){
    super();
    this.state = {
      activePost: 0
    }
  }

  render(){
    const data = this.props.data;
    const allPosts = data.allMarkdownRemark.edges;
    let posts = allPosts.slice(this.state.activePost, this.state.activePost + 1);
    return (
      <Layout location={this.props.location}>
          <SEO title="Page two" />
          {Banner(pageName, pageDesc)}
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
          {pageTab(allPosts, 1)}
          <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
  }
}

const pageTab = (posts, perPage) => {
  let c = 0;
  let tab = [];
  for (let i=0; i< posts.length; i=i+perPage){
    c++;
  tab.push(<div className="pageTabs" value={c}>{c}</div>);
  }
  return tab;
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
