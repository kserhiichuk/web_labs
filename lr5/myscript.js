//1. Поміняйте місцями контент блоків «3» та «6».
function change_blocks_content() {
    var centerTop = document.querySelector('.center-top h3');
    var rightBottom = document.querySelector('.right-bottom p');

    if (centerTop && rightBottom) {
        var tempContent = centerTop.textContent;
        centerTop.textContent = rightBottom.textContent;
        rightBottom.textContent = tempContent;
    }
}

/*2. Напишіть функцію, яка обчислює площу паралелограма, беручи необхідні значення із відповідних змінних у скрипті, 
і виводить отриманий результат в кінці контенту в блоці «5».*/
function calculateParallelogramArea() {
    var baseLength = 11;
    var height = 6;

    var area = baseLength * height;

    var centerBottom = document.querySelector('.center-bottom');

    centerBottom.innerHTML += '<p>The area of the parallelogram is: ' + area + ' square units</p>';
}

/*3. Напишіть скрипт, який знаходить максимальну цифру у заданому натуральному числі, беручи
необхідне значення із відповідної форми в блоці «5», а отриманий результат виводить за допомогою
діалогового вікна і зберігає в cookies, причому:
    а) при оновленні веб-сторінки в броузері користувачу за допомогою діалогового вікна виводиться інформація, 
    збережена в cookies, із інформуванням, що після натискання кнопки «ОК» відбудеться видалення даних із cookies, 
    і не виводиться згадана вище форма;
    б) при натисканні кнопки «ОК» відповідні cookies видаляються, і виводиться наступне діалогове вікно із повідомленням,
    що cookies видалено, а натискання кнопки «ОК» перезавантажує веб-сторінку з початковим станом із наявною формою для введення даних.*/
function findMaxDigit() {
    var userInput = document.querySelector('.form_number .number').value;
    if (userInput !== null && !isNaN(userInput) && userInput !== "") {
        var maxDigit = Math.max(...userInput.toString().split('').map(Number));
        document.cookie = "maxDigit=" + maxDigit;
        alert("The maximum digit in the entered number is: " + maxDigit);
    } else {
        alert("Invalid input. Please enter a valid natural number.");
    }
}

function getCookies() {
    if (document.cookie !== '') {
        alert(document.cookie + "\nCookies will be deleted if you press OK.");
        deleteAllCookies();
        alert("Cookies deleted.");
    }
}

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

/*4 Напишіть скрипт, який при настанні події mouseout задає вирівнювання по правому краю вмісту блоків «2»,
 «4», «5» при встановленні користувачем відповідних радіокнопок у формі і зберігає відповідні значення в localStorage
 броузера так, щоб при наступному відкриванні сторінки властивості вирівнювання по правому краю вмісту блоків «2», «4», «5» 
 встановлювались із збережених значень в localStorage. */

function applyAlignment(element) {
    const radio = document.querySelector('input[name="alignment"]:checked');

    if (radio) {
        const alignment = radio.value;
        setElementAlignment(element, alignment);
    }
}

function setElementAlignment(element, alignment) {
    const elementClass = '.' + element.classList[0];
    localStorage.setItem(`alignment_${elementClass}`, alignment);

    // Traverse through the descendants and set the alignment
    element.querySelectorAll('*').forEach(function (descendant) {
        descendant.style.textAlign = alignment;
    });
}

function alignElements(){
    const elementsToAlign = ['.left', '.center-bottom', '.right-top'];

    elementsToAlign.forEach(function (elementClass) {
        const element = document.querySelector(elementClass);
        const alignment = localStorage.getItem(`alignment_${elementClass}`);

        if (alignment) {
            setElementAlignment(element, alignment);
        }
    });
}

/*5. Напишіть скрипт створення нумерованого списку:
    а) необхідні елементи форми появляються у відповідних номерних блоках (1..7) внаслідок події select
     на довільному контенті блоку;
    б) кількість пунктів нумерованого списку необмежена;
    в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані нумерованого списку
    зберігаються в localStorage броузера (структуровано на ваш розсуд), а сам список додається
    в кінці наявного вмісту відповідного номерного блока;
    г) перезавантаження веб-сторінки призводить до видалення нового вмісту із localStorage броузера. */

class OrderedList {
    constructor() {
        this.orderList = [];
    }

    createAndAppendElement(parent, elementType, attributes = {}, textContent) {
        const element = document.createElement(elementType);
        Object.assign(element, attributes);

        if (textContent) {
            element.appendChild(document.createTextNode(textContent));
        }

        parent.appendChild(element);
        return element;
    }

    addListForm(block) {
        const selectedText = window.getSelection().toString();
        if (selectedText !== "" && !document.getElementById('listForm')) {
            const form = this.createAndAppendElement(block, "form", { id: 'listForm' });

            this.createAndAppendElement(form, "label", { htmlFor: 'item', style: 'font-family: system-ui;' }, "Element of list:");
            const input = this.createAndAppendElement(form, "input", { type: 'text', id: 'item', name: 'item', required: true });
            const addButton = this.createAndAppendElement(form, "button", { type: 'button', style: 'font-family: system-ui;' }, "Add");
            addButton.addEventListener('click', () => this.addItem());

            const outputList = this.createAndAppendElement(block, "ol", { id: 'outputList', style: 'font-size: 14px;' });
        }
    }

    addItem() {
        const newItem = document.getElementById("item").value;
        if (!newItem.trim()) {
            alert("Please enter a valid item.");
            return;
        }

        document.getElementById("item").value = '';

        const outputList = document.getElementById("outputList");
        const listItem = this.createAndAppendElement(outputList, "li", {}, `${newItem}`);
        this.orderList.push(`${newItem}`);

        this.saveList();
    }

    saveList() {
        const listAsString = JSON.stringify(this.orderList);
        localStorage.setItem('orderedList', listAsString);
    }

    deleteList() {
        const inStorage = localStorage.getItem('orderedList');
        if (inStorage !== null) {
            const listArray = JSON.parse(inStorage);
            const listContent = listArray.map((item, index) => `${index + 1}. ${item}`).join('\n');
            alert(`\nList is removed from Local Storage\nList content:\n${listContent}`);
            localStorage.removeItem('orderedList');
        }
    }

}

function startEvents() {
    change_blocks_content();

    calculateParallelogramArea();

    alignElements();

    list.deleteList();
}


const list = new OrderedList();
startEvents();
