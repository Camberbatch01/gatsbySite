import React from "react"
import {Link} from "gatsby"
import "../components/styles/tab.scss"

class Tabs extends React.Component{
    constructor(){
        super();
        this.state = {
            posts: [],
        }
        this.handleClick = this.handleClick.bind(this);
        this.sortByTags = this.sortByTags.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        this.revealInfo = this.revealInfo.bind(this);
    }
    componentDidMount(){
        const Posts = this.props.postData.allMarkdownRemark.edges;
        this.setState({
            posts: Posts,
        })
    }
    revealInfo = (param) => {
        let container = document.getElementById(`${param}`);
        if (container.style.display === "none"){
            container.className += " active";
            container.style.display = "block";
        } else {
            container.className = container.className.replace("active", "");
            container.style.display = "none";
        }
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
            let queryStr = this.props.queryStr;
            const params = (queryStr.substring(1)).split("&");
            let c = 0;
            if (queryStr !== ''){
                for (let i=0;i<params.length;i++){
                    if (params[i].substring(0, 3)==="tag"){
                      queryStr = queryStr.replace(`${params[i]}`, `tag=${entry[0]}`);
                    } else {
                      c++;
                    }
                    if (params[i].substring(0, 4)==="page"){
                        if (i===0){
                          queryStr = queryStr.replace(`${params[i]}`, ""); //?page=2 ==> ?tag=js
                        } else {
                          queryStr = queryStr.replace(`&${params[i]}`, ""); //?tag=js&page=2 ==> ?tag=jsx
                        }
                      }
                    if (c===params.length){
                        if (queryStr==='?'){
                            queryStr += `tag=${entry[0]}`;
                          } else {
                            queryStr += `&tag=${entry[0]}`;
                          }
                    }
                  }
            } else {
                queryStr += `?tag=${entry[0]}`
            }

            return (
                <Link className="tabTags" to={`/page-2/${queryStr}`}><label id="tabNames">{entry[0]}</label><label className="frequency">{'x ' + entry[1]}</label></Link>
            );
        });
    }

    sortByDate = () => {
        const posts = this.state.posts;
        const transitionArr = []; //transition object elements to array, to map to jsx
        const dateObj = {removeMe: {}}; //initialise obj

        posts.forEach((post)=> {
            let year = (post.node.frontmatter.date).substr(-4, 4);      //date format- DD-MMMM-YYYY
            let month = (post.node.frontmatter.date).substr(3, post.node.frontmatter.date.length - 8);

            if (!dateObj.hasOwnProperty(year)){
                dateObj[year] = {[month]: [post.node.frontmatter.title]};
            } 
            else if (dateObj.hasOwnProperty(year)){
                dateObj[year][month].push(post.node.frontmatter.title);
            }
        });
        delete dateObj.removeMe;

        for (const key in dateObj){
            let newArr = [key];
            newArr.push(Object.entries(dateObj[key]));
            transitionArr.push(newArr);
        }
        transitionArr.reverse();    //sort by most recent year

        return transitionArr.map(year =>{
            return (
                <div>
                    <button onClick={()=> this.revealInfo(year[0])} className="years">{year[0]}</button>
                    <div className="annualContainer" id={`${year[0]}`} style={{display: "none"}}>
                        {year[1].map(month =>{
                            return(
                                <div>
                                    <span><button onClick={()=> this.revealInfo(`${year[0]}${month[0]}`)}>{month[0]}</button><label>{" x" + month[1].length}</label></span>
                                    <div className="titleContainer" id={`${year[0]}${month[0]}`} style={{display: "none"}}>
                                        {month[1].map(title =>{
                                            let urlTitle = title.replace(/\s/g, "+");
                                            return <Link to={`/template/blogPost/?title=${urlTitle}`}>{title}</Link>
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>  
                </div>
            );
        })
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
                <div className="tabContent active" id="byTags">
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