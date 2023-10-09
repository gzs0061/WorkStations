<template>
    <div>
        <h1>Engine List</h1>
    <ul>
      <li v-for="engine in engines" :key="engine.id">
        {{ engine.id }}
      </li>
      <li v-for="engine in engines" :key="engine.serialNumber">
        {{ engine.serialNumber }}
      </li>
      <li v-for="engine in engines" :key="engine.model">
        {{ engine.model }}
      </li>
      <li v-for="engine in engines" :key="engine.id + '_image'">
        <img v-if="engine && engine.image" :src="engine.image" alt="Engine Image" />
        <span v-else>No Image Available</span>
      </li>
    </ul>
  </div> 
</template>
<script>
import axios from 'axios';

export default {
  name: "EngineList",
  data() {
    return {
      engines: [], // store the fetched data here
    };
  },
  mounted() {
    axios
      .get('https://ubi-engines.azurewebsites.net/api/orchestrators/Engines')
      .then((response) => {
        this.engines = response.data; // assign the fetched data to the 'engines' property
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  },
};
</script>
