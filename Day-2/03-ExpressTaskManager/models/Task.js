function Task(id, name, isCompleted){
    this.id = id;
    this.name = name;
    this.isCompleted = isCompleted;
}
Task.prototype.toggleCompletion = function(){
    this.isCompleted = !this.isCompleted;
}

module.exports = Task;