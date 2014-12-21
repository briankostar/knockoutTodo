var taskNum = 1;
var randNum = 0;
function Item(task){
	var self = this;
	self.task = ko.observable(task);
	self.time = ko.observable(moment().format('h:mm:ss a'));
	self.taskNum = taskNum;
	taskNum++;
}
var randomTask = ['Clean Dishes', 'Finish Math Homework', 'Tidy the closet', 'Go Grocery shopping', 'Book Dentist Appointment',
					'Learn a new language', 'Call Mum & Dad', 'Make the bed', 'Fold the laundry', 'Be nice to a stranger'];

function TodoAppViewModel(){
	var self = this;
	self.list = ko.observableArray([
		]);

	self.typed = ko.observable();

	self.addTask = function(){
		console.log('addTask called');
		self.list.push(new Item(""));
	};

	self.addRandomTask = function(){
		console.log('addTask called');
		self.list.push(new Item(randomTask[randNum]));
		randNum++;
		if (randNum === 10){
			$( ".random" ).addClass('hide');
			randNum = 0;
		}
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
  	$( ".random" ).removeClass('hide');
	console.log('onclick create')
	Todo.list.push(new Item("Have an awesome day!"));	
});

$('#deleteList').click(function(){
	$( ".todoList" ).addClass('hide');
	$( "#createList" ).toggle();
	console.log('onclick delete')
	Todo.list.removeAll();
	taskNum = 1;
});