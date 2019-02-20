import React from "react"
import {Link} from "gatsby"

const tagButtons = (tags, entries) =>  tags.map(tag => <Link className="tags" to={`/page-2/?entries=${entries}&tag=${tag}`}><label>{tag}</label></Link>)


export default tagButtons