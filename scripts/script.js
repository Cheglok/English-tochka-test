let options = [];
let user = {};
let user_id = null;
let user_coins = null;
let userSpentMoney = 0;
let user_login = '';

async function byuOption(url= '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    return response.json();
}

const buy = (e) => {
    if(!user_id) {
        return alert("Вы должны войти под своим логином!");
    } else if(e.target.classList.contains('options-item__button_disabled')) {
        return alert("Вы уже приобрели эту опцию!");
    }else if(user_coins < e.target.dataset.price) {
        return alert("У вас недостаточно средств!");
    }else {
        e.target.classList.add('options-item__button_disabled');
        e.target.textContent = "Уже использовано";
        const url = 'http://localhost:5000/orders';
        let data ={
            product_id: e.target.value,
            user_id: user_id
        };
        byuOption(url, data).then(() => {
            freshUserInfo(user_login);
        });
    }
}

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
        let {product_id, price} = item;
        userSpentMoney += price;
        let element = document.querySelector(`#product${product_id} .options-item__button`);
        element.classList.add('options-item__button_disabled');
        element.textContent = 'Уже использовано'
    })
}

const renderUserDetails = (coins, login) => {
    document.querySelector('.money__value_balance').textContent = coins;
    document.querySelector('.main-header').innerHTML = `<h3>Добро пожаловать ${login}</h3>
           <a href="index.html">выйти</a>`;
}

const checkUser = async (login) => {
    await fetch(`http://localhost:5000/users/${login}`)
        .then((resp) => resp.json())
        .then((data) => {
            if(!data[0]) {
                alert('Пользователь не найден');
                return false;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

const getUserOptions = async (login) => {
    await fetch(`http://localhost:5000/users/options/${login}`)
        .then((resp) => resp.json())
        .then((data) => {
            checkBoughtOptions(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

const getUserCoins = async (login) => {
    await fetch(`http://localhost:5000/users/coins/${login}`)
        .then((resp) => resp.json())
        .then((data) => {
            user_id = data.user_id;
            user_login = data.login;
            user_coins = data.coins_count - userSpentMoney;
            renderUserDetails(user_coins, user_login);
        })
        .catch((error) => {
            console.log(error);
        });
}

const freshUserInfo = (login) => {
    userSpentMoney = 0;
    checkUser(login).then(() => getUserOptions(login).then(() => getUserCoins(login)));
}

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
        <button class="options-item__button" data-price="${price}" value="${id}">Использовать скидку</button>
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

const getProducts = async () => {
    await fetch('http://localhost:5000/products')
        .then((resp) => resp.json())
        .then(data => {
            options = data;
            renderOptionsList(data, '.options-list');
        })
        .catch((error) => {
            console.log(error);
        });
}

const createHandlers = () => {
    let instructionOpen = document.querySelector('.options__instruction-button');
    instructionOpen.addEventListener('click', showInstruction);
    let closeInstruction = document.querySelector('.modal-instruction__close-button');
    closeInstruction.addEventListener('click', hideInstruction);
};

const showInstruction = () => {
    let instruction = document.querySelector('.modal-instruction');
    instruction.classList.remove('visually-hidden');
}

const hideInstruction = () => {
    let instruction = document.querySelector('.modal-instruction');
    instruction.classList.add('visually-hidden');
}

const init = () => {
    getProducts();
    createHandlers();
    let form = document.querySelector('#form');
    form.onsubmit = (e) => {
        e.preventDefault();
        let login = form.login.value;
        freshUserInfo(login);
    }
}

init();

