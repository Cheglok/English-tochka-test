let options = [];
let users = [];

function selectImage(description) {
    if (description.includes('спецкурс')) {
        return 'special-course';
    } else if (description.includes('звонки')) {
        return 'calls';
    }
    return 'course';
}

const renderOptionsItem = (price, discount, text, image, id) => {
    return `<li class="options-list__item options-item options-item_${image}" id="product${id}">
        <div class="money options-item__money">
            <span class="money__value money__value_option-item">${price}</span>
            <img class="money__icon money__icon_option-item" src="images/icon-et.png" alt="ET" width="15"
                 height="13">
        </div>
        <p class="options-item__subject">
            <span class="options-item__discount">${discount}</span>${text}</p>
        <button class="options-item__button" value="${id}">Использовать скидку</button>
    </li>`
};

const renderOptionsList = (list, selector) => {
    let optionsList = list.map(item => {
        let {price, description, id} = item;
        let wordsArray = description.split(' ');
        let discount = wordsArray.shift();
        let text = wordsArray.join(' ');
        let image = selectImage(text);
        return renderOptionsItem(price, discount, text, image, id)
    });
    document.querySelector(selector).innerHTML = optionsList.join('');
    list.forEach(item => {
        selector = '#product' + item.id;
        document.querySelector(selector).addEventListener('click', e => {
            buy(e);
        })
    })
}


const buy = (e) => {
    e.target.classList.add('options-item__button_disabled');
}

fetch('http://localhost:5000/products')
    .then((resp) => resp.json())
    .then(data => {
        options = data;
        renderOptionsList(data, '.options-list');
    })
    .catch((error) => {
        console.log(error);
    });

fetch('http://localhost:5000/users')
    .then((resp) => resp.json())
    .then(data => {
        users = data;
    })
    .catch((error) => {
        console.log(error);
    });

const renderUserInfoItem = (price, text, product_id) => {
    return `<li class="user-info-list__item" id="${product_id}">
        <div class="money options-item__money">
            <span class="money__value money__value_option-item">${price}</span>
            <img class="money__icon money__icon_option-item" src="images/icon-et.png" alt="ET" width="15"
                 height="13">
        </div>
        <p class="options-item__subject">${text}</p>
    </li>`
}

const checkBoughtOptions = (list) => {
    let buttons = document.querySelectorAll('.options-item__button');
    buttons.forEach(button => {
        button.classList.remove('options-item__button_disabled');
    })
    list.forEach(item => {
        let {product_id} = item;
        let element = document.querySelector(`#product${product_id} .options-item__button`);
        element.classList.add('options-item__button_disabled');
        element.textContent = 'Уже использовано'
    })
}

const renderUserInfo = list => {
    let userIfo;
    if (list.length) {
        userIfo = '<h2>Ваши покупки:</h2>'
    } else {
        userIfo = '<h2>У вас пока нет покупок</h2>'
    }
    let optionsList = list.map(item => {
        let {price, description, product_id} = item;
        let wordsArray = description.split(' ');
        let text = wordsArray.join(' ');
        return renderUserInfoItem(price, text, product_id);
    });
    document.querySelector('#user-info').innerHTML = userIfo + optionsList.join('');
}

const renderUserCoins = (coins) => {
    document.querySelector('.money__value_balance').textContent = coins.coins_count;
}

const getUserInfo = () => {
    let login = document.forms.form.login.value
    fetch(`http://localhost:5000/users/${login}`)
        .then((resp) => resp.json())
        .then((data) => {
            renderUserInfo(data);
            checkBoughtOptions(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

const getUserCoins = () => {
    let login = document.forms.form.login.value
    fetch(`http://localhost:5000/users/coins/${login}`)
        .then((resp) => resp.json())
        .then((data) => {
            renderUserCoins(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

let form = document.querySelector('#form');

form.onsubmit = (e) => {
    e.preventDefault();
    getUserInfo();
    getUserCoins();
}
