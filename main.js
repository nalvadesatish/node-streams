const express=require("express")
const fs=require("fs")
const status=require("express-status-monitor")
const zlib=require("zlib")

const app=express();
const PORT=8005;
app.use(status());

//zip file--zipper
fs.createReadStream("./20M.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./20M.zip")))
app.get("/",(req,res)=>{
    // fs.readFile("./20M.txt",(err,data)=>{
    //     res.end(data)
    //     console.log("success")
    // })
    const stream =fs.createReadStream('./20M.txt','utf-8');
    stream.on('data',(chunk)=>res.write(chunk));
    stream.on('end',async ()=>res.end());
})
app.listen(PORT,()=>
    console.log(`Server started at http://localhost:${PORT}`)
)