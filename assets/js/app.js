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

let idActiveElemLast = null
let idActiveElemNext = null

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
    return title}

const createElement = (jsonObj, elem, classList, isTitle) => {
    elem.append(createImg(classList.img, jsonObj.img, jsonObj.size))
    if (isTitle) {
        elem.append(createSpan(classList.title, jsonObj.title))
    }
    return elem
}

const createElementLi = (elem, conteiner, isTitle, classList, className, isAction) => {
    let item = document.createElement('li')
    item.className = className
    item.id = elem.id
    if (isAction) {
        conteiner.append(createElement(elem, createActionEditState(item), classList, isTitle))
    } else {
        conteiner.append(createElement(elem, item, classList, isTitle))
    }
    
}

const createListElemLi = (jsonMas, conteiner, className, isTitle, classList, isAction) => {
    jsonMas.forEach(elem => {
        createElementLi(elem, conteiner, isTitle, classList, className, isAction)
    });
}

const editIdElement = (jsonMas, suffix) => {
    let jsonNewMass = jsonMas.map(item => {
        return {
            ...item, 
            id: item.id + suffix
        }
    })

    return jsonNewMass
}

const createActionAddClass = (elem, selector, activeClass) => {
    elem.onclick = () => {
        let item = document.querySelector(selector)
        if (item.classList.contains(activeClass)) {
            item.classList.remove(activeClass)
        } else {
            item.classList.add(activeClass)
        }
    }
}

const createActionEditState = (elem) => {
    elem.onclick = () => {
        idActiveElemNext = elem.id
        console.log(idActiveElemNext)
    }
    return elem
}

const loadData = () => {
    createElement(json.logo, logo, classListLogo, true)
    createListElemLi(json.iconsLeft, navLeft, 'nav_link', true, classListNavLink, false)
    createElement(json.coins, coins, classListCoins, true)
    createListElemLi(json.iconsRight, navRight, 'nav_link nav_link--right', false, classListNavLink, false)
}

const createMenu = () => {
    createElementLi(json.coins, menuRight, true, classListNavMenuLink, 'nav_menu_link')
    createListElemLi(json.iconsRight, menuRight, 'nav_menu_link', true, classListNavMenuLink, false)
    createListElemLi(editIdElement(json.iconsLeft, '_menu'), menuLeft, 'nav_menu_link', true, classListNavMenuLink, true)


    createElement(json.menuIcons[0],  menuIconMore, classListMenuIcon, true)
    createElement(json.menuIcons[1],  menuIconMobile, classListMenuIcon, false)
    createElement(json.menuIcons[2],  menuIconProfile, classListMenuIcon, false)

    createActionAddClass(menuIconMore, '.nav_menu_item--left', 'menu_active')
    createActionAddClass(menuIconMobile, '.nav_menu_item--left', 'menu_active')
    createActionAddClass(menuIconProfile, '.nav_menu_item--right', 'menu_active') 
}



loadData() // Инициализация приложения
createMenu() // Создание меню








