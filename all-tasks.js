import createTask from './createTask';

export default function allTasks(listOfLists) {
  const allLists = listOfLists.getAllLists()

  const allTaskContainer = document.createElement('div');
  allTaskContainer.classList.add('container');

  for (const list in allLists) {
    const listWrapper = document.createElement('div');
    const listName = document.createElement('h1')
    listName.classList.add('list-name');
    listName.textContent = list;
    listWrapper.appendChild(listName);

    for (const item in allLists[list]) {
      const task = createTask(listOfLists, allLists[list], item);

      listWrapper.appendChild(task);
      allTaskContainer.appendChild(listWrapper);
    }

    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('add');

    addButton.addEventListener('click', e => {
      listOfLists.addItem(list);
      const newTask = createTask(listOfLists, allLists[list], allLists[list].length - 1);
      listWrapper.appendChild(newTask);
    })
    allTaskContainer.appendChild(addButton);
  };


  return allTaskContainer;
}
