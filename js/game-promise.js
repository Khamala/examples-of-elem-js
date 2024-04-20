// ****************************Практика************************* \\
// Наше завдання написати програмне забезпечення для ігрового автомата
// Після натиснення на кнопку "Start game" в кожному віконці по черзі має з'являтись смайлик
// з затримкою в 1 секунду('🤑' або '👿')
// Під час обробки кожного віконця створи масив з Promis-ами в якому кожен з них буде відповідати
// за своє віконце, після чого оброби даний масив за допомогою методу Promise.allSettled
// Після того як всі віконця були заповнені потрібно щоб скріпт автоматично визначав чи гравець переміг,
// чи ні.Якщо в кожному віконці однаковий смайлик це означає що користувач переміг
// Виводить модальне вікно з повідомленням про статус гри ('Winner' або 'Loser')
// Для модального вікна використовуй бібліотеку basicLightbox
// Після повторного натискання на кнопку "Start game" поле має очищатись, а гра починатись з початку.



// 1. Сначала получить доступ к элементам управления, соответственно к нашим окошкам

const selectors = {
  startBtn: document.querySelector(".js-start"),
  container: document.querySelector(".js-container"),
};

// 2. Теперь для каждого окошка нужно создать промис.
// Обрабатываем клик по кнопке, считываем количество наших окошек и начинаем создавать промисы.

selectors.startBtn.addEventListener("click", handlerStart);

// Еще, если у нас в будущем будет изменяться количество окошек, надо это учесть. Т.е. нужно
// сразу создать универсальное решение.


function handlerStart() {
    // Поэтому мы можем считать, сколько у нас есть уже наших окошек. У нашего контейнера есть item-ы, т.е. его дети.
    // Поэтому, мы перебираем наши селекторы, нашего контейнера и на каждой итерации создаем для них промис

    const promises = [...selectors.container.children].map((_) =>
        createPromise()
        // В пустой массив распыляем детей нашего контейнера, чтобы потом использовать метод массива map
        // Нам на каждой итерации ничегоне нужно забирать, мы будем просто создавать промис. Но у нас есть условие, что мы должны
        // в метод map передать item, например
        // Если мы его напишем, но не применим, то .map((item) => просто при работе в тестовом режиме это ок, 
        // но при работе на проекте, это проблема. Т.к. линтер не пропустит переменную, которая не используется
        // Поэтому с помощью нижнего подчеркивания  можно проигнорировать данный параметр
        // Чтоб не лепить все в одну функцию, сделаем отдельную функцию для создания промиса
    );


    // Вот мы создали на каждой итерации наш промис, метод мар соберет их все в массив промисов
    // теперь нам нужно каким-то образом обрабатывать массив промисов.
    // Promise.allSettled() - ему без разницы, с каким статусом у вас отработал промис. Он возвращает массив объектов, 
    // где каждый объект - это промис, статус, с которым отработал промис - resolve или rejectю
    // Если промис был неуспешный, то ввторой ключ будет причина неуспешного промиса, а если успешный, 
    // то возвращается value, т.е.значение 
    
    Promise.allSettled(promises).then((items) => {
    // К нам наши item приходят в виде массива объектов, поэтому нужно перебрать. Поскольку ничего не нужно возвращать, 
    // то .forEach вполне подойдет
    
    items.forEach((item, i) => {
        // Первым действием нужно отрисовать результат выполнения промиса в нашем окошке. По очереди -
        // первый результат в первом окошке и т.д.
        // Именно поэтому, мы в параметры берем еще и индекс элемента i
        
        selectors.container.children[i].textContent = "";
        // И теперь, берем из нашего контейнера его детей по индексу
        // И на элементе итерации, т.к. смайла у нас 2, то будет или причина или его значение item.value || item.reason

        console.log(item);
        
        // НО нам нужна отрисовка по очереди
      setTimeout(() => {
        selectors.container.children[i].textContent = item.value || item.reason;

        if (i === items.length - 1) {
          const instance = basicLightbox.create(
            `<h1>${isWinner ? "Winner" : "Loser"}</h1>`
          );
          instance.show();
        }
      }, 1000 * (i + 1));
    });

    const isWinner =
      items.every(({ status }) => status === "fulfilled") ||
      items.every(({ status }) => status === "rejected");
  });


};

    // Итак, что она должна делать? Создавать resolve, reject, т.е. создавать промис и возвращать его.
    
    function createPromise() {
            // А если нам нужно что-то вернуть из функции, то сразу пишем return и создать экземпрляр класса промис
            // Внутрь нашего класса Promise передаем функцию executor.
        return new Promise((res, rej) => {
        
            // Дальше, нам нужно с какой-то вероятностью указывать, что у нас выпадает желтый смайлик или красный.
            // На самом деле в играх используется намного сложнее логика, НЕ Math.random()
        const random = Math.random();
            
            // Если значение, которое вернулось из Math.random() больше 0,5, то и потом если меньше 0,5
        if (random > 0.5) {
        res("🤑");
        } else {
        rej("😈");
        }
    });
        }
        
    
     
