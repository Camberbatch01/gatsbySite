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
        this.sortByTags = this.sortByTags.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
    }
    componentDidMount(){
        const Posts = this.props.postData.allMarkdownRemark.edges;
        this.setState({
            posts: Posts
        })
    }
    sortByTags = () => {
        const tagArr = [];
        const tagObj = {removeThisKeyLater: 0};   //needed to initialise
        const posts = this.state.posts;

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
            return item[1] ===1     //get rid of dummy data used to initialise object
        });
    
        return list.map((entry) => {
            return (
                <Link className="tags" to={`/page-2/?entries=${this.props.entryPP}&tag=${entry[0]}`}><label>{entry[0]}</label>{entry[1]}<label></label></Link>
            );
        });
    }

    sortByDate = () => {
        const posts = this.state.posts;
        const dateObj = {removeMe: {}}; //initialise obj
        const monthObj = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0
        };

        posts.forEach((post)=> {
            let year = (post.node.frontmatter.date).substr(-4, 4);      //date format- DD-MMMM-YYYY
            let month = (post.node.frontmatter.date).substr(3, post.node.frontmatter.date.length - 8);

            for (const key in dateObj){
                if (key !== year){
                    dateObj[year] = monthObj;
                    if (dateObj[year][month]===0){
                        dateObj[year][month]++;    
                    }
                } 
                if (key === year){
                    dateObj[year][month]++;
                }
            }
        });
        delete dateObj.removeMe;
        console.log(dateObj);
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
                    {this.sortByDate()}
                </div>
            </div>
        );
    }
}

export default Tabs