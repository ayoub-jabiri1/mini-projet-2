const prompt = require("prompt-sync")();

// 1: Main Variables

let tasks = [];
let choice;

// 2: Menu Principal

console.log(`
    To-Do List

1. Afficher les tâches
2. Ajouter une tâche
3. Rechercher une tâche
4. Modifier une tâche
5. Supprimer une tâche
6. Marquer une tâche comme terminée / en attente
7. Afficher tâches terminées / en attente
0. Quitter

    `);

// 3: Start Functions

function start() {
  choice = prompt("Choisissez une option : ");

  if (choice == "0") return;

  // Handle choice
  handleChoice();

  // Keep The Program Alive
  start();
}

function handleChoice() {
  switch (choice) {
    case "1":
      showTasks(tasks, "Tâches");
      break;
    case "2":
      addTask();
      break;
    case "3":
      search();
      break;
    case "4":
      updateTask();
      break;
    case "5":
      deleteTask();
      break;
    case "6":
      completeTask();
      break;
    case "7":
      showTasksByStatus();
      break;
    default:
      console.log("Le choix n'existe pas, choisissez un autre");
  }
}

function showTasks(arr, tableTitle) {
  if (arr.length == 0) {
    console.log("Aucune tâche à afficher!");
    return;
  }

  console.log(`
                            ${tableTitle}
-----------|-----------------------------------------|--------------|
    id     |                  Tâche                  |    Status    |
-----------|-----------------------------------------|--------------|
    `);

  for (let task of arr) {
    let status = task.isDone ? "Terminé" : "En attente";
    console.log(` 
        ${task.id}  |      ${task.description}              | ${status}
      `);
  }
}

function addTask() {
  let desc = prompt("Entrez la description de la tâche :");

  tasks.push({ id: tasks.length + 1, description: desc, isDone: false });
  console.log("     Tâche ajoutée avec succès !");
}

function search() {
  let title = prompt("Rechercher une tâche par titre: ");

  let foundTasks = [];

  for (let task of tasks) {
    if (task.description.includes(title)) foundTasks.push(task);
  }

  showTasks(foundTasks, "Tâche Recherchée");
}

function updateTask() {
  let id = prompt('Donnez "id" de la tâche pour la mettre à jour: ');

  let newDesc = prompt("Entrez la nouvelle description de la tâche :");

  for (let task of tasks) {
    if (task.id == id) task.description = newDesc;
  }

  console.log("     La tâche a été mise à jour avec succès!");
}

function deleteTask() {
  let id = prompt('Donnez "id" de la tâche pour la supprimer: ');

  for (let task of tasks) {
    if (task.id == id) tasks.splice(tasks.indexOf(task), 1);
  }
  console.log("     La tâche a été supprimée avec succès!");
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].id = i + 1;
  }
}

function completeTask() {
  let id = prompt(
    'Donnez "id" de la tâche pour marquer comme terminée ou en attente: '
  );
  let choice = prompt(
    "Taper (1) pour marquer comme terminée ou taper (2) pour en attente: "
  );

  for (let task of tasks) {
    if (task.id == id) task.isDone = choice == "1" ? true : false;
  }

  console.log("     La tâche a été mise à jour avec succès!");
}

function showTasksByStatus() {
  let choice = prompt(
    "Taper (1) pour afficher tâches terminées ou taper (2) pour pour afficher tâches en attente: "
  );

  let array = [];

  if (choice == "1") {
    array = tasks.filter((task) => task.isDone == true);
  } else if (choice == "2") {
    array = tasks.filter((task) => task.isDone == false);
  } else {
    console.log("Le choix n'existe pas, choisissez un autre");
    showTasksByStatus();
  }

  showTasks(array, choice == "1" ? "Tâches Terminées" : "Tâches en Attente");
}

// 4: Start Program

start();
