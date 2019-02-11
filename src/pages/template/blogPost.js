import React from "react"
//import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

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
        return (
            <Layout location={this.props.location}>
                <SEO title="blog-post page" />
                <div>
                    <h1>{this.state.title}</h1>
                    <small>{this.state.date}</small>
                    <div>{this.state.content}</div>
                </div> 
            </Layout>    
        )
    }
}

export default BlogPost;