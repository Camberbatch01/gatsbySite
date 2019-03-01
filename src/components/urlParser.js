const urlParser = (queryStr, chosenParam, value) => {
    const params = (queryStr.substring(1)).split("&");
    let c = 0;

    if (queryStr !== ''){
        for (let i=0;i<params.length;i++){
            if (params[i].substring(0, chosenParam.length)===`${chosenParam}`){
              queryStr = queryStr.replace(`${params[i]}`, `${chosenParam}=${value}`);
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
                    queryStr += `${chosenParam}=${value}`;
                } else {
                    queryStr += `&${chosenParam}=${value}`;
                }
            }
        }
    } else {
        queryStr += `?${chosenParam}=${value}`
    }
    return queryStr;
}

export default urlParser