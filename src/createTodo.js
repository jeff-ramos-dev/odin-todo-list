import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import deleteIcon from '../images/small-x-icon.png';
import notepadIcon from '../images/small-notepad-icon.png';
import exclamationIcon from '../images/small-exclamation-icon.png'
import openModal from './openModal'
import format from "date-fns/format";
import { buildAllListsPage, buildUserListPage, buildTodayPage, buildWeekPage, buildMonthPage } from "./pages";

export default function createTodo(listOfLists, task) {
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const title = document.createElement('p');
  title.classList.add('title', 'prop');
  title.textContent = task.title

  const addNoteButton = new Image();
  addNoteButton.src = notepadIcon
  addNoteButton.classList.add('icon', 'note');
  addNoteButton.addEventListener('click', e => {
    openModal(listOfLists, task);
  })

  const dates = document.createElement('div');

  const dueDate = document.createElement('p');
  dueDate.classList.add('date', 'prop');
  dueDate.textContent = format(task.dueDate, 'eee MMM d yyy');
  dates.appendChild(dueDate);
  dueDate.addEventListener('click', e => {
    dueDate.style.display = 'none';
    datePicker.style.display = 'block';
    datePicker.value = format(task.dueDate, `yyy-LL-dd`)
  })

  const datePicker = document.createElement('input');
  datePicker.classList.add('date-picker');
  datePicker.type = 'date';
  dates.appendChild(datePicker);
  datePicker.style.display = 'none';
  datePicker.addEventListener('change', e => {
    const year = e.target.value.split('-')[0]
    const month = (parseInt(e.target.value.split('-')[1]) - 1).toString()
    const day = e.target.value.split('-')[2]
    console.log(`${year}-${month}-${day}`);
    listOfLists.updateDueDate(task, new Date(year, month, day));
    dueDate.textContent = format(task.dueDate, 'eee MMM d yyy');
    datePicker.style.display = 'none';
    dueDate.style.display = 'block';
    if (todo.querySelector('.marker')) {
      todo.removeChild(todo.querySelector('.marker'));
    }
    if (differenceInCalendarDays(task.dueDate, today) === 0) {
      const todayMarker = document.createElement('p');
      todayMarker.classList.add('marker');
      todayMarker.textContent = 'Today';
      todo.appendChild(todayMarker);
    } else if (
      differenceInCalendarDays(task.dueDate, today) < 0 &&
      !task.complete
    ) {
      const pastDueMarker = document.createElement('p');
      pastDueMarker.classList.add('marker', 'past-due');
      pastDueMarker.textContent = 'Past Due';
      todo.appendChild(pastDueMarker);
    }
  })

  const urgent = new Image()
  urgent.src = exclamationIcon
  urgent.classList.add('icon', 'priority');

  urgent.addEventListener('click', e => {
    listOfLists.updatePriority(task, !task.urgent)
    todo.classList.toggle('urgent');
    urgent.classList.toggle('colored');
  })

  todo.style.backgroundColor = task.complete ? '#0f6e22' : '#7a0610';

  if (task.urgent) {
    todo.classList.add('urgent');
    urgent.classList.add('colored');
  }

  todo.addEventListener('click', e => {
    if (e.target.localName === 'p' && !e.target.classList.contains('title') ||
      e.target.localName === 'input' ||
      e.target.localName === 'img') {
      return
    }

    listOfLists.updateComplete(task, !task.complete)
    todo.style.backgroundColor = task.complete ? '#0f6e22' : '#7a0610'

    if (todo.querySelector('.past-due') && task.complete) {
      todo.removeChild(todo.querySelector('.past-due'))
    } else if (
      !todo.querySelector('.past-due') &&
      !task.complete &&
      differenceInCalendarDays(task.dueDate, today) < 0
    ) {
      const pastDueMarker = document.createElement('p');
      pastDueMarker.classList.add('marker', 'past-due');
      pastDueMarker.textContent = 'Past Due';
      todo.appendChild(pastDueMarker);
    }
  })

  const today = new Date();

  if (differenceInCalendarDays(task.dueDate, today) === 0) {
    const todayMarker = document.createElement('p');
    todayMarker.classList.add('marker');
    todayMarker.textContent = 'Today';
    todo.appendChild(todayMarker);
  } else if (
    differenceInCalendarDays(task.dueDate, today) < 0 &&
    !task.complete
  ) {
    const pastDueMarker = document.createElement('p');
    pastDueMarker.classList.add('marker', 'past-due');
    pastDueMarker.textContent = 'Past Due';
    todo.appendChild(pastDueMarker);
  }

  const deleteButton = new Image();
  deleteButton.src = deleteIcon
  deleteButton.classList.add('delete', 'icon');
  deleteButton.addEventListener('click', e => {
    let page = document.querySelector('.page')
    document.body.removeChild(page)
    listOfLists.deleteItem(task.parentList, task.id);
    if (page.classList.contains('allLists-page')) {
      page = buildAllListsPage(listOfLists)
    } else if (page.classList.contains('userList-page')) {
      page = buildUserListPage(listOfLists, task.parentList)
    } else if (page.classList.contains('today-page')) {
        page = buildTodayPage(listOfLists)
    } else if (page.classList.contains('week-page')) {
        page = buildMonthPage(listOfLists)
    } else if (page.classList.contains('month-page')) {
        page = buildMonthPage(listOfLists)
    }
    document.body.appendChild(page)
  });

  const buttons = document.createElement('div');
  buttons.classList.add('button-container');
  buttons.appendChild(addNoteButton);
  buttons.appendChild(urgent);
  buttons.appendChild(deleteButton);

  todo.appendChild(title);
  todo.appendChild(dates);
  todo.appendChild(buttons);
  return todo
}