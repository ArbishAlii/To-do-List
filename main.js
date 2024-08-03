#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todolist = [];
let conditions = true;
console.log(chalk.magenta.bold("\n \t Welcome to the To-Do List Application \n"));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do:",
                choices: ["Add Task", "Delete Task", "Update Task", "View To-Do List", "Exit"]
            }
        ]);
        if (option.choice === "Add Task") {
            await AddTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View To-Do List") {
            await ViewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
let AddTask = async () => {
    let NewTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task:"
        }
    ]);
    todolist.push(NewTask.task);
    console.log(`\n ${NewTask.task} added successfully in To-Do List`);
};
//function to view all to-do tasks
let ViewTask = () => {
    console.log("\n Your to-do list: \n");
    todolist.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    console.log("\n");
};
//function to delete things from to-do list
let deleteTask = async () => {
    await ViewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the task you want to delete"
        }
    ]);
    let deletedTask = todolist.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deleteTask} task has been deleted successfully from To-do list`);
};
//function to update the list
let updateTask = async () => {
    await ViewTask();
    let taskUpdate = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index number of the task you want to update"
        },
        {
            name: "new_task",
            type: "input",
            message: "Now enter new task:"
        }
    ]);
    todolist[taskUpdate.index - 1] = taskUpdate.new_task;
    console.log(`\n Task at index no. ${taskUpdate.index} updated successfully \n [For updated List go to "View To-Do List"]`);
};
main();
