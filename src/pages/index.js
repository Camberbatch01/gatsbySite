import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"
import { graphql, Link } from "gatsby"
import tagButtons from "../components/tagButtons"
import "../components/styles/home.scss"

const pageName = "Home Page";
const pageDesc = "Hello World!";

class IndexPage extends React.Component{
  render(){
    const blogData = this.props.data.allMarkdownRemark.edges[0];
    const urlTitle = (blogData.node.frontmatter.title).replace(/\s/g, "+");
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        {Banner(pageName, pageDesc)}
        
        <div className="flexContainer">
          <div className="descContainer">
            <h1>Mollit cillum excepteur est tempor incididunt.</h1>
            <p>Et amet in qui ullamco voluptate amet ea consectetur ullamco labore ex id qui. Fugiat consectetur proident occaecat id culpa est ex Lorem irure cillum minim id amet. Ipsum nisi incididunt non consequat adipisicing. Nisi ullamco cupidatat eu deserunt nulla tempor nostrud exercitation amet duis minim in exercitation occaecat. Occaecat consequat excepteur exercitation cupidatat qui Lorem id cupidatat elit.</p>
          </div>

          <div className="latestBlogContainer">
            <h1>The blog</h1>
            <Link className="blogLink" to={`/template/blogPost/?title=${urlTitle}`} state={{postData: blogData}}>
              <div className="blogPost">
                <h3>{blogData.node.frontmatter.title}</h3>
                <small>{blogData.node.frontmatter.date}</small>
                <p>{blogData.node.frontmatter.description}</p>
                <span>
                  <p className="readMore">read more</p>
                  {tagButtons(blogData.node.frontmatter.tags, 1)}
                </span>
              </div>
            </Link>
            <Link to="/page-2/?entries=1&tag=">See more posts</Link>
          </div>
        </div>
      </Layout>
    );
  }
} 

export default IndexPage

export const latestBlogQuery = graphql`
query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1) {
    edges {
      node {
        excerpt
        html
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
          description
          tags
        }
      }
    }
  }
}
`