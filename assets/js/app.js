var json = JSON.parse(getJsonData())
var logo = document.getElementById('logo')
var navLeft = document.getElementById('nav_left')
var coins = document.getElementById('coins')
var navRight = document.getElementById('nav_right')
var menuRight = document.getElementById('nav_menu_right')
var menuLeft = document.getElementById('nav_menu_left')
var menuIconProfile = document.getElementById('profile_menu')
var menuIconMore = document.getElementById('more_menu')
var menuIconMobile = document.getElementById('mobile_menu')
var activeElem = document.getElementById('active_elem_menu')


var classListLogo = {
    'img': 'header_logo_img',
    'title': 'header_logo_title'
}

var classListActiveTitle = {
    'img': 'active_title_img',
    'title': 'header_logo_title'
}

var classListNavLink = {
    'img': 'nav_link_img',
    'title': 'nav_link_title'
}

var classListMenuIcon = {
    'img': 'nav_menu_icon_img',
    'title': 'nav_link_title'
}

var classListNavMenuLink = {
    'img': 'nav_menu_img',
    'title': 'nav_menu_title'
}

var classListCoins = {
    'img': 'nav_link_coins',
    'title': 'nav_link_counter_coins'
}

var classMenuTitle = {
    'img': 'menu_title_img',
    'title': 'menu_title_text'
}

var currentElement = null

/* Базовые функции */
/* Создание изображения */
var createImg = function (className, src, classSize) { 
    var img = document.createElement('img')
    img.src = src
    img.className = className
    img.style.width = classSize
    img.style.height = classSize
    return img
}

/* Создание надписи изображения */
var createSpan = function (className, text) { 
    var title = document.createElement('span')
    title.innerHTML = text
    title.className = className
    return title
}

/* Создание элемента без дополнительной обертки */
var createElement = function (jsonObj, elem, classList, isTitle) {
    elem.append(createImg(classList.img, jsonObj.img, jsonObj.size))
    if (isTitle) {
        elem.append(createSpan(classList.title, jsonObj.title))
    }
    return elem
}

/* Создание элемента сдополнительной оберткой*/
var createElementLi = function (elem, conteiner, isTitle, classList, className, isAction) {
    var item = document.createElement('li')
    item.className = className
    item.id = elem.id
    if (isAction) {
        conteiner.append(createElement(elem, createActionEditState(item, 'menu_link_active', elem), classList, isTitle))
    } else {
        conteiner.append(createElement(elem, item, classList, isTitle))
    }   
}

/* Создание массива элементов с дополнительной оберткой */
var createListElemLi = function (jsonMas, conteiner, isTitle, classList, className, isAction) {
    for(var i = 0, len = jsonMas.length; i < len; i++) {
        createElementLi(jsonMas[i], conteiner, isTitle, classList, className, isAction)
    }
}

/* Изменение базовых id */
var editIdElement = function (jsonMas, suffix) {
    var jsonNewMass = jsonMas.map(function (item) {
        var mas = Object.assign({}, item)
        mas.id = item.id + suffix
        return mas
    })

    return jsonNewMass
}

/* Добавление активного класса */
var addClass = function (elem, activeClass) {
    if (elem.classList.contains(activeClass)) {
        elem.style.zIndex = 1
        elem.classList.remove(activeClass)
    } else {
        elem.style.zIndex = 3
        elem.classList.add(activeClass)
    }
}

/* Создание события клика для добавления активного класса */
var createActionAddClass = function (elem, selector, activeClass) {
    elem.onclick = function() {
        var element = document.querySelector(selector)
        addClass(element, activeClass)
    }
    return elem
}

/* Изменение текущего заголовка в мобильной версии */
var changeTitle = function (conteiner, elem) {
    if (conteiner.firstChild !== null) {
        conteiner.firstChild.remove()
    }
    createElementLi(editIdElement([elem], '_title')[0], conteiner, true, classMenuTitle, 'menu_title', false)
} 

/* Создание события клика для изменения состояния */
var createActionEditState = function (item, activeClass, elem) {
    item.onclick = function() {
        if (currentElement !== null) {
            currentElement.classList.remove(activeClass)
        }
        addClass(item, activeClass)
        currentElement = item
        changeTitle(activeElem, elem)
    }
    return item
}

/* Основные функции */
/* Функция загрузки данных */
var loadData = function () {
    createElement(json.logo, logo, classListLogo, true) // Создание лого
    createListElemLi(json.iconsLeft, navLeft, true, classListNavLink, 'nav_link', false) // Создание левой группы элементов
    createElement(json.coins, coins, classListCoins, true) // Создание элемента количества монет
    createListElemLi(json.iconsRight, navRight, false, classListNavLink, 'nav_link nav_link--right', false) // Создание правой группы элементов
}

/* Функция создания меню */
var createMenu = function () {
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








