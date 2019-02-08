import React from "react"
//import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

class BlogPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {data: this.props.location.state.postData.node}
    }
    render(){
        return (
            <Layout>
                <SEO title="blog-post page" />
                <div>
                    <h1>{this.state.data.frontmatter.title}</h1>
                    <small>{this.state.data.frontmatter.date}</small>
                    <div>{this.state.data.html}</div>
                </div> 
            </Layout>    
        )
    }
}

export default BlogPost;