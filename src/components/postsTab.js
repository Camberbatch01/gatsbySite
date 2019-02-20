import React from "react"
import {Link} from "gatsby"
import "../components/styles/tab.scss"

class Tabs extends React.Component{
    constructor(){
        super();
        this.state = {
            posts: []
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        const Posts = this.props.postData.allMarkdownRemark.edges;
        this.setState({
            posts: Posts
        })
    }
    sortByTags = () => {
        let tagArr = [];
        let tagObj = {removeThisKeyLater: 0};
        let posts = this.state.posts;

        posts.forEach(post => {
            let length = post.node.frontmatter.tags.length
            for (let i=0; i<length; i++){
               tagArr.push(post.node.frontmatter.tags[i]); 
            }
        });
        tagArr.sort();

        tagArr.forEach(tag => {
            for (const key in tagObj){
                if (key === tag){
                    tagObj[key] +=1;
                } 
                if (key !== tag){
                    tagObj[tag] = 1;
                }
            }
        });
        const list = Object.entries(tagObj).filter((item) => {
            return item[1] ===1
        });
    
        return list.map((entry) => {
            return (
                <Link className="tags" to={`/page-2/?entries=${this.props.entryPP}&tag=${entry[0]}`}><label>{entry[0]}</label>{entry[1]}<label></label></Link>
            );
        });
    }

    handleClick = (contentName, btnName) =>{
        let tabContent = document.getElementsByClassName("tabContent");
        for (let i=0; i< tabContent.length; i++){
            tabContent[i].style.display = "none";
        }
        let tabLinks = document.getElementsByClassName("tabLinks");
        for (let i=0; i< tabLinks.length; i++){
            tabLinks[i].className = tabLinks[i].className.replace(" active", "");
        }
        document.getElementById(contentName).style.display = "block";
        document.getElementById(btnName).className += " active";
    }

    render(){
        return (
            <div>
                <div className="tabContain">
                    <button className="tabLinks" id="btnTag" onClick={() => this.handleClick('byTags', 'btnTag')}>Tags</button>
                    <button className="tabLinks" id="btnDate" onClick={() => this.handleClick('byDate', 'btnDate')}>Date</button>
                </div>
                <div className="tabContent" id="byTags">
                    {this.sortByTags()}
                </div>
                <div className="tabContent" id="byDate">
                    by date
                </div>
            </div>
        );
    }
}

export default Tabs