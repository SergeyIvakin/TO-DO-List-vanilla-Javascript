const btnAddTask = document.querySelector('#btn-add-task'),
              inputTask = document.querySelector('#input-task'),
              toDoBox = document.querySelector('#to-do-box'),
              btn_2 = document.querySelector('.btn-2'),
              imgDelete = document.querySelector('img'),
              arrToDoList = [];

        btnAddTask.addEventListener('click', addTaskToDoBox);

        function addTaskToDoBox() {
            let divTask = document.createElement('div'),
                contentTask = document.createElement('p'),
                imgDeleteTask = document.createElement('img'),
                taskPerform = document.createElement('input');
                
            document.querySelector('#inactive-div').remove();   
            taskPerform.setAttribute('type', 'checkbox');
            imgDeleteTask.src = 'trash-solid.svg';
            divTask.className = 'to-do';
            imgDeleteTask.className = 'img-delete';
            taskPerform.className = 'checkbox-task-done';
            contentTask.textContent = inputTask.value.trim();
            divTask.prepend(taskPerform);
            divTask.prepend(imgDeleteTask);
            divTask.append(contentTask);
            toDoBox.append(divTask);

        }

        btn_2.onclick = function () {
            //document.querySelector('.to-do').remove();//удаляет див со всем содержимым
            //document.querySelector('.to-do').style.textDecoration = 'line-through';//зачеркивает текст
            document.querySelector('.to-do').classList.add('task-done');//зачеркивает текст
        }

        let donetask = document.querySelectorAll('.checkbox-task-done');
        console.log(donetask);
        for(let i = 0; i < donetask.length; i++) {
            donetask[i].onclick = function() {
                console.log(8);
                document.querySelector('.to-do').classList.add('task-done');
            }
        }

        imgDelete.addEventListener('click', f1);

        function f1() {
            document.querySelector('.to-do').remove();
            
        }
       
        
      

        