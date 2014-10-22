var http = require("http"),
    fs = require("fs"),
    url = require("url"),
    qs = require("querystring"),
    calculator = require("./calculator"),
    path = require("path");

var extractData = function(req,res){
    if (req.method === "GET"){
        req.params = url.parse(req.url,true).query;
    } else if (req.method === "POST"){
        console.log("A post request is made");
        var buffer = "";
        req.on("data", function(dataChunk){
            buffer += dataChunk;
        });
        req.on("end", function(){
            req.params = qs.parse(buffer);
            console.log(req.params);
        });
    }
}

var staticResourceExtensions = [".html",".css",".js",".jpg",".png",".ico"];
var isStaticResource = function(pathName){
    return staticResourceExtensions.some(function(ext){
        return path.extname(pathName) === ext;
    });
}
var serveStatic = function(req,res){
    var filePath = path.join(__dirname, req.pathName);
    fs.exists(filePath, function(exists){
        if (!exists){
            res.statusCode = 404;
            res.end();
        } else {
            fs.createReadStream(filePath, {encoding : "utf8"}).pipe(res);
        }
    });
}
var processCalculator = function(req,res){
    var n1 = parseInt(req.params.number1, 10),
        n2 = parseInt(req.params.number2, 10),
        oper = req.params.operation;
    var result = calculator[oper](n1,n2);
    res.write("Result = " + result.toString());
    res.end();
}
var onConnection = function(req,res){
    
    req.pathName = req.url === "/" ? "/index.html" : url.parse(req.url).pathname;
    console.log("req.pathName = " + req.pathName);
    if (isStaticResource(req.pathName)){
        serveStatic(req,res);
    } else {
        extractData(req,res);
        if (req.pathName === "/calculate"){
            processCalculator(req,res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    }
    
}
var server = http.createServer(onConnection);
server.listen(8080);
console.log("server listening on port 8080");

///calculate?operation=add&number1=100&number=200