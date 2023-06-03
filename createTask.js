import format from "date-fns/format";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

export default function createTask(listOfLists, list, item) {
  const task = document.createElement('div');
  task.classList.add('task');

  const title = document.createElement('p');
  title.classList.add('title', 'prop');
  title.textContent = list[item].title

  const desc = document.createElement('p');
  desc.classList.add('desc', 'prop');
  desc.textContent = list[item].description

  const dueDate = document.createElement('p');
  dueDate.classList.add('date', 'prop');
  dueDate.textContent = format(list[item].dueDate, 'eee MMM d yyy');

  const priority = document.createElement('select');
  priority.classList.add('priority', 'prop');

  const option1 = document.createElement('option')
  option1.value = option1.text = 1
  const option2 = document.createElement('option')
  option2.value = option2.text = 2
  const option3 = document.createElement('option')
  option3.value = option3.text = 3
  const option4 = document.createElement('option')
  option4.value = option4.text = 4
  const option5 = document.createElement('option')
  option5.value = option5.text = 5

  priority.appendChild(option1)
  priority.appendChild(option2)
  priority.appendChild(option3)
  priority.appendChild(option4)
  priority.appendChild(option5)
  priority.selectedIndex = list[item].priority - 1
  priority.classList.add('priority', 'prop');
  priority.addEventListener('change', e => {
    listOfLists.updatePriority(list[item], e.target.value)
  })

  task.style.backgroundColor = list[item].complete ? '#0f6e22' : '#7a0610';
  task.addEventListener('click', e => {
    if (e.target.localName === 'p' || e.target.localName === 'select' || e.target.localName === 'button') {
      return
    }
    listOfLists.updateComplete(list[item], !list[item].complete)
    task.style.backgroundColor = list[item].complete ? '#0f6e22' : '#7a0610'
    if (task.querySelector('.past-due') && list[item].complete) {
      task.removeChild(task.querySelector('.past-due'))
    } else if (!task.querySelector('.past-due') && !list[item].complete && differenceInCalendarDays(list[item].dueDate, today) < 0) {
      const pastDueMarker = document.createElement('p');
      pastDueMarker.classList.add('marker', 'past-due');
      pastDueMarker.textContent = 'Past Due';
      task.appendChild(pastDueMarker);
    }
  })

  const today = new Date();

  if (differenceInCalendarDays(list[item].dueDate, today) === 0) {
    const todayMarker = document.createElement('p');
    todayMarker.classList.add('marker');
    todayMarker.textContent = 'Today';
    task.appendChild(todayMarker);
  } else if (differenceInCalendarDays(list[item].dueDate, today) < 0 && !list[item].complete) {
    const pastDueMarker = document.createElement('p');
    pastDueMarker.classList.add('marker', 'past-due');
    pastDueMarker.textContent = 'Past Due';
    task.appendChild(pastDueMarker);
  }

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete');
  deleteButton.addEventListener('click', e => {
    console.log(list, item)
    console.log(list.length)
    listOfLists.deleteItem(list[item].parentList, item);
    task.parentElement.removeChild(task);
  });

  task.appendChild(title);
  task.appendChild(desc);
  task.appendChild(dueDate);
  task.appendChild(priority);
  task.appendChild(deleteButton);
  return task
}