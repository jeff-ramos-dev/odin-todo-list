import { buildAllListsPage, buildTodayPage, buildMonthPage, buildWeekPage } from './pages.js'
import buildSidebar from './sidebar.js'
import createExample from './example.js'
import './style.css'
import menuIcon from '../images/menu-icon.png'

const exampleListOfLists = createExample();

let today = buildTodayPage(exampleListOfLists);
today.classList.add('today-page', 'page');
today.style.display = 'none';

let week = buildWeekPage(exampleListOfLists);
week.classList.add('week-page', 'page');
week.style.display = 'none';

let month = buildMonthPage(exampleListOfLists);
month.classList.add('month-page', 'page');
month.style.display = 'none';

let allTasks = buildAllListsPage(exampleListOfLists);
allTasks.classList.add('allTasks-page', 'page');
allTasks.style.display = 'none';

const sidebar = buildSidebar(exampleListOfLists);
const sidebarBtn = document.querySelector('.sidebar-btn');
sidebarBtn.src = menuIcon

sidebarBtn.addEventListener('click', e => {
  if (sidebar.classList.contains('show-sidebar')) {
    document.body.style.marginLeft = '0';
    sidebarBtn.style.marginLeft = '0';
    document.querySelector('.header-title').style.transform = '';
  } else {
    document.body.style.marginLeft = '200px';
    sidebarBtn.style.marginLeft = '200px';
    document.querySelector('.header-title').style.transform = 'translateX(-50%)';
  }
  sidebar.classList.toggle('show-sidebar');
});

document.addEventListener('mousedown', e => {
  const modal = document.querySelector('.modal')
  if (modal && !e.target.classList.contains('note')) {
    if (e.target !== modal &&
      e.target !== document.querySelector('.inner-modal') &&
      e.target !== document.querySelector('.todoNote')) {
      document.body.removeChild(modal)
    }
  }
})
