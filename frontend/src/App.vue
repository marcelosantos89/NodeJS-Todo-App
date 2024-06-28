<template>
  <main class="app">
    <section class="greeting">
      <h3 class="title">✍️ToDo Application</h3>
    </section>

    <div class="input-section">
      <section class="create-todo">
        <form @submit.prevent="addTodo">
          <h3>What do you plan on doing🙂?</h3>
          <input
            type="text"
            placeholder="e.g. email your boss"
            v-model="text"
          />

          <input type="submit" value="Add todo" />
        </form>
      </section>
    </div>

    <div class="todo-section">
      <section class="todo-list">
        <h2 v-show="todos.length === 0">No Todos Here😞</h2>

        <div class="list">
          <div
            v-for="todo in todos"
            :class="`todo-item ${todo.status && 'done'}`"
          >
            <label>
              <input type="checkbox" v-model="todo.status" @click="toggleStatus(todo)" />
            </label>

            <div class="todo-content">
              <input type="text" v-model="todo.title" />
            </div>

            <div class="actions">
              <button class="delete" @click="deleteTodo(todo)">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const todos = ref([]);
const text = ref("");

function addTodo() {
  if (text.value.trim() === "") {
    return;
  }

  axios.post('http://localhost:3000/todo/add', {
    title: text.value
  }).then((res) => {
    todos.value.unshift(res.data.todo);
  });

  text.value = "";
}

function deleteTodo(task) {
  axios.delete('http://localhost:3000/todo/remove/' + task._id).then(() => {
    todos.value = todos.value.filter((x) => x !== task);
  })
}

function toggleStatus(task) {
  axios.put('http://localhost:3000/todo/toggle', {
    id: task._id,
    status: !task.status
  })
}

onMounted(() => {
  axios.get('http://localhost:3000/todo')
    .then((res) => {
      todos.value = res.data.todos
    })
});
</script>