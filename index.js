import todayPage from './today.js'
import sidebar from './sidebar.js'
import allTasksFunc from './all-tasks.js'

const today = todayPage();
today.classList.add('today-page');
today.style.display = 'none';
const allTasksObject = allTasksFunc()
const allTasks = allTasksObject.allTaskContainer
allTasks.classList.add('allTasks-page');
allTasks.style.display = 'none';
const menu = sidebar();

const menuBtn = document.createElement('button');
menuBtn.type = 'button';
menuBtn.textContent = 'Menu';

menuBtn.addEventListener('click', e => {
  menu.sidebar.classList.toggle('show-sidebar');
})

menu.userListHeader.addEventListener('click', e => {
  allTasks.style.display = 'block'
  today.style.display = 'none'
})

menu.today.addEventListener('click', e => {
  today.style.display = 'block'
  allTasks.style.display = 'none'
})

document.body.appendChild(menu.sidebar);
document.body.appendChild(menuBtn);
document.body.appendChild(allTasks);
document.body.appendChild(today);