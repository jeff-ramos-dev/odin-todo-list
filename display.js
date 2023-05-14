const nav = () => {
    const div = document.createElement('div');
    div.classList.add('nav')
    const menuBtn = document.createElement('button');
    menuBtn.classList.add('menu-btn');

    div.appendChild(menuBtn);
    
    return div
}

const sidebar = () => {
    const div = document.createElement('div');
    const timedLists = document.createElement('ul');
    const today = document.createElement('li');
    const thisWeek = document.createElement('li')
    const thisMonth = document.createElement('li') 
    const all = document.createElement('li');
    const myProjectsTitle = document.createElement('h3');
    const myProjects = document.createElement('ul');

    div.appendChild(timedLists);
    timedLists.appendChild(today);
    timedLists.appendChild(thisWeek);
    timedLists.appendChild(thisMonth);
    timedLists.appendChild(all);

    return div
}
