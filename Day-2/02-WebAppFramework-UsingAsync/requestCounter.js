var count = 0;
module.exports = {
    getCount : function(){
        return count;
    },
    counter : function(req,res, next){
        count++;
        next();
    }
}
