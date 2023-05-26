const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.form');
const inputTask = document.querySelector('.input-tarefa')
const inputComment = document.querySelector('.inp-descricao')

const fetchTask = async () => {
  const responde = await fetch ('http://localhost:3333/task');
  const tasks = await responde.json();
  return tasks;
}

const addTask = async (event) => {
  event.preventDefault();
  
  const task = { title: inputTask.value};
  const comments = { comments: inputComment.value};

  await fetch('http://localhost:3333/task', {
    method: 'post',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(task),
  });

  loadTaks();
  inputTask.value = '';
  inputComment.value = '';
}

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/task/${id}`,{
    method: 'delete',
  })
}

const updateTask = async (task) => {
  const { id, title, comments, status} = task;

  await fetch(`http://localhost:3333/task`, {
    headers: { 'Content-Type': 'application/json'},
  body: JSON.stringify({title , comments, status}),
  })
  
  loadTaks();
}

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);
    if (innerText) {
      element.innerText = innerText;
    } 
    if (innerHTML) {
      element.innerHTML = innerHTML;
    }
  return element;
}

const createSelect = (value) => {
  const options = `<option value="pendente">Pendente</option>
  <option value="em andamento">Em Andamento</option>
  <option value="concluida">Concluída</option>`;

  const select = createElement('select', '', options);

  select.value = value;

  return select;
}
const task = {
  id: 1,
  title: 'A Fazer',
  comments: 'Pagar Contas',
  status: 'pendente'
}

const createRow = (task) => {

  const {id, title, comments, status } = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdComments = createElement('td', comments);
  const tdStatus = createElement('td');
  const tdActions = createElement('td');
  
  const select = createSelect(status);

  select.addEventListener('change', ({target}) => updateTask({id, title, comments, status: target.value}))
  const editButton = createElement('button', '','<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '','<span class="material-symbols-outlined">delete</span>');
  
  const ediTitle = createElement('form');
  const editInput = createElement('input');

  const editComments = createElement('form');
  const editInputComments = createElement('input');

  editInput.value = title;
  editForm.appendChild(ediInput);

  editInput.value = comments;
  editForm.appendChild(editInputComments);

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateTask({id, title: editInput.value, comments: editInputComments.value, status: status});
  });

  editButton.addEventListener('click', () =>{
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);

  })

  editButton.classList.add('button-edit');
  deleteButton.classList.add('button-delete');

  deleteButton.addEventListener('click', () => {deleteButton(id)});

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  
  tr.appendChild(tdTitle);
  tr.appendChild(tdComments);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);
  
  return tr;

}

const loadTaks = async () => {
  const task = await fetchTask();
  
  tbody.innerHTML = '';
  task.forEach(task => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
}

addForm.addEventListener('submit', addTask);
loadTaks();