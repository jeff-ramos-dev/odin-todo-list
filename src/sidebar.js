import { buildAllListsPage, buildUserListPage, buildTodayPage, buildWeekPage, buildMonthPage } from './pages.js'

export default function buildSidebar(listOfLists) {
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close');
  const timedLists = document.querySelector('.timed-list-ul');
  const today = document.querySelector('.today-list');
  today.addEventListener('click', e => {
    document.querySelectorAll('.page').forEach(page => {
      if (page) {
        document.body.removeChild(page);
      }
    })

    const todayPage = buildTodayPage(listOfLists);
    todayPage.classList.add('today-page', 'page');
    todayPage.style.display = 'block';
    document.body.appendChild(todayPage);
  })
  const thisWeek = document.querySelector('.week-list');
  thisWeek.addEventListener('click', e => {
    document.querySelectorAll('.page').forEach(page => {
      if (page) {
        document.body.removeChild(page);
      }
    })

    const weekPage = buildWeekPage(listOfLists);
    weekPage.classList.add('week-page', 'page');
    weekPage.style.display = 'block';
    document.body.appendChild(weekPage);
  })
  const thisMonth = document.querySelector('.month-list');
  thisMonth.addEventListener('click', e => {
    document.querySelectorAll('.page').forEach(page => {
      if (page) {
        document.body.removeChild(page);
      }
    })

    const monthPage = buildMonthPage(listOfLists);
    monthPage.classList.add('month-page', 'page');
    monthPage.style.display = 'block';
    document.body.appendChild(monthPage);
  })
  const userListHeader = document.querySelector('.list-header');
  userListHeader.addEventListener('click', e => {
    document.querySelectorAll('.page').forEach(page => {
      if (page) {
        document.body.removeChild(page);
      }
    })

    const allListsPage = buildAllListsPage(listOfLists);
    allListsPage.classList.add('allTasks-page', 'page');
    allListsPage.style.display = 'block';
    document.body.appendChild(allListsPage);
  })

  const userLists = document.querySelector('.user-lists');

  for (const list in listOfLists.getAllLists()) {
    const userList = document.createElement('li');
    userList.classList.add('list');
    userList.textContent = list;
    userList.addEventListener('click', e => {
      document.querySelectorAll('.page').forEach(page => {
        if (page) {
          document.body.removeChild(page);
        }
      })
      const userListPage = buildUserListPage(listOfLists, list);
      userListPage.classList.add('list-page', 'page');
      userListPage.style.display = 'block';
      document.body.appendChild(userListPage);
    })
    userLists.appendChild(userList);
  }

  closeBtn.addEventListener('click', e => {
    sidebar.classList.toggle('show-sidebar');
  });

  document.addEventListener('click', e => {
    if (!sidebar.contains(e.target) &&
      !e.target.classList.contains('menu-btn') &&
      sidebar.classList.contains('show-sidebar')) {
      sidebar.classList.toggle('show-sidebar');
    }
  })

  const divider = document.querySelector('.divider');
  divider.classList.add('divider');

  sidebar.appendChild(closeBtn);
  sidebar.appendChild(userListHeader);
  sidebar.appendChild(userLists);
  sidebar.appendChild(divider);
  sidebar.appendChild(timedLists);
  timedLists.appendChild(today);
  timedLists.appendChild(thisWeek);
  timedLists.appendChild(thisMonth);

  return sidebar
}
