var url =require("url"),
    qs = require("querystring");
    
var extractData = function(req,res, next){
    if (req.method === "GET"){
        req.params = url.parse(req.url,true).query;
        next();
    } else if (req.method === "POST"){
        console.log("A post request is made");
        var buffer = "";
        req.on("data", function(dataChunk){
            buffer += dataChunk;
        });
        req.on("end", function(){
            req.params = qs.parse(buffer);
            console.log(req.params);
            next();
        });
    }
}
module.exports = extractData;