import { useEffect, useState } from "react";
import AddTask from "./assets/components/AddTask";
import Tasks from "./assets/components/Tasks";
import { v4 } from "uuid";
import Title from "./assets/components/Title";

function App() {
  const [tasks, setTaks] =
    useState(JSON.parse(localStorage.getItem("tasks"))) || [];

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // const fetchTasks = async () => {
    //   // CHAMAR A API
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/todos?_limit=10",
    //     {
    //       method: "GET",
    //     },
    //   );
    //   // PEGAR OS DADOS QUE ELA RETORNA
    //   const data = await response.json();

    //   // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
    //   setTaks(data);
    // };
    // // SE QUISER, VOCÊ PODE CHAMAR UMA API PARA PEGAR AS TAREFAS
    // // fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // PRECISO ATUALIZRA ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      // NÃO PRECISO ATUALIZAR ESSA TAREFA

      return task;
    });
    setTaks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTask = tasks.filter((task) => task.id !== taskId);
    setTaks(newTask);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTaks([...tasks, newTask]);
  }

  // State (Estado)
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
