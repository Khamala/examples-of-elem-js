// Если инициализировать экзкмпляр класса  и не передать ничего в конструктор,
// то будет всегда текущая текущпая датиа.
/*
const currentDdate = new Date();
console.log(currentDdate);

// До конца акции осталось .... часов, дней и т.д.

const targetDate = new Date('04-22-2024');
console.log(targetDate);

console.log(targetDate - currentDdate);
*/

// ПРАКТИКА

const arrDay = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота',
];

const namesOfMonth = [
    'Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь',
];


// Необходимо реализовать пример даты и электронных и механических часов
// 1. Заполним дату. Для этого сначала получим наши селекторы.
// Создаем наш объект элементов

const elements = {
    day: document.querySelector(".date-day"),
    date: document.querySelector(".date"),
    month: document.querySelector(".date-month"),
    year: document.querySelector(".date-year"),
    digitalClock: document.querySelector('.digital-clock'),

    // Механические часы
    secondsArrow: document.querySelector('.clock-seconds__arrow'),
    minutesArrow: document.querySelector('.clock-minutes__arrow'),
    hoursArrow: document.querySelector('.clock-hours__arrow'),
};

/*
// Нужно получить сегодняшнее текущее время

const currentTime = new Date();


// На экземпляре класса вызываем метод getDay()
// Метод getDay() возвращает значение от 0 до 6ти, начиная с вс. Итак, текущий день

const currentDay = arrDay[currentTime.getDay()] // currentTime.getDay() Порядковый номер дня недели

// Теперь, мы можем пойти и изменить текстовый контент

// Следующее - значение месяца. Но т.к. нужно много переменных, это не удобно, поэтому создадим один объект

const current = {
    day: arrDay[currentTime.getDay()],
    date: currentTime.getDate(),
    month: namesOfMonth[currentTime.getMonth()],
    year: currentTime.getFullYear(),
}

elements.day.textContent = current.day;
elements.date.textContent = current.date;
elements.month.textContent = current.month;
elements.year.textContent = current.year;
*/
// Мы указали статичные значения. И эти значения будут обновляться тольков том случае,
// если будет перезаагружаться страница, js начнет снова выполняться и получит новое значение currentTime
// Поэтому при работе с датой, нужно обновлять значение, каждую секнду.
// Для этого обернем все в setInterval()

setInterval(() => {
    const currentTime = new Date();

    const current = {
        day: arrDay[currentTime.getDay()],
        date: currentTime.getDate(),
        month: namesOfMonth[currentTime.getMonth()],
        year: currentTime.getFullYear(),
        hours: currentTime.getHours(),
        minutes: currentTime.getMinutes(),
        seconds: currentTime.getSeconds(),
    };

    elements.day.textContent = current.day;
    elements.date.textContent = current.date;
    elements.month.textContent = current.month;
    elements.year.textContent = current.year;
    elements.digitalClock.textContent = `Текущее время 
    ${formatTime(current.hours)}:${formatTime(current.minutes)}:${formatTime(current.seconds)}`;

    // Механические часы
    const secondsDeg = 360 / 60 * current.seconds; // За 1 секунду секундная стрелка проходит оторезок дуги в 6 градусов
    elements.secondsArrow.style.transform = `rotate(${secondsDeg}deg)`;

    const minutesDeg = 360 / 60 * current.minutes;
    elements.minutesArrow.style.transform = `rotate(${minutesDeg}deg)`;

    const hoursDeg = 360 / 12 * current.hours + 360 / 12 /60 * current.minutes;
    elements.hoursArrow.style.transform = `rotate(${hoursDeg}deg)`;


}, 1000);

// Чтобы часы  - не прыгали, дополним строку с помощью метода padStart().
// Но, т.к тип данных у нас в часах - числа, а padStart() работает со строками, то нужно привести к строке
// padStart(2,'0')  - максимальна длина строки 2, чем дополнить? 0
// Чтобы не замусоривать код, сделаем для этого ченнинга функцию
// Она будет принимать текущее значение и возвращать его с поджстановкой нулей
// Эта функция должна быть вне инт ервала, чтобы каждый раз не происходило её декларирование

function formatTime(value) {
    return value.toString().padStart(2, '0');
};

                    // МЕХАНИЧЕСКИЕ ЧАСЫ
// Циферблат - это backgraund images. И есть три дива, на три стрелки. Они все спозиционированы и прикреплены к цкентру экрана
// Доступ к стрелкам. Значение часов, минут и секнд есть тоже уже. Мы можем задавать им значение градусов, чтобы они двигались
/*
// 1. Создадим количество градусов для наших секунд

const secondsDeg = 360 / 60 * current.seconds;
console.log(secondsDeg);

// А часовая стрелка не за час проходит оборот, а за 12 часов
// А также, маленькая стрелка в каждом часе тоже двигается, поэтому нужно привязаться к минутной стрелке.
*/



// Чтобы пришить это на сайт, нужно это как класс создать. и потом ини циализировать новый экземпляр класса, 
// прописать для него селекторы и все















            
