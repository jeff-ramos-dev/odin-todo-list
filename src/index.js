import todayPage from '../time-lists/today.js'
import weekPage from '../time-lists/week.js'
import monthPage from '../time-lists/month.js'
import sidebar from '../sidebar.js'
import Lister from '../Lister.js'
import allTasksContainer from '../all-tasks.js'
import '../style.css'
import menuIcon from '../images/menu-icon.png'

const header = document.createElement('header');
header.classList.add('header');
document.body.appendChild(header);
const title = document.createElement('h1');
title.classList.add('header-title');
title.textContent = 'Lister';
header.appendChild(title);

function createExample() {
  const list = Lister();
  for (let i = 0; i < 4; i++) {
    if (i > 0) {
      list.createNewList();
      let currList = `My List ${i + 1}`;
      list.deleteItem(currList, 0);
      for (let j = 0; j < 5; j++) {
        list.addItem(currList);
        list.updateItem(
          currList,
          j,
          `My Title ${j + 1}`,
          `My Description ${j + 1}`,
          new Date(2023, 4, j + 26),
          j + 1,
          false
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

const exampleList = createExample();

let today = todayPage(exampleList);
today.classList.add('today-page', 'page');
today.style.display = 'none';

let week = weekPage(exampleList);
week.classList.add('week-page', 'page');
week.style.display = 'none';

let month = monthPage(exampleList);
month.classList.add('month-page', 'page');
month.style.display = 'none';

let allTasks = allTasksContainer(exampleList);
allTasks.classList.add('allTasks-page', 'page');
allTasks.style.display = 'none';

const menu = sidebar(exampleList);
const menuBtn = document.createElement('img');
menuBtn.classList.add('menu-btn');
menuBtn.src = menuIcon

menuBtn.addEventListener('click', e => {
  menu.sidebar.classList.toggle('show-sidebar');
});

document.body.appendChild(menu.sidebar);
document.body.appendChild(menuBtn);
