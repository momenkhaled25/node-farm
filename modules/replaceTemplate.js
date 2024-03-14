//const { module } = require("module");

module.exports = (temp , productObject)=>{
    let output = temp.replace(/{%ID%}/g, productObject.id);
    output = output.replace(/{%PRODUCTNAME%}/g, productObject.productName);
    output = output.replace(/{%IMAGE%}/g, productObject.image);
    output = output.replace(/{%FROM%}/g, productObject.from);
    output = output.replace(/{%NUTRIENTS%}/g, productObject.nutrients);
    output = output.replace(/{%QUANTITY%}/g, productObject.quantity);
    output = output.replace(/{%PRICE%}/g, productObject.price);
    output = output.replace(/{%DESCRIPTION%}/g, productObject.description);

    if(!productObject.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

   return output ; 
}

