import createTask from './createTask';

export default function allTasks(listOfLists) {
  const allLists = listOfLists.getAllLists()

  const allTaskContainer = document.createElement('div');
  allTaskContainer.classList.add('container');

  const today = new Date();

  for (const list in allLists) {
    let currList = allLists[list]
    const listWrapper = document.createElement('div');
    const listName = document.createElement('h1')
    listName.classList.add('list-name');
    listName.textContent = list
    listWrapper.appendChild(listName)

    for (const item in currList) {
      const task = createTask(currList, item)
      listWrapper.appendChild(task);
      allTaskContainer.appendChild(listWrapper);
    }
  }
  return allTaskContainer
}
