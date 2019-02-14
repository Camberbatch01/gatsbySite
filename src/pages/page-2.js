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
      activePost: 0,
      entriesPerPage: 1
    }
    this.changePage = this.changePage.bind(this);
    this.pageTab = this.pageTab.bind(this);
    this.changePostAmount = this.changePostAmount.bind(this);
  }

  changePostAmount = (e) => {
    let amount = e.target.value;
    this.setState({
      entriesPerPage: amount,
      activePost: 0   //reset to avoid overlap errors
    });
  }

  changePage = (e) =>{
    let pageNumber = e.target.value;
    let nextEntries = this.state.entriesPerPage * (pageNumber-1);
    this.setState({
      activePost: nextEntries
    })
  }

  pageTab = (posts, perPage) => {
    let c = 0;
    let tab = [];
    for (let i=0; i< posts.length; i=i+perPage){
      c++;
    tab.push(<button className="pageTabs" value={c} onClick={this.changePage}>{c}</button>);
    }
    return tab;
  }

  render(){
    const data = this.props.data;
    const allPosts = data.allMarkdownRemark.edges;
    let posts = allPosts.slice(this.state.activePost, this.state.activePost + this.state.entriesPerPage);
    return (
      <Layout location={this.props.location}>
          <SEO title="Page two" />
          {Banner(pageName, pageDesc)}
          <label htmlFor="perPage">Posts per page</label>
          <select className="perPage" onChange={this.changePostAmount}>
            <option defaultValue value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          {posts.map(post => {
            return (
              <Link className="blogLink" to="/template/blogPost" state={{postData: post}}>
                <div className="blogPosts" key={post.node.frontmatter.title}>
                  <h1>{post.node.frontmatter.title}</h1>
                  <small>{post.node.frontmatter.date}</small>
                  <p>{post.node.excerpt}</p>
                  <span>
                    <p className="readMore">read more</p>
                    <p className="tags">[{post.node.frontmatter.tags}]</p>
                  </span>
                </div>
              </Link>
            );
          })}
          {this.pageTab(allPosts, this.state.entriesPerPage)}
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
          tags
        }
      }
    }
  }
}
`