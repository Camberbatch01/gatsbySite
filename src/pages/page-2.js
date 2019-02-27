import React from "react"
import { Link, graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/styles/blog.scss"
import Banner from "../components/banner"
import tagButtons from "../components/tagButtons"
import Tabs from "../components/postsTab"

const pageName = "Blog";
const pageDesc = "Welcome to the blog!";

class BlogPage extends React.Component {
  constructor(){
    super();
    this.state = {
      tag: '',
      activePost: 0,
      entries: 1,
      page: 1
    }
    this.changePage = this.changePage.bind(this);
    this.pageTab = this.pageTab.bind(this);
    this.changePostAmount = this.changePostAmount.bind(this);
    this.queryParser = this.queryParser.bind(this);
  }

  componentDidMount() {
    this.setState(this.queryParser());
  }

  componentDidUpdate(prevProps){
    if (this.props.location !== prevProps.location) {
      this.setState(this.queryParser());              
    }
    
    const options = document.getElementsByClassName("option");
    for (let i=0; i<options.length; i++){
      if (options[i].value !== this.state.entries){
        options[i].selected = false;
      } else {
        options[i].selected = true;
      }
    }
  }
  queryParser = () =>{
    if (this.props.location.search === ''){
      return
    }
    let queryStr = (this.props.location.search).substring(1);
    let paramStr = queryStr.split("&");
    const stateObj = {activePost: 0};

    paramStr.forEach(param => {
      let splitParams = param.split("=");
      if (splitParams[0] === "page"){
        stateObj["activePost"] = this.state.activePost; //keep the same dont reset to 0 when a page changes
      }
      stateObj[splitParams[0]] = splitParams[1];
    });
    return stateObj;
  }

  changePostAmount = (e) => {
    const amount = e.target.value;
    let queryStr = this.props.location.search;
    const params = (queryStr.substring(1)).split("&");
    let c = 0;

    if (queryStr !== ""){
      for (let i=0;i<params.length;i++){
        if (params[i].substring(0, 7)==="entries"){
          queryStr = queryStr.replace(`entries=${this.state.entries}`, `entries=${amount}`);
        } else {
          c++;
        }
      }
      if (c===params.length){
        queryStr += `&entries=${amount}`;
      }
    } else {
      queryStr += `?entries=${amount}`;
    }
    navigate(`/page-2/${queryStr}`);
  }

  changePage = (e) =>{
    let pageNumber = e.target.value;
    let nextEntries = this.state.entries * (pageNumber-1);
    this.setState({
      activePost: nextEntries,
      page: pageNumber
    })
  }

  pageTab = (posts, perPage) => {
    let c = 0;
    let tab = [];
    for (let i=0; i< posts.length; i=i+perPage){
      c++;
    tab.push(<button className="pageTabs" value={c} onClick={this.changePage}>{c}</button>);
    }
    return tab;
  }

  render(){
    const data = this.props.data;
    let allPosts = data.allMarkdownRemark.edges;
  
    if (this.state.tag !== ''){
      allPosts = allPosts.filter((post) => {
        let exists = false; //initialise as false so if no tag found in loop im returning false
        for (let i=0; i<post.node.frontmatter.tags.length; i++){
          if (post.node.frontmatter.tags[i] === this.state.tag){
            return exists = true; //tag found return true to keep in filter
          }
        }
        return exists
      })
    }
    
    let noResults = <h3>Sorry! No results could be found</h3>;
    if (allPosts.length>0){
      noResults = ""
    }
    let posts = allPosts.slice(this.state.activePost, this.state.activePost + this.state.entries);
    return (
      <Layout location={this.props.location}>
          <SEO title="Page two" />
          {Banner(pageName, pageDesc)}
          {noResults}
          <div className="containerOfContainers">
            <div className="blogContainer">
              <label htmlFor="perPage" className="amountPP">Posts per page</label>
                <select className="perPage" onChange={this.changePostAmount}>
                  <option className="option" value="1">1</option>
                  <option className="option" value="2">2</option>
                  <option className="option" value="5">5</option>
                  <option className="option" value="10">10</option>
                  <option className="option" value="20">20</option>
                  <option className="option" value="50">50</option>
                </select>
              {posts.map(post => {
                const tags = post.node.frontmatter.tags;
                const urlTitle = (post.node.frontmatter.title).replace(/\s/g, "+");
                return (
                  <Link className="blogLink" to={`/template/blogPost/?title=${urlTitle}`}>
                    <div className="blogPosts" key={post.node.frontmatter.title}>
                      <h1>{post.node.frontmatter.title}</h1>
                      <small>{post.node.frontmatter.date}</small>
                      <p>{post.node.excerpt}</p>
                      <span>
                        <p className="readMore">read more</p>
                        {tagButtons(tags, this.props.location.search)}
                      </span>
                    </div>
                  </Link>
                );
              })}
              {this.pageTab(allPosts, this.state.entries)}
            </div>

            <div className="tabContainer">
              <Tabs postData={data} queryStr={this.props.location.search}/>
            </div>

          </div>
        </Layout>
    );
  }
}

export default BlogPage

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