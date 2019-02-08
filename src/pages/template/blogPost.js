import React from "react"
//import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

class BlogPost extends React.Component{
    render(){
        const data = this.props.location.state.postData.node;
        return (
            <Layout>
                <SEO title="blog-post page" />
                <div>
                    <h1>{data.frontmatter.title}</h1>
                    <small>{data.frontmatter.date}</small>
                    <div>{data.html}</div>
                </div> 
            </Layout>    
        )
    }
}

export default BlogPost;