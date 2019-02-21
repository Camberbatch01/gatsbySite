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
      searchTag: '',
      activePost: 0,
      entriesPerPage: 1,
      Date: ''
    }
    this.changePage = this.changePage.bind(this);
    this.pageTab = this.pageTab.bind(this);
    this.changePostAmount = this.changePostAmount.bind(this);
    this.queryParser = this.queryParser.bind(this);
  }

  componentDidMount() {
    this.queryParser();
  }

  componentDidUpdate(prevProps){
    if (this.props.location !== prevProps.location) {
      this.queryParser();              
    }
    
    const options = document.getElementsByClassName("option");
    for (let i=0; i<options.length; i++){
      if (options[i].value !== this.state.entriesPerPage){
        options[i].selected = false;
      } else {
        options[i].selected = true;
      }
    }
  }

  queryParser = () => {
    let queryStr= (this.props.location.search).substring(1);
    let params = queryStr.split("&"); //seperate into individual pairings

    let entriesStr = params[0].substring(8);
    this.setState({entriesPerPage: entriesStr});

    if (params.length===2){
      this.setState({
        Date: '',
        searchTag: params[1].substring(4),
        activePost: 0   //reset to avoid index issues when reloading page with tag parameters
      });             //(eg only 5 related pages but you were on page 8 when you clicked the tag)
    }
    if (params.length===3){
      let date = params[2].substring(5);
      date = date.replace(/\+/g, ' ');

      this.setState({
        Date: date,
        searchTag: params[1].substring(4),
        activePost: 0 
      });          
    }
  }

  changePostAmount = (e) => {
    let amount = e.target.value;
    navigate(`/page-2/?entries=${amount}&tag=${this.state.searchTag}`);
  }

  changePage = (e) =>{
    let pageNumber = e.target.value;
    let nextEntries = this.state.entriesPerPage * (pageNumber-1);
    this.setState({
      activePost: nextEntries
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

    if (this.state.searchTag !== ''){
      allPosts = allPosts.filter((post) => {
        let exists = false; //initialise as false so if no tag found in loop im returning false
        for (let i=0; i<post.node.frontmatter.tags.length; i++){
          if (post.node.frontmatter.tags[i] === this.state.searchTag){
            return exists = true; //tag found return true to keep in filter
          }
        }
        return exists
      })
    }

    if (this.state.Date !== ''){
      allPosts = allPosts.filter((post) => {
          return this.state.Date === (post.node.frontmatter.date).substring(3)
      });
    }
    let noResults = <h3>Sorry! No results could be found</h3>;
    if (allPosts.length>0){
      noResults = ""
    }
    let posts = allPosts.slice(this.state.activePost, this.state.activePost + this.state.entriesPerPage);
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
                return (
                  <Link className="blogLink" to="/template/blogPost" state={{postData: post}}>
                    <div className="blogPosts" key={post.node.frontmatter.title}>
                      <h1>{post.node.frontmatter.title}</h1>
                      <small>{post.node.frontmatter.date}</small>
                      <p>{post.node.excerpt}</p>
                      <span>
                        <p className="readMore">read more</p>
                        {tagButtons(tags, this.state.entriesPerPage)}
                      </span>
                    </div>
                  </Link>
                );
              })}
              {this.pageTab(allPosts, this.state.entriesPerPage)}
            </div>

            <div className="tabContainer">
              <Tabs postData={data} entryPP={this.state.entriesPerPage}/>
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