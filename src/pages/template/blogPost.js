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
            content: "",
            index: 0
        }
        this.otherPosts = this.otherPosts.bind(this);
        this.loadPost = this.loadPost.bind(this);
    }
    componentDidMount(){
        this.loadPost();
    }
    componentDidUpdate(prevProps){
        if (this.props.location !== prevProps.location) {
            this.loadPost();            
          }
    }
 
    loadPost = () => {
        const data = this.props.data;
        const posts = data.allMarkdownRemark.edges;
        const urlTitle = (this.props.location.search).substring(7);
        const regTitle = urlTitle.replace(/\+/g, " ");

        for (let i=0; i<posts.length; i++){
            if (posts[i].node.frontmatter.title === regTitle){
                this.setState({
                    title: posts[i].node.frontmatter.title,
                    date: posts[i].node.frontmatter.date,
                    content: posts[i].node.html,
                    index: i
                });
            }
        }
    }

    otherPosts = (posts) => {
        if (this.state.index === posts.length -1){
            return <Link className="nextLink" to={`/template/blogPost/?title=${(posts[this.state.index -1].node.frontmatter.title).replace(/\s/g, "+")}`}>{">>"} {posts[this.state.index -1].node.frontmatter.title}</Link>;
        }
        if (this.state.index === 0){
            return <Link className="previousLink" to={`/template/blogPost/?title=${(posts[this.state.index +1].node.frontmatter.title).replace(/\s/g, "+")}`}>{"<<"} {posts[this.state.index +1].node.frontmatter.title}</Link>;   //query sorts most recent date first so 0 is latest
        }
        else {
            return (
            <span className="linkSpan">
                <Link className="previousLink" to={`/template/blogPost/?title=${(posts[this.state.index +1].node.frontmatter.title).replace(/\s/g, "+")}`}>{"<<"} {posts[this.state.index +1].node.frontmatter.title}</Link>
                <Link className="nextLink" to={`/template/blogPost/?title=${(posts[this.state.index -1].node.frontmatter.title).replace(/\s/g, "+")}`}>{">>"} {posts[this.state.index -1].node.frontmatter.title}</Link>
            </span>);
        }
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
                <span>
                    {this.otherPosts(this.props.data.allMarkdownRemark.edges)}
                </span>
            </Layout>    
        )
    }
}

export default BlogPost;

export const blogQuery = graphql`
query {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
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