let btnAddTask = document.querySelector('#btn-add-task'),
    inputTask = document.querySelector('#input-task'),
    toDoBox = document.querySelector('.to-do-box'),
    ulTask = document.querySelector('.ul-task'),
    btnClearAllToDo = document.querySelector('.clear-all-todo'), 
    totalTasks = document.querySelector('.total-tasks'),
    li = document.querySelectorAll('li'),
    activeElemDragIndex,
    ounterTotalTasks = 0,
    counterTotalDone = 0,
    totalDone = document.querySelector('.total-done');

//вводит task по нажатию 'enter'
inputTask.addEventListener('keypress', event => {
    if(event.keyCode == '13') {
        addTaskToDoBox();
        deleteInputTask();
    }
})

btnAddTask.addEventListener('click', addTaskToDoBox);
btnAddTask.addEventListener('click', deleteInputTask);
btnClearAllToDo.addEventListener('click', clearAllToDo);

//функция создаёт и добавляет Task в список после нажатия кнопки "ADD" 
function addTaskToDoBox() {

    let li = document.createElement('li');
    li.draggable = 'true';
    li.className = 'elem-todo-list';
    li.innerHTML = `<span class="delete-task" onclick="deleteTask(event)">×</span><input type='checkbox' class="done-task" onclick="taskDone()"><label onclick="taskDoneContent(event)">${inputTask.value}</label><button class="fas fa-marker" onclick="editTask(event)"></button>`;
    ulTask.append(li);
    counterTotalTasks++;
    totalTasks.innerHTML = counterTotalTasks;
    let countLi = document.querySelectorAll('li');

    if(countLi.length == 1) {
        btnClearAllToDo.classList.remove('inactive');
    }
    btnAddTask.setAttribute('disabled', 'true');
    saveToDoLocalStorage();
}

ulTask.addEventListener('dragstart', event => {

    event.target.classList.add('drag-elem-selected');
    let allLi = document.querySelectorAll('.elem-todo-list');

    for(let i = 0; i < allLi.length; i++) {
        if(allLi[i].classList.contains('drag-elem-selected')) {
            activeElemDragIndex = i;
        }
    }
})

ulTask.addEventListener('dragend', function(event) {

    event.target.classList.remove('drag-elem-selected');
    saveToDoLocalStorage();
})

ulTask.addEventListener('dragover', function(event) {
   
    event.preventDefault();
    let activeElemDrag = document.querySelector('.drag-elem-selected');//активный элемент
    let elemDragOver = event.target;//элемент, над которым происходит перетаскиванрие
    let elemDragOverIndex;
    let allLi = document.querySelectorAll('.elem-todo-list');

    for(let i = 0; i < allLi.length; i++) {
        if(allLi[i] == elemDragOver)  {
            elemDragOverIndex = i;
        }
    }
    if(activeElemDragIndex < elemDragOverIndex && activeElemDrag != elemDragOver && elemDragOver.classList.contains('elem-todo-list')) {
        ulTask.insertBefore(activeElemDrag, elemDragOver.nextSibling);
    }
    if(activeElemDragIndex > elemDragOverIndex && activeElemDrag != elemDragOver && elemDragOver.classList.contains('elem-todo-list')) {
        ulTask.insertBefore(activeElemDrag, elemDragOver);
    }
})

//вносит изменения в localStorage
function saveToDoLocalStorage() {
    let arrayLocalStorage = ulTask.innerHTML;
    localStorage.setItem('todo', arrayLocalStorage);
}

//при загрузке страницы проверяет localStorage и выводит его на страницу
function outputsContentLocalStorage() {

    if(localStorage.getItem('todo') != '') {
        ulTask.innerHTML = localStorage.getItem('todo');
        calculateTotalTasks();
        calculateTotalDoneTasks();
    }
    if(localStorage.getItem('todo') == '') {
        calculateTotalTasks();
        calculateTotalDoneTasks();
    }
    if(ulTask.innerHTML != '') {
        btnClearAllToDo.classList.remove('inactive');
    } 
};

window.addEventListener('DOMContentLoaded', outputsContentLocalStorage);

//считает общее количество task
function calculateTotalTasks() {

    let li = document.querySelectorAll('li');
    counterTotalTasks = li.length;
    totalTasks.innerHTML = counterTotalTasks;
}

//считает количество выполненных task
function calculateTotalDoneTasks() {

    let doneTask = document.querySelectorAll('.done-task');
    for(let i = 0; i < doneTask.length; i++) {
        if(doneTask[i].checked) {
            counterTotalDone++;
        }
    }
    totalDone.innerHTML = counterTotalDone;
}

//удаляет конкретную task из списка
function deleteTask(event) {

    event.target.parentNode.remove();//parentNode - обращение к родительскому элементу
    saveToDoLocalStorage();  
    if(ulTask.innerHTML == '') {
        btnClearAllToDo.classList.add('inactive');
    }
    counterTotalTasks--;
    totalTasks.innerHTML = counterTotalTasks; 
    if(event.target.nextSibling.checked) {
        counterTotalDone--;
        totalDone.innerHTML = counterTotalDone;
    }
}

//очищает весь список дел
function clearAllToDo() {

    ulTask.innerHTML = '';
    btnClearAllToDo.classList.add('inactive');
    localStorage.removeItem('todo');
    counterTotalTasks = 0;
    counterTotalDone = 0;
    totalTasks.innerHTML = counterTotalTasks;
    totalDone.innerHTML = counterTotalDone;
}

//функция ставит отметку о выполнении task по нажатию на название/сожержимое task
function taskDoneContent(event) {

    if(event.target.classList.contains('done-task') && event.target.previousSibling.hasAttribute('checked')) {
        event.target.previousSibling.checked = false;
        event.target.previousSibling.removeAttribute('checked');
        event.target.classList.remove('done-task');
        event.target.parentNode.style.backgroundColor = 'beige';
        counterTotalDone--;
        totalDone.innerHTML = counterTotalDone;
        saveToDoLocalStorage();
    }
    else if(!event.target.classList.contains('done-task')) {
        event.target.classList.add('done-task');
        event.target.previousSibling.checked = true;
        event.target.previousSibling.setAttribute('checked', 'true');
        event.target.parentNode.style.backgroundColor = 'yellowgreen';
        counterTotalDone++;
        totalDone.innerHTML = counterTotalDone;
        saveToDoLocalStorage();
    }
}

//отметка о выполнении Task
function taskDone() {

    let doneTask = document.querySelectorAll('.done-task');
    counterTotalDone = 0;

    for(let i = 0; i < doneTask.length; i++) {

        if(doneTask[i].checked) {
            doneTask[i].nextSibling.classList.add('done-task');//обращаемся к соседнему от doneTask[i] элементу
            doneTask[i].setAttribute('checked', 'true');
            doneTask[i].parentNode.style.backgroundColor = 'yellowgreen';
            saveToDoLocalStorage();
            counterTotalDone++;
        }
        totalDone.innerHTML = counterTotalDone;

        if(doneTask[i].checked == false) {
            doneTask[i].nextSibling.classList.remove('done-task');//обращаемся к соседнему от doneTask[i] элементу
            doneTask[i].removeAttribute('checked');
            doneTask[i].parentNode.style.backgroundColor = 'beige';
            saveToDoLocalStorage();
        }  
    }
} 

//очистка поля ввода после добавления Task в список дел
function deleteInputTask() {

    inputTask.value = '';
}

//делает кнопку 'ADD' активной при введении значений в поле ввода
inputTask.addEventListener('input', () => {
    
    let input = inputTask.value.trim();
    
    if(input != '') {
        btnAddTask.removeAttribute('disabled');
    }
    else {
        btnAddTask.setAttribute('disabled', 'true'); 
    }
})

//редактирует содержание введённой таски
function editTask(event) {

    event.target.setAttribute('disabled', 'true');
    let editLi = document.createElement('li'),
        editInput = document.createElement('input'),
        btnEditSave = document.createElement('button'),
        btnEditCancel = document.createElement('button');

    btnEditSave.innerHTML = 'Save';
    btnEditCancel.innerHTML = 'Cancel';
    editLi.className = 'edit-task';
    editInput.className = 'edit-input';
    btnEditSave.className = 'edit-save';
    btnEditCancel.className = 'edit-cancel';
    btnEditSave.setAttribute('disabled', 'true');
    editInput.oninput = () => btnEditSave.removeAttribute('disabled');
    editInput.value = event.target.previousSibling.innerHTML;   
    editLi.append(editInput);
    editLi.append(btnEditSave);
    editLi.append(btnEditCancel);
    event.target.parentNode.append(editLi);
    editInput.focus();
    let save = document.querySelectorAll('.edit-save');
    let input = document.querySelectorAll('.edit-input');
    let editTask = document.querySelectorAll('.edit-task');
    
    for(let i = 0; i < save.length; i++) {
        save[i].onclick = saveChange;
    }

    function saveChange() {

        for(let i = 0; i < input.length; i++) {
            if(input[i].value.trim() != '') {
                event.target.previousSibling.innerHTML = input[i].value.trim();
                editTask[i].remove();
                event.target.removeAttribute('disabled');
                saveToDoLocalStorage();
            }  
        }
    }

    btnEditCancel.onclick = () => {
        editLi.remove();
        event.target.removeAttribute('disabled');
        saveToDoLocalStorage();
    }  
}

            
       
        
      

