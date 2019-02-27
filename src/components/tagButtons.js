import React from "react"
import {Link} from "gatsby"



const tagButtons = (tags, queryStr) =>  {
    return tags.map(tag => {
      const params = (queryStr.substring(1)).split("&");
      let c = 0;
      if (queryStr !== ''){
        for (let i=0;i<params.length;i++){
            if (params[i].substring(0, 3)==="tag"){
              queryStr = queryStr.replace(`${params[i]}`, `tag=${tag}`);
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
                queryStr += `tag=${tag}`;
              } else {
                queryStr += `&tag=${tag}`;
              }
            }
          }
      } else {
          queryStr += `?tag=${tag}`
      }
    return <Link className="tags" to={`/page-2/${queryStr}`}><label>{tag}</label></Link>
    });

    
}





export default tagButtons