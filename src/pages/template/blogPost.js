import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Banner from "../../components/banner"
import "../../components/styles/blogPost.scss"

const pageName = "Blog";
const pageDesc = "Enjoy!";

class BlogPost extends React.Component{
    constructor(){
        super();
        this.state = {
            title: "",
            date: "",
            content: ""
        }
    }
    componentDidMount(){
        const data = this.props.data;
        const posts = data.allMarkdownRemark.edges;
        const urlTitle = (this.props.location.search).substring(7);
        const regTitle = urlTitle.replace(/\+/g, " ");

        const thePost = posts.filter(post =>{
            return post.node.frontmatter.title === regTitle;
        })
        //const pData = this.props.location.state.postData.node;

        this.setState({
            title: thePost[0].node.frontmatter.title,
            date: thePost[0].node.frontmatter.date,
            content: thePost[0].node.html
        });
    }

    render(){
        return (
            <Layout location={this.props.location}>
                <SEO title="blog-post page" />
                {Banner(pageName, pageDesc)}
                <div className="post">
                    <h1 className="title">{this.state.title}</h1>
                    <small className="date">{this.state.date}</small>
                    <div className="blogContent" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                </div> 
            </Layout>    
        )
    }
}

export default BlogPost;

export const blogQuery = graphql`
query {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC },
    filter: { frontmatter: { tags: {}} }
  ) {
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