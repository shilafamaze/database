const url=require('url')
const http=require('http');
const fs=require('fs');
const querystring=require('querystring');
const port=3000;

const {MongoClient}=require('mongodb');

const client=new MongoClient('mongodb://localhost:27017');
async function connect(){
    try{
        await client.connect();
        console.log("connection established");

    }
    catch(error){
        console.log("error",error);
    }
}
connect();

const server= http.createServer((req,res)=>{
    let db=client.db("dms");
    let collection=db.collection("users");

    const req_url=req.url;
    console.log(req_url);

    const parsed_url=url.parse(req_url);
    console.log(parsed_url);

    if(parsed_url.pathname==='/'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(fs.readFileSync('../client/index.html'));
    }
    else if(parsed_url.pathname==='/style.css'){
        res.writeHead(200,{'Content-Type':'text/css'});
        res.end(fs.readFileSync('../client/style.css'));
    }
   
    else if(parsed_url.pathname==='/submit'&& req.method==='POST'){
        console.log("reached");
        let body='';
        req.on('data',(chunks)=>{
            console.log(chunks);
            body+=chunks.toString();
        });
        req.on('end',()=>{
            console.log(body);

            let datas=querystring.parse(body);
            console.log(datas);
            console.log(datas.name);
            console.log(datas.email);
            console.log(datas.pass);

            //save to data base

            collection.insertOne({
                name:datas.name,
                email:datas.email,
                pass:datas.pass,
            })
            .then((message)=>{
                console.log("message",message);
                res.writeHead(201,{"Content-Type":"text/plain"});
                res.end("user created successfully");
            })
            .catch((error)=>{
                console.log("error", error);

                res.writeHead(400,{"Content-Type":"text/plain"});
                res.end(error.message?error.message:"user created failed");
            })

        })
    }

});
server.listen(port,()=>{
   console.log(`server running at http://localhost:${port}`) ;

});


