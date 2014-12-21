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
					'Learn a new word', 'Call Mum & Pop', 'Make the bed', 'Fold the laundry', 'Be nice to a stranger'];

function TodoAppViewModel(){
	var self = this;
	var list = [];
	self.list = ko.observableArray(list);
	self.cloneList = [];
	self.typed = ko.observable();
	self.query = ko.observable('');

	self.addTask = function(){
		self.list.push(new Item(""));
	};

	self.addRandomTask = function(){
		self.list.push(new Item(randomTask[randNum]));
		randNum++;
		if (randNum === 10){
			$( ".random" ).addClass('hide');
			randNum = 0;
		}
	};

	self.deleteTask = function(task){
		self.list.remove(task);
	};

	self.search = function(text){
		if(text.length === 1){
			self.cloneList = []; list[0].task();//_.map(self.list(), _.clone);
			list.forEach(function(item){
				self.cloneList.push(item.task());
			});
			console.log('cloneList & original set', self.cloneList, list)
		}
		if(text.length === 0){
			console.log('returning to original', self.cloneList)
			console.log(typeof self.cloneList)
			// for(var i = 0; i < (self.cloneList).length; i++){
			// 	console.log('adding..')
			// 	self.list.push(self.clineList[i]);
			// }
							self.list.removeAll();
				taskNum = 1;
			for(var i in self.cloneList){
				console.log('adding..', self.cloneList[i])

				self.list.push(new Item(self.cloneList[i]))//self.cloneList[key]);
			}
			// (self.cloneList).forEach(function(el){
			// 	self.list.push(el);
			// })
			// list = (self.cloneList).slice(0);
			console.log('original', self.list())
			return;
		}
		console.log('shouldt see after.. original-------')
		//console.log("search called", text);
		self.list.removeAll();
		taskNum = 1;
		//console.log("clone", self.cloneList);
	    for(var i in self.cloneList) {
	    	//console.log(list[i].task()) //this is item's task value
	    	//first strings shoudl match
	    	//text into lowercase, compare with 
	    	var taskSubStr = self.cloneList[i].slice(0, text.length);
	    	if(text.toLowerCase() == taskSubStr.toLowerCase()){
	    		console.log('task match!', self.cloneList[i]);
	    		self.list.push(new Item(self.cloneList[i]));
	    	}
	      // if(list[i].task().toLowerCase().indexOf(text.toLowerCase()) >= 0) {
	      // 	console.log('task match!')
	      //   self.list.push(list[i]);
	      // }
	    }	
	};
	self.clone = function(original){
		self.cloneList = original.slice(0);
	};
}

var Todo = new TodoAppViewModel();
//Calls search when 'query' changes with its value as argument
Todo.query.subscribe(Todo.search);
// Todo.list.subscribe(Todo.clone);
ko.applyBindings(Todo);

var listExists = false;

$('#createList').click(function(){
  	$( "#createList" ).toggle();
  	$( ".todoList" ).removeClass('hide');
  	$( ".random" ).removeClass('hide');
	Todo.list.push(new Item("To have an awesome day!"));	
});

$('#deleteList').click(function(){
	$( ".todoList" ).addClass('hide');
	$( "#createList" ).toggle();
	Todo.list.removeAll();
	taskNum = 1;
});