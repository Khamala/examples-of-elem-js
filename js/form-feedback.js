/* У JS напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

1. Використовуючи делегуваня, відстежуй на формі подію input і щоразу записуй у локальне сховище об'єкт з полями email і message, 
у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, то заповнюй ними поля форми. 
В іншому випадку поля повинні бути порожніми.
3. Під час сабміту форми очищай сховище і поля форми, а також виводь у консоль об'єкт з полями email, 
message та їхніми поточними значеннями.
*/

/*
Есть форма фидбек с полем для ввода сообщения и кнопкой сабмит.
Задача - если пользователь заполнил форму, но не отправил, а перезагрузил страницу, то поле с сообщением не должно удаляться.
*/

const STORAGE_KEY = 'feedback-msg';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea'); // получаю доступ к textarea

// 2. Повесить событие на textarea, которое срабатывает на ввод в это поле

textarea.addEventListener("input", onTextareaInput);

// 3. Создаю обработчик события
    // Должны вытянуть из этого event строку, которую ввел пользователь.
    // Брать нужно НЕ св-во elements, т.к. это св-во формы, а мы повесили слушатель только на само поле textarea
    // У события есть свойство таргет, в котором есть свойство value - куда записывается значение, которое ввели
    
function onTextareaInput(e) {
    // Беру введенное значение из поля input или textarea
    const message = e.target.value;  // тип данных - строка

    // И теперь нужно записать это введенное в локал сторадж
    localStorage.setItem(STORAGE_KEY, message);
}

// 4. Теперь создаю доп функцию, которая будет получать сохраненное в локал сторадж значение и 

function updateTextareaContent() {
    
    const saveMessage = localStorage.getItem(STORAGE_KEY);
    // Если в локал сторадж нет свойства под таким ключем, то получу null
    // Поэтому я сделаю проверку
    if (saveMessage) {
        textarea.value = saveMessage;
    }
}

updateTextareaContent();

// 5. Теперь нужно повесить событие на саму форму для отправки по кнопке

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    // Знаем, что форма во время отправки перезагружает страницу, мы это отключаем
    e.preventDefault();

    // И теперь мне нужно очищать поле формы при отправке
    e.currentTarget.reset();

    // И теперь, после отправки, нет смысла хранить в сторрадж сообщение, поэтому его надо убрать
    localStorage.removeItem(STORAGE_KEY);
}

