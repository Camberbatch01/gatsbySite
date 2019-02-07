import React from "react"
//import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPost extends React.Component{
    render(){
        return (
            <Layout>
                <SEO title="blog-post page" />
                <div>This is where the post appears</div>
            </Layout>
            
        )
    }
}

export default BlogPost;