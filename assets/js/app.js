const json = JSON.parse(getJsonData())
const logo = document.getElementById('logo')
const navLeft = document.getElementById('nav_left')
const coins = document.getElementById('coins')
const navRight = document.getElementById('nav_right')
const menuRight = document.getElementById('nav_menu_right')
const menuIconRight = document.getElementById('nav_menu_title_right')

const classListLogo = {
    'img': 'header_logo_img',
    'title': 'header_logo_title'
}

const classListNavLink = {
    'img': 'nav_link_img',
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

const createImg = (className, src, classSize) => {
    let img = document.createElement('img')
    img.src = src
    img.className = className
    img.style.width = classSize
    img.style.height = classSize
    return img
}

const createSpan = (className, text) => {
    let title = document.createElement('span')
    title.innerHTML = text
    title.className = className
    return title
}

const createElement = (jsonObj, elem, classList, isTitle) => {
    elem.append(createImg(classList.img, jsonObj.img, jsonObj.size))
    if (isTitle) {
        elem.append(createSpan(classList.title, jsonObj.title))
    }
    return elem
}

const createListElemLi = (jsonMas, conteiner, className, isTitle, classList) => {
    jsonMas.forEach(elem => {
        let item = document.createElement('li')
        item.className = className
        item.id = elem.id
        conteiner.append(createElement(elem, item, classList, isTitle))
    });
}

const loadData = () => {
    createElement(json.logo, logo, classListLogo, true)
    createListElemLi(json.iconsLeft, navLeft, 'nav_link', true, classListNavLink)
    createElement(json.coins, coins, classListCoins, true)
    createListElemLi(json.iconsRight, navRight, 'nav_link nav_link--right', false, classListNavLink)
}

const createMenu = () => {
    let item = document.createElement('li')
    item.className = 'nav_menu_link'
    menuRight.append(createElement(json.coins, item, classListNavMenuLink, true))

    createListElemLi(json.iconsRight, menuRight, 'nav_menu_link', true, classListNavMenuLink)

    createElement(json.menuIcons[0], menuIconRight, classListNavLink, false)
}

loadData() // Инициализация приложения
createMenu() // Создание меню








