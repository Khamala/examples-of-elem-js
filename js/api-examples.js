/*
Створи застосунок пошуку зображень за ключовим словом і їх перегляду в галереї. 
Додай оформлення елементів інтерфейсу згідно з макетом.

Поиск изображений по ключевому слову. Делает - галлерею
*/

//  JSONPlaceholder API. Це публічний REST API для швидкого прототипування,
// який надає кілька різних колекцій уявних даних. Для локального тестирования
// Возвращает данные в JSON формате

// <https://jsonplaceholder.typicode.com/users>

// 1. Например,
// делаем запрос на вебсервис для получения условной коллекции пользователей(ресурс / users).
// Т.к. fetch возвращает промис, то на результате его вызова вызываем цепочку методов then() і catch() 
// для обработки ответа.
/**/
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    // Response handling
  })
  .then(data => {
    // Data handling
  })
  .catch(error => {
    // Error handling
  });

// 2. Пример.
// первом методе then() выполняется проверка статуса ответа и преобразование данных
// в правильный формат(парсинг) в случае успешного результата или явное создание ошибки,
// чтобы обработать неуспешный HTTP - запрос в методе catch ().


fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    // Data handling
		console.log(data);
  })
  .catch(error => {
    // Error handling
		console.log(error);
  });



// 3. Получить с jsonplaceholder.typicode.com массив пользователей и отрисовать его в интерфейсе,
// без перезагрузки страницы
// При клике на кнопку Fetch users выполняем HTTP-запрос с помощью fetch

const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");

fetchUsersBtn.addEventListener("click", () => {

    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((users) => {
        // Дані від бекенда
        // Во втором блоке then мы получили доступ к данным, которые пришли в ответе с бэка.
        // В нем можно теперь создать HTML-разметку и добавить ее в DOM в какой-то уже существующий элемент,
        // чтобы обновить и нтерфейс
        // Например так
            const markup = users.map((user) => {
                return `<li>
                <p><b>Name</b>: ${user.name}</p>
                <p><b>Email</b>: ${user.email}</p>
                </li>`;
            })
            .join("");

			userList.insertAdjacentHTML("beforeend", markup);
		})
    .catch((error) => console.log(error));
});





