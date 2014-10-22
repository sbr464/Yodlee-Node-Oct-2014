var middlewares = [];
var engine = {
    add : function(middleware){
        middlewares.push(middleware);
    },
    run : function(){
        return function(req,res){
            var fn = function(fns){
                var fnToExecute = fns[0];
                var remaining = [].slice.call(fns,1);
                if (typeof fnToExecute === "function"){
                    fnToExecute(req,res, function(){
                        fn(remaining);
                     }, remaining);
                }
            }
            fn(middlewares);
        }
    }
}
module.exports = engine;