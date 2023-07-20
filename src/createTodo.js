import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import deleteIcon from '../images/small-x-icon.png';
import notepadIcon from '../images/small-notepad-icon.png';
import exclamationIcon from '../images/small-exclamation-icon.png'
import format from "date-fns/format";
import { buildAllListsPage, buildUserListPage, buildTodayPage, buildWeekPage, buildMonthPage } from "./pages";

export default function createTodo(listOfLists, todo) {
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo');

  const title = document.createElement('p');
  title.classList.add('title', 'prop');
  title.textContent = todo.title

  const noteButton = new Image();
  noteButton.src = notepadIcon
  noteButton.classList.add('icon', 'note');
  noteButton.addEventListener('click', e => {
    openModal(listOfLists, todo);
  })

  function updateDate() {
    const year = datePicker.value.split('-')[0];
    const month = (parseInt(datePicker.value.split('-')[1]) - 1).toString();
    const day = datePicker.value.split('-')[2];
    console.log(`${year}-${month}-${day}`);
    listOfLists.updateDueDate(todo, new Date(year, month, day));
    dueDate.textContent = format(todo.dueDate, 'eee MMM d yyy');
    datePicker.style.display = 'none';
    dueDate.style.display = 'block';
    if (todoContainer.querySelector('.marker')) {
      todoContainer.removeChild(todoContainer.querySelector('.marker'));
    };
    const marker = createMarker(todo);
    if (marker) {
      todoContainer.appendChild(marker);
    };
  };

  const datesContainer = document.createElement('div');

  const dueDate = document.createElement('p');
  dueDate.classList.add('date', 'prop');
  dueDate.textContent = format(todo.dueDate, 'eee MMM d yyy');


  const datePicker = document.createElement('input');
  datePicker.classList.add('date-picker');
  datePicker.type = 'date';
  datePicker.style.display = 'none';

  dueDate.addEventListener('click', e => {
    dueDate.style.display = 'none';
    datePicker.style.display = 'block';
    datePicker.value = format(todo.dueDate, `yyy-LL-dd`);
  });

  window.addEventListener('click', (e) => {
    if (datePicker.style.display === 'block' && e.target !== datePicker && e.target !== dueDate) {
      updateDate();
    };
  });

  datePicker.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      updateDate();
    }
  })

  datePicker.addEventListener('close', e => {
    updateDate();
  });


  datesContainer.appendChild(dueDate);
  datesContainer.appendChild(datePicker);

  const urgentIcon = new Image();
  urgentIcon.src = exclamationIcon;
  urgentIcon.classList.add('icon', 'priority');

  urgentIcon.addEventListener('click', e => {
    listOfLists.updateUrgency(todo, !todo.urgent);
    todoContainer.classList.toggle('urgent');
    urgentIcon.classList.toggle('colored');
  });

  todoContainer.style.backgroundColor = todo.complete ? '#0f6e22' : '#7a0610';

  if (todo.urgent) {
    todoContainer.classList.add('urgent');
    urgentIcon.classList.add('colored');
  };

  todoContainer.addEventListener('click', e => {
    if (e.target.localName === 'p' && !e.target.classList.contains('title') ||
      e.target.localName === 'input' ||
      e.target.localName === 'img') {
      return;
    };

    listOfLists.updateCompletion(todo, !todo.complete);
    todoContainer.style.backgroundColor = todo.complete ? '#0f6e22' : '#7a0610';
    const today = new Date();

    if (todoContainer.querySelector('.past-due') && todo.complete) {
      todoContainer.removeChild(todoContainer.querySelector('.past-due'));
    } else if (
      !todoContainer.querySelector('.past-due') &&
      !todo.complete &&
      differenceInCalendarDays(todo.dueDate, today) < 0
    ) {
      const pastDueMarker = document.createElement('p');
      pastDueMarker.classList.add('marker', 'past-due');
      pastDueMarker.textContent = 'Past Due';
      todoContainer.appendChild(pastDueMarker);
    };
  });

  const marker = createMarker(todo);
  if (marker) {
    todoContainer.appendChild(marker);
  };

  const deleteButton = new Image();
  deleteButton.src = deleteIcon;
  deleteButton.classList.add('delete', 'icon');
  deleteButton.addEventListener('click', e => {
    let page = document.querySelector('.page');
    document.body.removeChild(page);
    listOfLists.deleteTodo(todo.parentList, todo.id);
    if (page.classList.contains('allLists-page')) {
      page = buildAllListsPage(listOfLists);
    } else if (page.classList.contains('userList-page')) {
      page = buildUserListPage(listOfLists, todo.parentList);
    } else if (page.classList.contains('today-page')) {
        page = buildTodayPage(listOfLists);
    } else if (page.classList.contains('week-page')) {
        page = buildMonthPage(listOfLists);
    } else if (page.classList.contains('month-page')) {
        page = buildMonthPage(listOfLists);
    };
    document.body.appendChild(page);
  });

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  buttonContainer.appendChild(noteButton);
  buttonContainer.appendChild(urgentIcon);
  buttonContainer.appendChild(deleteButton);

  todoContainer.appendChild(title);
  todoContainer.appendChild(datesContainer);
  todoContainer.appendChild(buttonContainer);
  return todoContainer;
}

function createMarker(todo) {
  const today = new Date();
  if (differenceInCalendarDays(todo.dueDate, today) === 0) {
    const todayMarker = document.createElement('p');
    todayMarker.classList.add('marker');
    todayMarker.textContent = 'Today';
    return todayMarker;
  } else if (
    differenceInCalendarDays(todo.dueDate, today) < 0 &&
    !todo.complete
  ) {
    const pastDueMarker = document.createElement('p');
    pastDueMarker.classList.add('marker', 'past-due');
    pastDueMarker.textContent = 'Past Due';
    return pastDueMarker;
  };
};

function openModal(listOfLists, todo) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const innerModal = document.createElement('div');
  innerModal.classList.add('inner-modal');
  
  const todoNote = document.createElement('p');
  todoNote.classList.add('todoNote');
  todoNote.contentEditable = true;
  todoNote.textContent = todo.description;

  const okayButton = document.createElement('button');
  okayButton.classList.add('okay');
  okayButton.textContent = 'Okay';

  okayButton.addEventListener('click', e => {
    listOfLists.updateDescription(todo, todoNote.textContent);
    document.body.removeChild(modal);
  });

  todoNote.addEventListener('keypress', e => {
    if (e.code === 'Enter') {
      okayButton.click();
    };
  });

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('cancel');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', e => {
    todoNote.textContent = todo.description;
    document.body.removeChild(modal);
  });

  document.body.appendChild(modal);
  innerModal.appendChild(todoNote);
  innerModal.appendChild(cancelButton);
  innerModal.appendChild(okayButton);
  modal.appendChild(innerModal);
}