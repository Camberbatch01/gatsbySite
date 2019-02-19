import React from "react"
//import { Link, graphql } from "gatsby"

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
        const pData = this.props.location.state.postData.node;

        this.setState({
            title: pData.frontmatter.title,
            date: pData.frontmatter.date,
            content: pData.html
        });
    }

    render(){
        //const htmlObj = document.createElement('div');
        //htmlObj.innerHTML = this.state.content;
        return (
            <Layout location={this.props.location}>
                <SEO title="blog-post page" />
                {Banner(pageName, pageDesc)}
                <div className="post">
                    <h1 className="title">{this.state.title}</h1>
                    <small className="date">{this.state.date}</small>
                    <div className="blogContent">{this.state.content}</div>
                </div> 
            </Layout>    
        )
    }
}

export default BlogPost;