export default function openModal(listOfLists, todo) {
  const modal = document.createElement('div');
  modal.classList.add('modal')
  const innerModal = document.createElement('div');
  innerModal.classList.add('inner-modal');
  
  const todoNote = document.createElement('p');
  todoNote.classList.add('todoNote');
  todoNote.contentEditable = true
  todoNote.textContent = todo.description

  const okayButton = document.createElement('button');
  okayButton.classList.add('okay');
  okayButton.textContent = 'Okay';

  okayButton.addEventListener('click', e => {
    listOfLists.updateDescription(todo, todoNote.textContent);
    document.body.removeChild(modal);
  })

  todoNote.addEventListener('keypress', e => {
    if (e.code === 'Enter') {
      okayButton.click()
    }
  })

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('cancel');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', e => {
    todoNote.textContent = todo.description
    document.body.removeChild(modal);
  })

  document.body.appendChild(modal);
  innerModal.appendChild(todoNote);
  innerModal.appendChild(cancelButton);
  innerModal.appendChild(okayButton);
  modal.appendChild(innerModal);
}