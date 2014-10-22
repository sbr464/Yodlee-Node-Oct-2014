var http = require("http"),
    processCalculator = require("./processCalculator"),
    dataExtractor = require("./extractData"),
    staticServer = require("./serveStatic"),
    requestCounter = require("./requestCounter"),
    engine = require("./engine.js");
    
    
engine.add(requestCounter.counter)
engine.add(staticServer);
engine.add(dataExtractor);
engine.add(processCalculator);

engine.add(function(req,res,next){
    console.log("Total requests = " + requestCounter.getCount());
    next();
});

engine.add(function(req,res,next){
    res.statusCode = 404;
    res.end();
});

var server = http.createServer(engine.run());
server.listen(8080);
console.log("server listening on port 8080");

///calculate?operation=add&number1=100&number=200