<template>
    <div>
    <h1>Workstations List</h1>
    <ul>
      <li v-for="workstation in workstations" :key="workstation.name">
        {{ workstation.name }}
      </li>
      <li v-for="workstation in workstations" :key="workstation.cycleTimeHrs">
        {{ workstation.cycleTimeHrs }}
      </li>
      <li v-for="workstation in workstations" :key="workstation.currentProduct ? workstation.currentProduct.id : 'N/A'">
        {{ workstation.currentProduct ? workstation.currentProduct.id : 'N/A' }}
      </li>
      <li v-for="workstation in workstations" :key="workstation.currentProduct ? workstation.currentProduct.entryTime : 'N/A'">
        {{ workstation.currentProduct ? workstation.currentProduct.entryTime : 'N/A' }}
      </li>  
      
    </ul>
  </div> 
</template>
<script>
import axios from 'axios';

export default {
  name: "WorkStation",
  data() {
    return {
      workstations: [], // store the fetched data here
    };
  },
  mounted() {
    axios
      .get('https://ubi-interview.azurewebsites.net/api/orchestrators/workstations')
      .then((response) => {
        this.workstations = response.data; // assign the fetched data to the 'engines' property
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  },
};
</script>
