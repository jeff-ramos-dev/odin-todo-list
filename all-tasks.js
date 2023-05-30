import createTask from './createTask';

export default function allTasks(listOfLists) {
  const allLists = listOfLists.getAllLists()

  const allTaskContainer = document.createElement('div');
  allTaskContainer.classList.add('container');

  for (const list in allLists) {
    let currList = allLists[list]
    const listWrapper = document.createElement('div');
    const listName = document.createElement('h1')
    listName.classList.add('list-name');
    listName.textContent = list;
    listWrapper.appendChild(listName);

    for (const item in currList) {
      const task = createTask(listOfLists, currList, item);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.classList.add('delete');

      deleteButton.addEventListener('click', e => {
        console.log(item);
        console.log(list);
        listOfLists.deleteItem(list, item);
        listWrapper.removeChild(task);
      });

      task.appendChild(deleteButton);
      listWrapper.appendChild(task);
      allTaskContainer.appendChild(listWrapper);
    }

    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('add');

    addButton.addEventListener('click', e => {
      listOfLists.addItem(currList);
      const newTask = createTask(listOfLists, currList, currList.length - 1);
      listWrapper.appendChild(newTask);
    })
    allTaskContainer.appendChild(addButton);
  };


  return allTaskContainer;
}
