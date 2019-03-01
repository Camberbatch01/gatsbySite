import React from "react"
import {Link} from "gatsby"
import urlParser from "../components/urlParser"


const tagButtons = (tags, queryStr) =>  {
    return tags.map(tag => {
  
    let query = urlParser(queryStr, "tag", tag);

    return <Link className="tags" to={`/page-2/${query}`}><label>{tag}</label></Link>
    });  
}
export default tagButtons