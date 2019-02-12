import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/styles/contact.scss"

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
    }

    handleChange = (e) => {
        let stateChange = {};
        stateChange[e.target.id] = e.target.value;

        this.setState(stateChange);
    }
    render(){
        return (
            <Layout location={this.props.location}>
                <SEO title="Contact" />
                <h1>Contact Page</h1>
                <p>To get in contact, please fill out the form and hit send!</p>

                <form  
                    name="contact"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <div hidden>
                        <label>
                            Don’t fill this out:{" "}
                            <input name="bot-field" onChange={this.handleChange} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="name">Full Name*</label>
                        <input type="text" name="name" id="name" onChange={this.handleChange} required></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email*</label>
                        <input type="email" name="email" id="email" placeholder="yourname@hotmail.com" onChange={this.handleChange} required></input>
                    </div>
                    <div>
                        <label htmlFor="company">Company</label>
                        <input name="company" id="company" type="text" onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="phone">Telephone Number</label>
                        <input name="phone" id="phone" type="tel" onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="message">Message*</label>
                        <textarea name="message" id="message" type="text" onChange={this.handleChange} required></textarea>
                    </div>
                    <div>
                        <button id="submitForm" type="submit">Submit</button>
                    </div>
                </form>
            </Layout>
        )
    }
}

export default Contact;