{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toogleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const makeAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toogleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toogleDoneButtons = document.querySelectorAll(".js-done");

        toogleDoneButtons.forEach((toogleDoneButton, index) => {
            toogleDoneButton.addEventListener("click", () => {
                toogleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        const taskToHTML = task => `    
                <li 
                    class = "list__item${task.done && hideDoneTasks ? " list__item--hidden" : ""}                   
                ">                    
                    <button class="list__button list__button--done js-done">${task.done ? "✔" : ""}</button>                                      
                    <span class="list__content${task.done ? " list__content--done" : ""}"> ${task.content}</span>
                    <button class="list__button list__button--remove js-remove">🗑️</button>                                    
                </li>             
            `;

            const tasksElement = document.querySelector(".js-tasks");
            tasksElement.innerHTML = tasks.map(taskToHTML).join("");
        };    

    const renderButtons = () => {
        const buttons = document.querySelector(".js-additionalButtons");

        if (!tasks.length) {
            buttons.innerHTML = "";
            return;
        };

        buttons.innerHTML = `
            <button class="additionalButtons__button js-toogleHideDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone zadania
            </button>
            <button class="additionalButtons__button js-makeAllTasksDone"
                ${tasks.every(({done}) => done) ? "disabled" : ""}
            >
                Ukończ wszystkie zadania
            </button>
        `;
    };

    const bindButtonsEvents = () => {
        const makeAllTasksDoneButton = document.querySelector(".js-makeAllTasksDone");

        if (makeAllTasksDoneButton) {
            makeAllTasksDoneButton.addEventListener("click", makeAllTasksDone);
        }

        const toogleHideDoneTasksButton = document.querySelector(".js-toogleHideDoneTasks");

        if (toogleHideDoneTasksButton) {
            toogleHideDoneTasksButton.addEventListener("click", toogleHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = ""
        };

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}