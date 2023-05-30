import createTask from '../createTask'

export default function todayPage(listOfLists) {
  const todayList = listOfLists.getTodayList()

  const title = document.createElement('h1');
  title.textContent = 'TODAY'
  title.style.textAlign = 'center'
  const container = document.createElement('div');
  container.appendChild(title);

  for (const item in todayList) {
    const todayTask = createTask(listOfLists, todayList, item);
    container.appendChild(todayTask);
  }

  return container
}