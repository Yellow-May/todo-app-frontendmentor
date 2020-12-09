// state arrays
// htmlTodos for all todo task items
// htmlActiveTodos for all active todo task items
// htmlCompletedTodos for all completed todo task items
let htmlTodos = [];
let htmlActiveTodos = [];
let htmlCompletedTodos = [];

// array of hardcoded todo task
const hardCodedTodos = [
  { id: "1", completed: true, title: "Completed online javascript course" },
  { id: "2", completed: false, title: "Jog around the park 3x" },
  { id: "3", completed: false, title: "10 minutes meditation" },
  { id: "4", completed: false, title: "Read for 1 hour" },
  { id: "5", completed: false, title: "Pick up groceries" },
  { id: "6", completed: false, title: "Complete Todo App on Frontend Mentor" },
];

// reusuable functions
// check the number active todo item and update the count
// reusuable filter method to switch the active state from "all", "active" and completed
// create a new todo Dom node Item that can be use for appending into the dom
// add a new todo Dom node to one of the following "state" arrays, "htmlTodos", "htmlActiveTodos" or "htmlCompletedTodso"
// update the position of the elements after a drag event takes place
// update the "state" arrays "htmlActiveTodos" and "htmlCompletedTodos" from the "htmlTodos" array
// render method that accepts one of the "state" arrays to render on the screen as the todo task items
const checkCount = () => {
  if (todoList.querySelectorAll(".todo-item:not(.completed)").length !== 0) {
    itemCount.textContent = todoList.querySelectorAll(
      ".todo-item:not(.completed)"
    ).length;
  } else {
    itemCount.textContent = 0;
  }
};

const filterSet = (on = allBtn, off1 = activeBtn, off2 = completedBtn) => {
  on.classList.add("on");
  off1.classList.remove("on");
  off2.classList.remove("on");
};

const createTodoItem = (todo) => {
  let mainDiv = document.createElement("div");
  mainDiv.className = "todo-item todo-box";
  mainDiv.dataset.id = todo.id;
  mainDiv.draggable = true;
  todo.completed && mainDiv.classList.add("completed");

  let checkDiv = document.createElement("div");
  checkDiv.className = "check";
  let checkDivInput = document.createElement("input");
  checkDivInput.type = "checkbox";
  checkDivInput.title = "mark task complete";
  checkDivInput.className = "mark-complete";
  checkDivInput.checked = todo.completed && true;
  let checkDivSpan = document.createElement("span");
  checkDiv.append(checkDivInput, checkDivSpan);

  let titleDiv = document.createElement("div");
  titleDiv.className = "todo-title";
  titleDiv.innerText = todo.title;

  let closeBtn = document.createElement("button");
  closeBtn.className = "close";
  closeBtn.name = "undefined";
  let closeBtnObject = document.createElement("object");
  closeBtnObject.data = "./images/icon-cross.svg";
  closeBtnObject.type = "image/svg+xml";
  closeBtnObject.innerText = "your browser does not support this svg";
  closeBtn.append(closeBtnObject);

  mainDiv.append(checkDiv, titleDiv, closeBtn);

  return mainDiv;
};

const addTodo = (todo, htmlArr) => {
  switch (htmlArr) {
    case htmlTodos:
      htmlTodos = [...htmlTodos, todo];
      break;
    case htmlActiveTodos:
      htmlActiveTodos = [...htmlActiveTodos, todo];
      break;
    case htmlCompletedTodos:
      htmlCompletedTodos = [...htmlCompletedTodos, todo];
      break;
    default:
      break;
  }
};

const updateDragHtmlArrs = () => {
  if (allBtn.classList.contains("on")) {
    htmlTodos = [...todoList.querySelectorAll(".todo-item")];
  } else if (activeBtn.classList.contains("on")) {
    htmlActiveTodos = [...todoList.querySelectorAll(".todo-item")];
  } else if (completedBtn.classList.contains("on")) {
    htmlCompletedTodos = [...todoList.querySelectorAll(".todo-item")];
  }
};

const updateHtmlArrs = () => {
  htmlActiveTodos = htmlTodos.filter(
    (item) => !item.classList.contains("completed")
  );
  htmlCompletedTodos = htmlTodos.filter((item) =>
    item.classList.contains("completed")
  );
};

const render = (htmlArr) => {
  todoList.querySelectorAll(".todo-item").forEach((item) => item.remove());
  htmlArr.forEach((html) => todoList.append(html));
  checkCount();
};

// Todo Ui class
// add new todo method
// load the hardcoded todos
// dark and light mode toggle method
// desktop drag event
// mark todo task complete method
// remove todo from the array
// filter methods
// clear all completed todo task from the array method
class UITodo {
  constructor() {
    this.addNewTodo();
    this.loadHardCodeTodos();
    this.timeToggle();
    this.desktopDragEvent();
    this.markComplete();
    this.removeTodo();
    this.filterOn();
    this.clearAllCompleted();
  }

  addNewTodo = () => {
    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (inputedTodo.value !== "") {
        let todo = {
          id:
            Math.random() * 1000 +
            inputedTodo.value.split(" ").join("").toLowerCase(),
          title: inputedTodo.value,
          completed: false,
        };
        inputedTodo.value = "";

        let newTodoItem = createTodoItem(todo);

        addTodo(newTodoItem, htmlTodos);
        updateHtmlArrs();
        render(htmlTodos);
        filterSet();
      }
    });
  };

  loadHardCodeTodos = () => {
    hardCodedTodos.forEach((item) => {
      let newItem = createTodoItem(item);

      addTodo(newItem, htmlTodos);
      updateHtmlArrs();
      render(htmlTodos);
    });
  };

  timeToggle = () => {
    const body = document.querySelector("body");
    timeToggle.addEventListener("click", (e) => {
      if (body.classList.contains("dark")) {
        headerBg.setAttribute("src", "./images/bg-desktop-light.jpg");
        headerBg.previousElementSibling.setAttribute(
          "srcset",
          "./images/bg-mobile-light.jpg"
        );
        body.className = "light";

        e.target.firstElementChild.setAttribute(
          "data",
          "./images/icon-moon.svg"
        );
      } else {
        headerBg.setAttribute("src", "./images/bg-desktop-dark.jpg");
        headerBg.previousElementSibling.setAttribute(
          "srcset",
          "./images/bg-mobile-light.jpg"
        );
        body.className = "dark";

        e.target.firstElementChild.setAttribute(
          "data",
          "./images/icon-sun.svg"
        );
      }
    });
  };

  desktopDragEvent = () => {
    todoList.addEventListener("mouseover", (e) => {
      if (e.target.classList.contains("todo-item")) {
        e.target.addEventListener("dragstart", () =>
          e.target.classList.add("dragging")
        );
        e.target.addEventListener("dragend", () =>
          e.target.classList.remove("dragging")
        );
      }
    });

    todoList.addEventListener("dragover", (e) => {
      e.preventDefault();

      let afterElement = getDragAfterElement(e.clientY);

      let dragging = document.querySelector(".dragging");
      if (afterElement === null) {
        todoList.appendChild(dragging);
        updateDragHtmlArrs();
      } else {
        todoList.insertBefore(dragging, afterElement);
        updateDragHtmlArrs();
      }
    });

    function getDragAfterElement(y) {
      const draggableElements = [
        ...todoList.querySelectorAll(".todo-item:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  };

  markComplete = () => {
    todoList.addEventListener("mouseover", (e) => {
      if (e.target.classList.contains("mark-complete")) {
        e.target.addEventListener("change", (e) => {
          if (e.target.checked) {
            htmlTodos = htmlTodos.map((item) => {
              if (
                item.dataset.id ===
                e.target.parentElement.parentElement.dataset.id
              ) {
                item.classList.add("completed");
              }
              return item;
            });
          } else {
            htmlTodos = htmlTodos.map((item) => {
              if (
                item.dataset.id ===
                e.target.parentElement.parentElement.dataset.id
              ) {
                item.classList.remove("completed");
              }
              return item;
            });
          }
          updateHtmlArrs();
          render(htmlTodos);
          filterSet();
        });
      }
    });
  };

  removeTodo = () => {
    todoList.addEventListener("click", (e) => {
      if (e.target.classList.contains("close")) {
        htmlTodos = htmlTodos.filter(
          (item) => item.dataset.id !== e.target.parentElement.dataset.id
        );
        updateHtmlArrs();
        render(htmlTodos);
        filterSet();
      }
    });
  };

  filterOn = () => {
    allBtn.addEventListener("click", () => {
      filterSet(allBtn, activeBtn, completedBtn);

      updateHtmlArrs();
      render(htmlTodos);
    });

    activeBtn.addEventListener("click", () => {
      filterSet(activeBtn, allBtn, completedBtn);

      updateHtmlArrs();
      render(htmlActiveTodos);
    });

    completedBtn.addEventListener("click", () => {
      filterSet(completedBtn, activeBtn, allBtn);

      updateHtmlArrs();
      render(htmlCompletedTodos);
    });
  };

  clearAllCompleted = () => {
    clearAllBtn.addEventListener("click", () => {
      htmlTodos = htmlActiveTodos;
      updateHtmlArrs();
      render(htmlTodos);
    });
  };
}

// Intantiation of a new UI todo class making all method available on DOM fully being loaded
document.addEventListener("DOMContentLoaded", () => {
  new UITodo();
});
