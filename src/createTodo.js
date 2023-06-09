import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import deleteIcon from '../images/small-x-icon.png';
import notepadIcon from '../images/small-notepad-icon.png';
import exclamationIcon from '../images/small-exclamation-icon.png'
import openModal from './openModal'
import format from "date-fns/format";
import { buildAllListsPage, buildUserListPage, buildTodayPage, buildWeekPage, buildMonthPage } from "./pages";

export default function createTodo(listOfLists, todo) {
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo');

  const title = document.createElement('p');
  title.classList.add('title', 'prop');
  title.textContent = todo.title

  const addNoteButton = new Image();
  addNoteButton.src = notepadIcon
  addNoteButton.classList.add('icon', 'note');
  addNoteButton.addEventListener('click', e => {
    openModal(listOfLists, todo);
  })

  const datesContainer = document.createElement('div');

  const dueDate = document.createElement('p');
  dueDate.classList.add('date', 'prop');
  dueDate.textContent = format(todo.dueDate, 'eee MMM d yyy');
  dueDate.addEventListener('click', e => {
    dueDate.style.display = 'none';
    datePicker.style.display = 'block';
    datePicker.value = format(todo.dueDate, `yyy-LL-dd`)
  })

  const datePicker = document.createElement('input');
  datePicker.classList.add('date-picker');
  datePicker.type = 'date';
  datePicker.style.display = 'none';
  datePicker.addEventListener('change', e => {
    const year = e.target.value.split('-')[0]
    const month = (parseInt(e.target.value.split('-')[1]) - 1).toString()
    const day = e.target.value.split('-')[2]
    console.log(`${year}-${month}-${day}`);
    listOfLists.updateDueDate(todo, new Date(year, month, day));
    dueDate.textContent = format(todo.dueDate, 'eee MMM d yyy');
    datePicker.style.display = 'none';
    dueDate.style.display = 'block';
    if (todoContainer.querySelector('.marker')) {
      todoContainer.removeChild(todoContainer.querySelector('.marker'));
    }
    if (differenceInCalendarDays(todo.dueDate, today) === 0) {
      const todayMarker = document.createElement('p');
      todayMarker.classList.add('marker');
      todayMarker.textContent = 'Today';
      todoContainer.appendChild(todayMarker);
    } else if (
      differenceInCalendarDays(todo.dueDate, today) < 0 &&
      !todo.complete
    ) {
      const pastDueMarker = document.createElement('p');
      pastDueMarker.classList.add('marker', 'past-due');
      pastDueMarker.textContent = 'Past Due';
      todoContainer.appendChild(pastDueMarker);
    }
  })

  datesContainer.appendChild(dueDate);
  datesContainer.appendChild(datePicker);

  const urgent = new Image()
  urgent.src = exclamationIcon
  urgent.classList.add('icon', 'priority');

  urgent.addEventListener('click', e => {
    listOfLists.updateUrgency(todo, !todo.urgent)
    todoContainer.classList.toggle('urgent');
    urgent.classList.toggle('colored');
  })

  todoContainer.style.backgroundColor = todo.complete ? '#0f6e22' : '#7a0610';

  if (todo.urgent) {
    todoContainer.classList.add('urgent');
    urgent.classList.add('colored');
  }

  todoContainer.addEventListener('click', e => {
    if (e.target.localName === 'p' && !e.target.classList.contains('title') ||
      e.target.localName === 'input' ||
      e.target.localName === 'img') {
      return
    }

    listOfLists.updateCompletion(todo, !todo.complete)
    todoContainer.style.backgroundColor = todo.complete ? '#0f6e22' : '#7a0610'

    if (todoContainer.querySelector('.past-due') && todo.complete) {
      todoContainer.removeChild(todoContainer.querySelector('.past-due'))
    } else if (
      !todoContainer.querySelector('.past-due') &&
      !todo.complete &&
      differenceInCalendarDays(todo.dueDate, today) < 0
    ) {
      const pastDueMarker = document.createElement('p');
      pastDueMarker.classList.add('marker', 'past-due');
      pastDueMarker.textContent = 'Past Due';
      todoContainer.appendChild(pastDueMarker);
    }
  })

  const today = new Date();

  if (differenceInCalendarDays(todo.dueDate, today) === 0) {
    const todayMarker = document.createElement('p');
    todayMarker.classList.add('marker');
    todayMarker.textContent = 'Today';
    todoContainer.appendChild(todayMarker);
  } else if (
    differenceInCalendarDays(todo.dueDate, today) < 0 &&
    !todo.complete
  ) {
    const pastDueMarker = document.createElement('p');
    pastDueMarker.classList.add('marker', 'past-due');
    pastDueMarker.textContent = 'Past Due';
    todoContainer.appendChild(pastDueMarker);
  }

  const deleteButton = new Image();
  deleteButton.src = deleteIcon
  deleteButton.classList.add('delete', 'icon');
  deleteButton.addEventListener('click', e => {
    let page = document.querySelector('.page')
    document.body.removeChild(page)
    listOfLists.deleteTodo(todo.parentList, todo.id);
    if (page.classList.contains('allLists-page')) {
      page = buildAllListsPage(listOfLists)
    } else if (page.classList.contains('userList-page')) {
      page = buildUserListPage(listOfLists, todo.parentList)
    } else if (page.classList.contains('today-page')) {
        page = buildTodayPage(listOfLists)
    } else if (page.classList.contains('week-page')) {
        page = buildMonthPage(listOfLists)
    } else if (page.classList.contains('month-page')) {
        page = buildMonthPage(listOfLists)
    }
    document.body.appendChild(page)
  });

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  buttonContainer.appendChild(addNoteButton);
  buttonContainer.appendChild(urgent);
  buttonContainer.appendChild(deleteButton);

  todoContainer.appendChild(title);
  todoContainer.appendChild(datesContainer);
  todoContainer.appendChild(buttonContainer);
  return todoContainer
}