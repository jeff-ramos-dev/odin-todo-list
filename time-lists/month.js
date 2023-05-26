import createTask from '../createTask'

export default function monthPage(listOfLists) {
  const monthList = listOfLists.getMonthList()

  const title = document.createElement('h1');
  title.textContent = 'THIS MONTH'
  title.style.textAlign = 'center'
  const container = document.createElement('div');
  container.appendChild(title);

  for (const item in monthList) {
    const monthTask = createTask(monthList, item);
    container.appendChild(monthTask);
  }

  return container
}