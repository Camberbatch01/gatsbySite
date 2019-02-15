import React from "react"
import {Link} from "gatsby"

const tagButtons = (tags) =>  tags.map(tag => <Link to={`/page-2/?tag=${tag}`}>{tag}</Link>)


export default tagButtons