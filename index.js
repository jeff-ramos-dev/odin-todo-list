import todayPage from './today.js'
import monthPage from './month.js'
import sidebar from './sidebar.js'
import Lister from './Lister.js'
import allTasksContainer from './all-tasks.js'

function createExample() {
  const list = Lister();
  for (let i = 0; i < 4; i++) {
    if (i > 0) {
      list.createNewList();
      let currList = list.getAllLists()[`My List ${i + 1}`];
      list.deleteItem(`My List ${i + 1}`, 0);
      for (let j = 0; j < 5; j++) {
        list.addItem(currList);
        list.updateItem(
          currList,
          j,
          `My Title ${j + 1}`,
          `My Description ${j + 1}`,
          `May ${24 + j} 2023`,
          j + 1,
          false
        );
      };
    };
  };
  list.updateItem(
    list.getAllLists()["My List 2"],
    3,
    "Different Title",
    "Different Description",
    "June 6 2023",
    3,
    true
  );
  list.updateItem(
    list.getAllLists()["My List 3"],
    3,
    "Different Title",
    "Different Description",
    "May 6 2023",
    2,
    true
  );

  return list;
};

const exampleList = createExample();

let today = todayPage(exampleList);
today.classList.add('today-page', 'page');
today.style.display = 'none';

let month = monthPage(exampleList);
month.classList.add('month-page', 'page');
month.style.display = 'none';

let allTasks = allTasksContainer(exampleList);
allTasks.classList.add('allTasks-page', 'page');
allTasks.style.display = 'none';

const menu = sidebar();
const menuBtn = document.createElement('img');
menuBtn.classList.add('menu-btn');
menuBtn.src = './images/menu-icon.png';

menuBtn.addEventListener('click', e => {
  menu.sidebar.classList.toggle('show-sidebar');
});

menu.userListHeader.addEventListener('click', e => {
  if (document.querySelector('.today-page')) {
    document.body.removeChild(document.querySelector('.today-page'));
  } else if (document.querySelector('.allTasks-page')) {
    document.body.removeChild(document.querySelector('.allTasks-page'));
  };

  allTasks = allTasksContainer(exampleList);
  allTasks.classList.add('allTasks-page');
  allTasks.style.display = 'block';
  today.style.display = 'none';
  month.style.display = 'none';
  document.body.appendChild(allTasks);
});

menu.today.addEventListener('click', e => {
  if (document.querySelector('.today-page')) {
    document.body.removeChild(document.querySelector('.today-page'));
  } else if (document.querySelector('.allTasks-page')) {
    document.body.removeChild(document.querySelector('.allTasks-page'));
  };

  today = todayPage(exampleList);
  today.classList.add('today-page');
  today.style.display = 'block';
  allTasks.style.display = 'none';
  month.style.display = 'none';
  document.body.appendChild(today);
});

menu.thisMonth.addEventListener('click', e => {
  if (document.querySelector('.month-page')) {
    document.body.removeChild((document.querySelector('.month-page')));
  } else if (document.querySelector('.today-page')) {
    document.body.removeChild(document.querySelector('.today-page'));
  } else if (document.querySelector('.allTasks-page')) {
    document.body.removeChild(document.querySelector('.allTasks-page'));
  };

  month = monthPage(exampleList);
  month.classList.add('month-page');
  month.style.display = 'block';
  today.style.display = 'none';
  allTasks.style.display = 'none'
  document.body.appendChild(month);
});

document.body.appendChild(menu.sidebar);
document.body.appendChild(menuBtn);
