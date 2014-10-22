var calculator = require("./calculator");

var processCalculator = function(req,res,next){
    
    if (req.pathName === "/calculate"){
        var n1 = parseInt(req.params.number1, 10),
            n2 = parseInt(req.params.number2, 10),
            oper = req.params.operation;
        var result = calculator[oper](n1,n2);
        res.write("Result = " + result.toString());
        res.end();
    } else {
        next()
    }
}
module.exports = processCalculator;