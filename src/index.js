import { buildAllListsPage, buildTodayPage, buildMonthPage, buildWeekPage } from './pages.js'
import buildSidebar from './sidebar.js'
import Lister from './Lister.js'
import './style.css'
import menuIcon from '../images/menu-icon.png'

function createExample() {
  const list = Lister();

  for (let i = 0; i < 4; i++) {
    if (i > 0) {
      list.createNewList();
      let currListName = `My List ${i + 1}`;
      list.deleteItem(currListName, 0);
      for (let j = 0; j < 5; j++) {
        list.addItem(currListName);
        list.updateItem(
          currListName,
          j,
          `My Title ${j + 1}`,
          `My Description ${j + 1}`,
          new Date(2023, 4, j + 26),
          j + 1,
          false,
        );
      };
    };
  };

  list.updateItem(
    "My List 2",
    3,
    "Different Title",
    "Different Description",
    new Date(2023, 5, 6),
    3,
    true
  );
  list.updateItem(
    "My List 3",
    3,
    "Different Title",
    "Different Description",
    new Date(2023, 4, 6),
    2,
    true
  );

  return list;
};

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

const menu = buildSidebar(exampleListOfLists);
const menuBtn = document.querySelector('.menu-btn');
menuBtn.src = menuIcon

menuBtn.addEventListener('click', e => {
  if (menu.classList.contains('show-sidebar')) {
    document.body.style.marginLeft = '0';
    menuBtn.style.marginLeft = '0';
    document.querySelector('.header-title').style.transform = '';
  } else {
    document.body.style.marginLeft = '200px';
    menuBtn.style.marginLeft = '200px';
    document.querySelector('.header-title').style.transform = 'translateX(-50%)';
  }
  menu.classList.toggle('show-sidebar');

});
