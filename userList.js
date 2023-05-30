import createTask from './createTask'

export default function userListPage(listOfLists, list) {
  const title = document.createElement('h1');
  title.textContent = list;
  title.style.textAlign = 'center';
  const container = document.createElement('div');
  container.appendChild(title);
  const currList = listOfLists.getAllLists()[list]

  for (const item in currList) {
    const task = createTask(listOfLists, currList, item)
    container.appendChild(task);
  }
  return container
}