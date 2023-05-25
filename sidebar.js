export default function sidebar() {
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
  const thisWeek = document.createElement('li');
  thisWeek.classList.add('list');
  thisWeek.textContent = 'This Week';
  const thisMonth = document.createElement('li');
  thisMonth.classList.add('list');
  thisMonth.textContent = 'This Month';
  const userListHeader = document.createElement('h2');
  userListHeader.classList.add('list-header');
  userListHeader.textContent = 'User Lists';
  const userLists = document.createElement('ul');
  const myList = document.createElement('li');
  myList.classList.add('list');
  myList.textContent = 'My List';
  const myList2 = document.createElement('li');
  myList2.classList.add('list');
  myList2.textContent = 'My List 2';

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
  userLists.appendChild(myList);
  userLists.appendChild(myList2);
  sidebar.appendChild(divider);
  sidebar.appendChild(timedLists);
  timedLists.appendChild(today);
  timedLists.appendChild(thisWeek);
  timedLists.appendChild(thisMonth);

  return { sidebar, today, thisMonth, userListHeader }
}

