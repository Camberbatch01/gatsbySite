import React from "react"
//import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Contact extends React.Component{
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            company: "",
            phone: "",
            message: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        let stateChange = {};
        stateChange[e.target.id] = e.target.value;

        this.setState(stateChange);
    }
    handleSubmit = (e, err) => {
        e.preventDefault();
        console.log(this.state);
    }
    render(){
        return (
            <Layout location={this.props.location}>
                <SEO title="Contact" />
                <h1>Contact Page</h1>
                <p>To get in contact, please fill out the form and hit send!</p>

                <form>
                    <fieldset>
                        <label htmlFor="name">Full Name:</label>
                        <input type="text" id="name" onChange={this.handleChange} required></input>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" onChange={this.handleChange} required></input>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="company">Company:</label>
                        <input id="company" type="text" onChange={this.handleChange}></input>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="phone">Telephone Number:</label>
                        <input id="phone" type="tel" onChange={this.handleChange}></input>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" type="text" onChange={this.handleChange} required></textarea>
                    </fieldset>
                    <div>
                        <button id="submitForm" type="submit" onSubmit={this.handleSubmit}>Submit</button>
                    </div>
                </form>
            </Layout>
        )
    }
}

export default Contact;