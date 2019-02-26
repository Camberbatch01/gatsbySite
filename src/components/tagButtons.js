import React from "react"
import {Link} from "gatsby"



const tagButtons = (tags, queryStr) =>  {
    let operand = "&";
    if (queryStr === ""){
      operand = "?"
    }
    queryStr += `${operand}`

    return tags.map(tag => <Link className="tags" to={`/page-2/${queryStr}tag=${tag}`}><label>{tag}</label></Link>)
}




export default tagButtons