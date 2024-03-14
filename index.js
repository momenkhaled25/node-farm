const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate')
const slugify = require('slugify');
const { getgid } = require('process');

const textIn = fs.readFileSync('./txt/input.txt' ,'utf-8');

const textOut = `this is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt' ,textOut);



//Non-blocking , asynchronous way
// fs.readFile('./txt/startTTT.txt','utf-8' ,(err , data1)=>{
//     //if(err) return console.log('ERROR!');
//   fs.readFile(`./txt/${data1}.txt`,'utf-8',(err , data2)=>{

//     fs.readFile(`./txt/append.txt`,'utf-8',(err , data3)=>{
      
//         fs.writeFile(`./txt/final.txt`,`${data2}\n${data3}`,'utf-8',err=>{
//             console.log(`Your file has been written !`);
//         })        
//     })
//     console.log('Will read file !');
//   })
// })

//////////////////
//SERVER
//__dirname => source file path from root 


//This files readed just one
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html` , 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html` , 'utf-8')
const templateProducts = fs.readFileSync(`${__dirname}/templates/template-product.html` , 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json` , 'utf-8')
const dataObject =  JSON.parse(data);

const server = http.createServer((req , res)=>{
   
    const {pathname , query} = url.parse(req.url ,true);
    //console.log( url.parse(req.url ,true))

    //slugify module
    const slugs = dataObject.map(el => slugify(el.productName, { lower: true }));

    dataObject.forEach((el, i) => {
        el.productName = slugs[i];
    });
 

    //Overview
    if(pathname === '/' || pathname === '/overview')
    {
        res.writeHead(200, { 'Content-Type': 'text/html' });


        const htmlCards = dataObject.map( elObject => replaceTemplate(templateCard , elObject)).join('');
        const output = templateOverview.replace(/{%PRODUCT_CARDS%}/, htmlCards)
        res.end(output);
    }

    //product
    
    else if(pathname === '/product')
     {
       res.writeHead(200, { 'Content-Type': 'text/html' });
       const product = dataObject[query.id];

       const htmlProduct = replaceTemplate( templateProducts , product);

       res.end(htmlProduct);
     }

    //We create very simple Api
    else if(pathname === '/api')
     {
        // Response Header
        res.writeHead(200, {
            'content-type' : 'application/json',
        })

        res.end(data);
     }

    //Error
    else
    {
        // Response Header
          res.writeHead(404, {
              'content-type' : 'text/html',
              'my-own-header': 'hello-world'
          })

         res.end("<h1> Page not found!<h1>")
      

     }
});

server.listen(8000 , '127.0.0.1',()=>{
   console.log('Listening to requests on port'); 
});







