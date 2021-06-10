const btnAddTask = document.querySelector('#btn-add-task'),
      inputTask = document.querySelector('#input-task'),
      toDoBox = document.querySelector('.to-do-box'),
      ulTask = document.querySelector('.ul-task'),
      //arrayKeyLocalStorage = [],
      btn_2 = document.querySelector('.btn-2');

btnAddTask.addEventListener('click', addTaskToDoBox);
btnAddTask.addEventListener('click', deleteInputTask);


function addTaskToDoBox() {

    let li = document.createElement('li');

    li.innerHTML = `<span class="delete-task">×</span><input type='checkbox' class="done-task"><label>${inputTask.value}</label>`;

    ulTask.append(li);

    let keyLocalStorage = Math.floor( Math.random() * 10000);

    localStorage.setItem(keyLocalStorage, JSON.stringify(li.innerHTML));

    btnAddTask.setAttribute('disabled', 'true');

    toDoBox.addEventListener('change', taskDone);

    btnDeleteTask = document.querySelectorAll('.delete-task');

    for(let i = 0; i < btnDeleteTask.length; i++) {
        
        btnDeleteTask[i].onclick = deleteTask;
         
    }
}


function outputsContentLocalStorage() {

    let arrayKeyLocalStorage = [];

    for(let i = 0; i < localStorage.length; i++) {
        
        let key = localStorage.key(i),
            a = localStorage.getItem(`${key}`),
            b = JSON.parse(a),
            li = document.createElement('li');

    li.innerHTML = b;

    ulTask.append(li);

    arrayKeyLocalStorage[i] = localStorage.key(i);
    }

    let btnDeleteTask = document.querySelectorAll('.delete-task');

    for(let i = 0; i < btnDeleteTask.length; i++) {
        
        btnDeleteTask[i].onclick = function (event) {

           event.target.parentNode.remove();
               
           localStorage.removeItem(arrayKeyLocalStorage[i]); 

    }    
} 
}

outputsContentLocalStorage();


function deleteTask(event) {
    
    event.target.parentNode.remove();//parentNode - обращение к родительскому элементу
    //outputsContentLocalStorage();
    
}


function taskDone() {

    let doneTask = document.querySelectorAll('.done-task');

    for(let i = 0; i < doneTask.length; i++) {
        if(doneTask[i].checked) {
            doneTask[i].nextSibling.style.textDecoration = 'line-through';//обращаемся к соседнему от doneTask[i] элементу
        }
        else {
            doneTask[i].nextSibling.style.textDecoration = 'none';
        }  
    }
} 


function deleteInputTask() {

    inputTask.value = '';
}

inputTask.addEventListener('input', () => {
    
    let input = inputTask.value.trim();
    
    if(input != '') {
        btnAddTask.removeAttribute('disabled');
    }
    else {
        btnAddTask.setAttribute('disabled', 'true'); 
    }
})

            
       
        
      

