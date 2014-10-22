var express = require('express');
var router = express.Router();
var taskService = require('../services/taskService');


/* GET users listing. */
router.get('/', function(req, res) {
    var viewData = {tasks : taskService.getAll()};
    res.render('tasks/index',viewData);
});

router.get('/new',function(req, res){
    res.render('tasks/new',{});
});

router.post('/new', function(req,res){
    var newTaskName = req.body.newTask;
    taskService.add(newTaskName);
    res.redirect('/tasks');
});

router.get('/toggle/:id', function(req,res){
    var taskId = parseInt(req.params.id, 10);
    taskService.toggle(taskId);
    res.redirect('/tasks');
});

router.post('/removeCompleted',function(req,res){
    taskService.removeCompleted();
    res.redirect('/tasks');
});

module.exports = router;