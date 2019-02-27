import React from "react"
import {Link} from "gatsby"



const tagButtons = (tags, queryStr) =>  {
  const params = (queryStr.substring(1)).split("&");
    return tags.map(tag => {
      let c = 0;
      if (queryStr !== ''){
        for (let i=0;i<params.length;i++){
            if (params[i].substring(0, 3)==="tag"){
              queryStr = queryStr.replace(`${params[i]}`, `tag=${tag}`);
            } else {
              c++;
            }
            if (c===params.length){
                queryStr += `&tag=${tag}`;
            }
          }
      } else {
          queryStr += `?tag=${tag}`
      }
    return <Link className="tags" to={`/page-2/${queryStr}`}><label>{tag}</label></Link>
    });

    
}





export default tagButtons