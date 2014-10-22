var path = require("path"),
    url = require("url"),
    fs = require("fs");

var staticResourceExtensions = [".html",".css",".js",".jpg",".png",".ico"];
var isStaticResource = function(pathName){
    return staticResourceExtensions.some(function(ext){
        return path.extname(pathName) === ext;
    });
}
var serveStatic = function(req,res, next){
    req.pathName = req.url === "/" ? "/index.html" : url.parse(req.url).pathname;
    if (isStaticResource(req.pathName)){
        var filePath = path.join(__dirname, "/public", req.pathName);
        fs.exists(filePath, function(exists){
            if (!exists){
                res.statusCode = 404;
                res.end();
            } else {
                fs.createReadStream(filePath, {encoding : "utf8"}).pipe(res);
            }
        });        
    } else {
        next();
    }
    
}
module.exports = serveStatic;