let user = {name: "John", age: 30};
localStorage.setItem("western-class", JSON.stringify(user));

let user2 = {name: "Jim", age: 30};
localStorage.setItem("user 2", JSON.stringify(user2));

let item = JSON.parse(localStorage.getItem("western-class"));


console.log(item);