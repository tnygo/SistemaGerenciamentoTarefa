const tbody = document.querySelector('tbody');


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

  const editButton = createElement('button', '','<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '','<span class="material-symbols-outlined">delete</span>');
  
  editButton.classList.add('button-edit');
  deleteButton.classList.add('button-delete');

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  
  tr.appendChild(tdTitle);
  tr.appendChild(tdComments);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
  
}

const loadTaks = () => {
}


createRow(task);