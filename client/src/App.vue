<script setup>
const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/apps");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

fetchData();
</script>

<template>
  <div class="container">Hello World!</div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
