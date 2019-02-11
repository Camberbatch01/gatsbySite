import React from "react"
//import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Contact extends React.Component{
    render(){
        return (
            <Layout location={this.props.location}>
                <SEO title="Contact" />
                <div>Contact Page</div> 
            </Layout>
            
        )
    }
}

export default Contact;