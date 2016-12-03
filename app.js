var request = new XMLHttpRequest()
request.open("GET","http://todo.webtechnologybootcamp.com/tasks")
request.send()

request.addEventListener("load", function(){
  var response = JSON.parse(request.responseText)
  response.forEach(addNewTask)
} )

function addNewTask(task){
  var newTask = document.createElement("li")
  newTask.className = "task"
  newTask.innerHTML = "<input type='checkbox'> <span></span> <button class='remove'>Remove</button> <select class='listedtask'> \
  <option value = '1' selected>1</option>\
  <option value = '2'>2</option>\
  <option value = '3'>3</option>\
  <option value = '4'>4</option>\
  <option value = '5'>5</option></select>"

  document.getElementById('priority' + task.priority).appendChild(newTask)

  var Title = newTask.querySelector('span')
  Title.textContent = task.title

  var Prior = newTask.querySelector('select')
  Prior.value = task.priority

  var done = newTask.querySelector('input')
  done.checked = task.done

  var updateStrike = function() {
    if (done.checked) {
      newTask.classList.add("done")
    }
    else {
      newTask.classList.remove("done")
    }
  }

  updateStrike()

  done.addEventListener('change',function() {
    var newRequest = new XMLHttpRequest()
    newRequest.open("PATCH","http://todo.webtechnologybootcamp.com/tasks/" + task.id)
    newRequest.setRequestHeader("Content-Type","application/json")
    newRequest.send(JSON.stringify({done:done.checked}))
    updateStrike()
  } )

  var changePrior = function() {
    document.getElementById('priority' + task.priority).appendChild(newTask)
  }

  Prior.addEventListener('change', function() {
    var newRequest = new XMLHttpRequest()
    newRequest.open("PATCH","http://todo.webtechnologybootcamp.com/tasks/" + task.id)
    newRequest.setRequestHeader("Content-Type","application/json")
    newRequest.send(JSON.stringify({priority:Prior.value}))
    changePrior()
  } )

  var Remove = newTask.querySelector('button')
  Remove.addEventListener('click',function() {
    document.getElementById('priority' + task.priority).removeChild(newTask)
  } )
}

function updateTasks(){
  var newTasks = document.getElementsByClassName('input')
  var NewPriorities = document.getElementsByClassName('priority')
  var TaskList = []

  for (var i = 0; i <newTasks.length; i++) {
    if (newTasks[i].value != '') {
      TaskList.push( {
        title: newTasks[i].value,
        done: false,
        priority: NewPriorities[i].value
      } )
    }
    newTasks[i].value = ''
    NewPriorities[i].value = 1
  }
  TaskList.forEach(addNewTask)
}

var update = document.getElementById('update')

update.addEventListener('click',updateTasks)
