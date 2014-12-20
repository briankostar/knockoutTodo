function Item(task){
	var self = this;
	self.task = ko.observable(task);
}

function TodoAppViewModel(){
	var self = this;
	self.list = ko.observableArray([
		]);

	self.typed = ko.observable();

	self.addTask = function(){
		console.log('addTask called')
		self.list.push(new Item("--"));
	};

	self.deleteTask = function(task){
		console.log(self.list)
		self.list.remove(task);
	};
}

// ko.applyBindings(new TodoAppViewModel());

var Todo = new TodoAppViewModel();
ko.applyBindings(Todo);

var listExists = false;

$('#createList').click(function(){
	$( "#deleteList" ).toggle();
  	$( "#createList" ).toggle();
	console.log('onclick create', Todo)
	Todo.list.push(new Item("--"));
	// var x = new Item('---')
	// Todo.list = ko.observableArray([x]);
	
});

$('#deleteList').click(function(){
	$( "#createList" ).toggle();
	$( "#deleteList" ).toggle();
	console.log('onclick delete', Todo.list)
	Todo.list.removeAll();
});