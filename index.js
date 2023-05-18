import todayPage from './today.js'
import sidebar from './sidebar.js'
import Lister from './Lister.js'
import allTasksContainer from './all-tasks.js'

function createExample() {
  const list = Lister()
  list.createNewList();
  list.addItem(list.getAllLists()["My List"])
  list.updateItem(
    list.getAllLists()["My List"], 
    1, 
    "Task for Friday",
    "This is something I don't need to get done rn, but should do in the next couple days", 
    'May 19 2023', 
    4, 
    false
  )
  list.updateItem(
    list.getAllLists()["My List 2"],
    0, 
    "List 2 Task",
    "This is something I have to do for List 2", 
    undefined, 
    2, 
    true
  )
  console.log(list.getTodayList())

  return list
}

const exampleList = createExample()

let today = todayPage(exampleList);
today.classList.add('today-page', 'page');
today.style.display = 'none';

let allTasks = allTasksContainer(exampleList)
allTasks.classList.add('allTasks-page', 'page');
allTasks.style.display = 'none';
const menu = sidebar();

const menuBtn = document.createElement('img');
menuBtn.classList.add('menu-btn');
menuBtn.src = './images/menu-icon.png';

menuBtn.addEventListener('click', e => {
  menu.sidebar.classList.toggle('show-sidebar');
})

menu.userListHeader.addEventListener('click', e => {
  if (document.querySelector('.today-page')) {
    document.body.removeChild(document.querySelector('.today-page'))
  } else if (document.querySelector('.allTasks-page')) {
    document.body.removeChild(document.querySelector('.allTasks-page'))
  }

  allTasks = allTasksContainer(exampleList)
  allTasks.classList.add('allTasks-page');
  allTasks.style.display = 'block'
  today.style.display = 'none'
  document.body.appendChild(allTasks);
})

menu.today.addEventListener('click', e => {
  if (document.querySelector('.today-page')) {
    document.body.removeChild(document.querySelector('.today-page'))
  } else if (document.querySelector('.allTasks-page')) {
    document.body.removeChild(document.querySelector('.allTasks-page'))
  }

  today = todayPage(exampleList);
  today.classList.add('today-page');
  today.style.display = 'block'
  allTasks.style.display = 'none'
  document.body.appendChild(today);
})

document.body.appendChild(menu.sidebar);
document.body.appendChild(menuBtn);
