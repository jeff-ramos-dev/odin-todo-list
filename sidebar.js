import userListPage from './userList.js'
import todayPage from './time-lists/today.js'
import weekPage from './time-lists/week.js'
import monthPage from './time-lists/month.js'
import allTasks from './all-tasks.js'

export default function sidebar(listOfLists) {
  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');
  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.textContent = 'X';
  closeBtn.classList.add('close');
  const timedLists = document.createElement('ul');
  timedLists.classList.add('timed-list-ul')
  const today = document.createElement('li');
  today.classList.add('list');
  today.textContent = 'Today';
  today.addEventListener('click', e => {
    document.querySelectorAll('.page').forEach(page => {
      if (page) {
        document.body.removeChild(page);
      }
    })

    const todayRoute = todayPage(listOfLists);
    todayRoute.classList.add('today-page', 'page');
    todayRoute.style.display = 'block';
    document.body.appendChild(todayRoute);
  })
  const thisWeek = document.createElement('li');
  thisWeek.classList.add('list');
  thisWeek.textContent = 'This Week';
  thisWeek.addEventListener('click', e => {
    document.querySelectorAll('.page').forEach(page => {
      if (page) {
        document.body.removeChild(page);
      }
    })

    const weekRoute = weekPage(listOfLists);
    weekRoute.classList.add('week-page', 'page');
    weekRoute.style.display = 'block';
    document.body.appendChild(weekRoute);
  })
  const thisMonth = document.createElement('li');
  thisMonth.classList.add('list');
  thisMonth.textContent = 'This Month';
  thisMonth.addEventListener('click', e => {
    document.querySelectorAll('.page').forEach(page => {
      if (page) {
        document.body.removeChild(page);
      }
    })

    const monthRoute = monthPage(listOfLists);
    monthRoute.classList.add('month-page', 'page');
    monthRoute.style.display = 'block';
    document.body.appendChild(monthRoute);
  })
  const userListHeader = document.createElement('h2');
  userListHeader.classList.add('list-header');
  userListHeader.textContent = 'User Lists';
  userListHeader.addEventListener('click', e => {
    document.querySelectorAll('.page').forEach(page => {
      if (page) {
        document.body.removeChild(page);
      }
    })

    const allTasksRoute = allTasks(listOfLists);
    allTasksRoute.classList.add('allTasks-page', 'page');
    allTasksRoute.style.display = 'block';
    document.body.appendChild(allTasksRoute);
  })
  const userLists = document.createElement('ul');
  for (const list in listOfLists.getAllLists()) {
    const userList = document.createElement('li');
    userList.classList.add('list');
    userList.textContent = list;
    userList.addEventListener('click', e => {
      console.log('clicked ', list)
      document.querySelectorAll('.page').forEach(page => {
        if (page) {
          document.body.removeChild(page);
        }
      })

      const listPage = userListPage(listOfLists, list);
      listPage.classList.add('list-page', 'page');
      listPage.style.display = 'block';
      document.body.appendChild(listPage);
    })
    userLists.appendChild(userList);
  }
  closeBtn.addEventListener('click', e => {
    sidebar.classList.toggle('show-sidebar');
  });
  document.addEventListener('click', e => {
    if (!sidebar.contains(e.target) && !e.target.classList.contains('menu-btn') && sidebar.classList.contains('show-sidebar')) {
      sidebar.classList.toggle('show-sidebar');
    }
  })
  const divider = document.createElement('div');
  divider.classList.add('divider');

  sidebar.appendChild(closeBtn);
  sidebar.appendChild(userListHeader);
  sidebar.appendChild(userLists);
  sidebar.appendChild(divider);
  sidebar.appendChild(timedLists);
  timedLists.appendChild(today);
  timedLists.appendChild(thisWeek);
  timedLists.appendChild(thisMonth);

  return { sidebar }
}
