var Tasks = [
  {
    title: "Feed the Dog",
    status: false,
    priority: 2,
    person: "John Smith",
  },
  {
    title: "Catch the Rat",
    status: true,
    priority: 3,
    person: "John Smith",
  },
  {
    title: "Eat the Broccoli",
    status: true,
    priority: 5,
    person: "John Smith",
  },
  {
    title: "Take a Bath",
    status: false,
    priority: 4,
    person: "John Smith",
  },
  {
    title: "Avoid Hitting the Red Button",
    status: false,
    priority: 1,
    person: "John Smith",
  }
]

function addNewTask(task){
  var newTask = document.createElement("li")
  newTask.className = "task"
  newTask.innerHTML = "<input type='checkbox'> <span></span> <button class='remove'>Remove</button> <select class='listedtask'> \
  <option value = '1'>1</option>\
  <option value = '2'>2</option>\
  <option value = '3'>3</option>\
  <option value = '4'>4</option>\
  <option value = '5'>5</option></select>"
  document.getElementById('priority' + task.priority).appendChild(newTask)
  var Title = newTask.querySelector('span')
  Title.textContent = task.title
  var Prior = newTask.querySelector('select')
  Prior.value = task.priority
  var Status = newTask.querySelector('input')
  Status.checked = task.status
  var Remove = newTask.querySelector('button')
  Remove.addEventListener('click',function(){
    console.log(task)
    document.getElementById('priority' + task.priority).removeChild(newTask)
  })
}

Tasks.forEach(addNewTask)

var update = document.getElementById('update')
var NewTasks = document.getElementsByClassName('input')
var NewPriorities = document.getElementsByClassName('priority')

var NewTask = {
  title: NewTask[0],
  status: false,
  priority: NewPriorities[0],
  person: '',
}

update.addEventListener('click',addNewTask(NewTask))
