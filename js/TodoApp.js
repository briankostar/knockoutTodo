var taskNum = 1;
var randNum = 0;

function Item(task) {
    var self = this;
    self.task = ko.observable(task);
    self.time = ko.observable(moment().format('h:mm:ss a'));
    self.taskNum = taskNum;
    taskNum++;
}
var randomTask = ['Clean Dishes', 'Finish Math Homework', 'Tidy the closet', 'Go Grocery shopping', 'Book Dentist Appointment',
    'Learn a new word', 'Call Mum & Pop', 'Make the bed', 'Fold the laundry', 'Be nice to a stranger'
];

function TodoAppViewModel() {
    var self = this;
    var list = [];
    self.list = ko.observableArray(list);
    self.cloneList = [];
    self.typed = ko.observable();
    self.query = ko.observable('');

    self.addTask = function() {
        self.list.push(new Item(""));
        self.clone();
    };

    self.addRandomTask = function() {
        self.list.push(new Item(randomTask[randNum]));
        randNum++;
        if (randNum === 10) {
            $(".random").addClass('hide');
            randNum = 0;
        }
        self.clone();
    };

    self.deleteTask = function(task) {
        self.list.remove(task);
        self.clone();
    };

    self.search = function(text) {
        if (text.length === 0) {
            self.list.removeAll();
            taskNum = 1;
            for (var i in self.cloneList) {
                self.list.push(self.cloneList[i]);
            }
            return;
        }
        self.list.removeAll();
        taskNum = 1;
        for (var i in self.cloneList) {
            var taskSubStr = self.cloneList[i].task().slice(0, text.length);
            if (text.toLowerCase() == taskSubStr.toLowerCase()) {
                self.list.push(self.cloneList[i]);
            }
        }
    };
    self.clone = function() {
        self.cloneList = [];
        list.forEach(function(item) {
            self.cloneList.push(item);
        });
    };
}

var Todo = new TodoAppViewModel();
//Calls search when 'query' changes -- passes query as argument
Todo.query.subscribe(Todo.search);
ko.applyBindings(Todo);

var listExists = false;

$('#createList').click(function() {
    $("#createList").toggle();
    $(".todoList, .random, .search").removeClass('hide');
    Todo.list.push(new Item("To have an awesome day!"));
    Todo.clone();
});

$('#deleteList').click(function() {
    $(".todoList, .search").addClass('hide');
    $("#createList").toggle();
    Todo.list.removeAll();
    taskNum = 1;
    randNum = 0;
});
