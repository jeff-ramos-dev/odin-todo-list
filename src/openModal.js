export default function openModal(listOfLists, task) {
  const modal = document.createElement('div');
  modal.classList.add('modal')
  const innerModal = document.createElement('div');
  innerModal.classList.add('inner-modal');
  
  const todoNote = document.createElement('p');
  todoNote.classList.add('todoNote');
  todoNote.contentEditable = true
  todoNote.textContent = task.description

  const okay = document.createElement('button');
  okay.classList.add('okay');
  okay.textContent = 'Okay';

  okay.addEventListener('click', e => {
    listOfLists.updateDescription(task, todoNote.textContent);
    document.body.removeChild(modal);
  })

  todoNote.addEventListener('keypress', e => {
    if (e.code === 'Enter') {
      okay.click()
    }
  })

  const cancel = document.createElement('button');
  cancel.classList.add('cancel');
  cancel.textContent = 'Cancel';
  cancel.addEventListener('click', e => {
    todoNote.textContent = task.description
    document.body.removeChild(modal);
  })

  document.body.appendChild(modal);
  innerModal.appendChild(todoNote);
  innerModal.appendChild(cancel);
  innerModal.appendChild(okay);
  modal.appendChild(innerModal);
}