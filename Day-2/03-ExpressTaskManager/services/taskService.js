var Task = require('../models/Task');

var store = [];

store.push(new Task(1, "Learn JavaScript", false));
store.push(new Task(2, "Master Node.js", true));
store.push(new Task(3, "Explore Angular.js", false));

module.exports = {
    getAll : function(){
        return store.slice(0);
    },
    add : function(newTaskName){
        var maxId = store.reduce(function(seed,task){
            return task.id > seed ? task.id : seed;
        }, 0);
        var newTask = new Task(maxId + 1, newTaskName, false);
        store.push(newTask);
    },
    toggle : function(id){
        var task = store.filter(function(t){
            return t.id === id;
        })[0];
        task.toggleCompletion();
    },
    removeCompleted : function(){
        for(var i=store.length-1;i>=0;i--){
            if (store[i].isCompleted)
                store.splice(i,1);
        }
    }
}