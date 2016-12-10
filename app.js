var request = new XMLHttpRequest()
request.open("GET","http://todo.webtechnologybootcamp.com/tasks")
request.send()

request.addEventListener("load", function() {
  var response = JSON.parse(request.responseText)
  response.forEach(addNewTask)
} )

var TaskList = []

function addNewTask(task){
  TaskList.push(task)

  var newTask = document.createElement("li")
  newTask.className = "task"
  newTask.innerHTML = "<input type='checkbox'> <span></span> <button class='remove'>Remove</button> <select class='listedtask'> \
  <option value = '1'> 1 </option>\
  <option value = '2'> 2 </option>\
  <option value = '3'> 3 </option>\
  <option value = '4'> 4 </option>\
  <option value = '5' selected> 5 </option></select>"

  var Title = newTask.querySelector('span')
  Title.textContent = task.title

  var Prior = newTask.querySelector('select')
  if (task.priority == null) {
    Prior.value = 5
  }
  else {
    Prior.value = task.priority
  }

  var done = newTask.querySelector('input')
  done.checked = task.done

  document.querySelector('#taskcounter').textContent = 'Tasks Remaining: ' + TaskList.filter(function(task) {return !task.done}).length

  var changePrior = function() {
    if (Prior.value == undefined) {
      document.getElementById('priority5').appendChild(newTask)
    }
    else {
      document.getElementById('priority' + Prior.value).appendChild(newTask)
    }
  }

  changePrior()

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
    var updateDone = new XMLHttpRequest()
    updateDone.open("PATCH","http://todo.webtechnologybootcamp.com/tasks/" + task.id)
    updateDone.setRequestHeader("Content-Type","application/json")
    updateDone.send(JSON.stringify({done:done.checked}))
    updateStrike()
    task.done = done.checked
//  updated_task = (task.done = done.checked)
//  TaskList.replace(task, updated_task)
    document.querySelector('#taskcounter').textContent = 'Tasks Remaining: ' + TaskList.filter(function(task) {return !task.done}).length
  } )

  Prior.addEventListener('change', function() {
    var updatePrior = new XMLHttpRequest()
    updatePrior.open("PATCH","http://todo.webtechnologybootcamp.com/tasks/" + task.id)
    updatePrior.setRequestHeader("Content-Type","application/json")
    updatePrior.send(JSON.stringify({priority:Prior.value}))
    changePrior()
  } )

  var Remove = newTask.querySelector('button')
  Remove.addEventListener('click',function() {
    document.getElementById('priority' + Prior.value).removeChild(newTask)
    var removeTask = new XMLHttpRequest()
    removeTask.open("DELETE","http://todo.webtechnologybootcamp.com/tasks/" + task.id)
    removeTask.send()
  } )
}

function updateTasks(){
  var newTasks = document.getElementsByClassName('input')
  var NewPriorities = document.getElementsByClassName('priority')

  console.log(newTasks)

  for (var i = 0; i < newTasks.length; i++) {
    if (newTasks[i].value != '') {
      let newTaskRequest = new XMLHttpRequest()
      newTaskRequest.open("POST","http://todo.webtechnologybootcamp.com/tasks")
      newTaskRequest.setRequestHeader("Content-Type","application/json")
      newTaskRequest.send(JSON.stringify({
        title: newTasks[i].value,
        done: false,
        priority: NewPriorities[i].value
      }))

      newTaskRequest.addEventListener("load", function() {
        let response = JSON.parse(newTaskRequest.responseText)
        addNewTask( {
          title: response.title,
          done: response.done,
          priority: response.priority,
          id: response.id
        } )
      } )
      newTasks[i].value = ''
      NewPriorities[i].value = 5
    }
  }
}

var update = document.getElementById('update')
update.addEventListener('click',updateTasks)
