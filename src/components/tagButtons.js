import React from "react"
import {Link} from "gatsby"

const tagButtons = (tags, entries) =>  tags.map(tag => <Link to={`/page-2/?entries=${entries}&tag=${tag}`}>{tag}</Link>)


export default tagButtons