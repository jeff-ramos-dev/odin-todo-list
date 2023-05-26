import createTask from '../createTask'

export default function weekPage(listOfLists) {
  const weekList = listOfLists.getWeekList();

  const title = document.createElement('h1');
  title.textContent = 'THIS WEEK'
  title.style.textAlign = 'center'
  const container = document.createElement('div');
  container.appendChild(title);

  for (const item in weekList) {
    const weekTask = createTask(weekList, item);
    container.appendChild(weekTask);
  }

  return container
}