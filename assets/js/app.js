const json = JSON.parse(getJsonData())
const logo = document.getElementById('logo')
const navLeft = document.getElementById('nav_left')
const coins = document.getElementById('coins')
const navRight = document.getElementById('nav_right')
const menuRight = document.getElementById('nav_menu_right')
const menuLeft = document.getElementById('nav_menu_left')
const menuIconProfile = document.getElementById('profile_menu')
const menuIconMore = document.getElementById('more_menu')
const menuIconMobile = document.getElementById('mobile_menu')
const activeElem = document.getElementById('active_elem_menu')


const classListLogo = {
    'img': 'header_logo_img',
    'title': 'header_logo_title'
}

const classListActiveTitle = {
    'img': 'active_title_img',
    'title': 'header_logo_title'
}

const classListNavLink = {
    'img': 'nav_link_img',
    'title': 'nav_link_title'
}

const classListMenuIcon = {
    'img': 'nav_menu_icon_img',
    'title': 'nav_link_title'
}

const classListNavMenuLink = {
    'img': 'nav_menu_img',
    'title': 'nav_menu_title'
}

const classListCoins = {
    'img': 'nav_link_coins',
    'title': 'nav_link_counter_coins'
}

const classMenuTitle = {
    'img': 'menu_title_img',
    'title': 'menu_title_text'
}

/* Базовые функции */

/* Создание изображения */
const createImg = (className, src, classSize) => { 
    let img = document.createElement('img')
    img.src = src
    img.className = className
    img.style.width = classSize
    img.style.height = classSize
    return img
}

/* Создание надписи изображения */
const createSpan = (className, text) => { 
    let title = document.createElement('span')
    title.innerHTML = text
    title.className = className
    return title
}

/* Создание элемента без дополнительной обертки */
const createElement = (jsonObj, elem, classList, isTitle) => {
    elem.append(createImg(classList.img, jsonObj.img, jsonObj.size))
    if (isTitle) {
        elem.append(createSpan(classList.title, jsonObj.title))
    }
    return elem
}

/* Создание элемента сдополнительной оберткой*/
const createElementLi = (elem, conteiner, isTitle, classList, className, isAction) => {
    let item = document.createElement('li')
    item.className = className
    item.id = elem.id
    if (isAction) {
        conteiner.append(createElement(elem, createActionEditState(item, 'menu_link_active', elem), classList, isTitle))
    } else {
        conteiner.append(createElement(elem, item, classList, isTitle))
    }   
}

/* Создание массива элементов с дополнительной оберткой */
const createListElemLi = (jsonMas, conteiner, isTitle, classList, className, isAction) => {
    jsonMas.forEach(elem => {
        createElementLi(elem, conteiner, isTitle, classList, className, isAction)
    });
}

/* Изменение базовых id */
const editIdElement = (jsonMas, suffix) => {
    let jsonNewMass = jsonMas.map(item => {
        return {
            ...item, 
            id: item.id + suffix
        }
    })

    return jsonNewMass
}

/* Добавление активного класса */
const addClass = (elem, activeClass) => {
    if (elem.classList.contains(activeClass)) {
        elem.style.zIndex = 1
        elem.classList.remove(activeClass)
    } else {
        elem.style.zIndex = 3
        elem.classList.add(activeClass)
    }
}

/* Создание события клика для добавления активного класса */
const createActionAddClass = (elem, selector, activeClass) => {
    elem.onclick = () => {
        let item = document.querySelector(selector)
        addClass(item, activeClass)
    }
    return elem
}

/* Изменение текущего заголовка в мобильной версии */
const changeTitle = (conteiner, elem) => {
    if (conteiner.firstChild !== null) {
        conteiner.firstChild.remove()
    }
    createElementLi(editIdElement([elem], '_title')[0], conteiner, true, classMenuTitle, 'menu_title', false)
} 

/* Создание события клика для изменения состояния */
const createActionEditState = (item, activeClass, elem) => {
    item.onclick = () => {
        addClass(item, activeClass)
        changeTitle(activeElem, elem)
    }
    return item
}

/* Основные функции */
/* Функция загрузки данных */
const loadData = () => {
    createElement(json.logo, logo, classListLogo, true) // Создание лого
    createListElemLi(json.iconsLeft, navLeft, true, classListNavLink, 'nav_link', false) // Создание левой группы элементов
    createElement(json.coins, coins, classListCoins, true) // Создание элемента количества монет
    createListElemLi(json.iconsRight, navRight, false, classListNavLink, 'nav_link nav_link--right', false) // Создание правой группы элементов
}

/* Функция создания меню */
const createMenu = () => {
    /* Создание элементов меню */
    createElementLi(json.coins, menuRight, true, classListNavMenuLink, 'nav_menu_link')
    createListElemLi(json.iconsRight, menuRight, true, classListNavMenuLink, 'nav_menu_link', false)
    createListElemLi(editIdElement(json.iconsLeft, '_menu'), menuLeft, true, classListNavMenuLink, 'nav_menu_link', true)

    /*Создание элеметов свернутого меню(иконок)*/
    createElement(json.menuIcons[0],  menuIconMore, classListMenuIcon, true)
    createElement(json.menuIcons[1],  menuIconMobile, classListMenuIcon, false)
    createElement(json.menuIcons[2],  menuIconProfile, classListMenuIcon, false)

    /* Создание событий для показа меню по клику*/
    createActionAddClass(menuIconMore, '.nav_menu_item--left', 'menu_active')
    createActionAddClass(menuIconMobile, '.nav_menu_item--left', 'menu_active')
    createActionAddClass(menuIconProfile, '.nav_menu_item--right', 'menu_active')
}



loadData() // Инициализация приложения
createMenu() // Создание меню








