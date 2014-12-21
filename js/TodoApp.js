var taskNum = 1;
function Item(task){
	var self = this;
	self.task = ko.observable(task);
	self.time = ko.observable(moment().format('h:mm:ss a'));
	self.taskNum = taskNum;
	taskNum++;
}

function TodoAppViewModel(){
	var self = this;
	self.list = ko.observableArray([
		]);

	self.typed = ko.observable();

	self.addTask = function(){
		console.log('addTask called');
		self.list.push(new Item(""));
	};

	self.deleteTask = function(task){
		console.log(self.list);
		self.list.remove(task);
	};
}

var Todo = new TodoAppViewModel();
ko.applyBindings(Todo);

var listExists = false;

$('#createList').click(function(){
  	$( "#createList" ).toggle();
  	$( ".todoList" ).removeClass('hide');
	console.log('onclick create')
	Todo.list.push(new Item(""));	
});

$('#deleteList').click(function(){
	$( ".todoList" ).addClass('hide');
	$( "#createList" ).toggle();
	console.log('onclick delete')
	Todo.list.removeAll();
	taskNum = 1;
});