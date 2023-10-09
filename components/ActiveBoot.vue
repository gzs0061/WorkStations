<template>
    <div class="active-boot-container">
      <div class="row">
        <div v-for="workstation in workstations" :key="workstation.name" class="col-md-6">
          <div class="card mb-4">
            <div class="card-header">
              {{ workstation.name }}
            </div>
            <ul class="list-group list-group-flush">
                <!-- getting the no product to show when null -->
            <li class="list-group-item" v-if="!workstation.currentProduct">
              No Product
            </li>
            <!-- display as normal -->
              <li class="list-group-item" v-for="engine in filteredEngines(workstation)" :key="engine.id">
                
                <img v-if="engine && engine.image" :src="engine.image" alt="Engine Image" class="img-fluid" />
                <p>Serial Number: </p> <h4>{{ engine.serialNumber || 'No Product' }}</h4>
                <p>Model: </p> <h4> {{ engine.model || 'No Product' }}</h4>
                <p>Entry Time: </p> <h4>{{ workstation.currentProduct.entryTime || 'No Product'  }}</h4>
                <p>Cycle Time: </p> <h4>{{ workstation.cycleTimeHrs || 'No Product' }} hours</h4>
                <p>Time Elapsed: </p>
                <div class="progress">
                <div
                    class="progress-bar"
                    role="progressbar"
                    :aria-valuenow="calculatedProgress(workstation)"
                    aria-valuemin="0"
                    aria-valuemax="150"
                    :style="{ width: calculatedProgress(workstation) + '%' }"
                    :class="progressColorClass(workstation)">
                    <span class="sr-only">{{ calculatedProgress(workstation) }}% Complete</span>
                </div>
                </div>

              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "ActiveBoot",
    data() {
      return {
        workstations: [],
        engines: [], 
      };
    },
    computed: {
      // filters engines by workstation
      filteredEngines() {
        return (workstation) => {
          const currentProduct = workstation.currentProduct;
          if (!currentProduct) {
            return [];
          }
          return this.engines.filter((engine) => engine.id === currentProduct.id);
        };
      },

      calculatedProgress() {
    return (workstation) => {
      if (!workstation.currentProduct || !workstation.currentProduct.entryTime) {
        return 0; // for null workstation
      }
      const currentTime = new Date();
      const entryTimestamp = new Date(workstation.currentProduct.entryTime);
      const timeElapsedMs = currentTime - entryTimestamp;
      const totalMsInAnHour = 3600000; // 1 hour = 3600000 ms
      let progressPercentage = (timeElapsedMs / totalMsInAnHour) * 100;
      
      // changed to 150 for alert progress
      progressPercentage = Math.min(150, progressPercentage);
      
      // whole numbers for visuals
      return Math.round(progressPercentage);
    };
    },

 
   progressColorClass() {
    return (workstation) => {
      const progress = this.calculatedProgress(workstation.currentProduct.entryTime);
      if (progress >= 100) {
        return 'bg-danger'; // red background when progress is 100% or more
      } else {
        return 'bg-success'; // green background for progress less than 100%
      }
    };
  },
  

    
    },
    methods: {

     
    },
    mounted() {
      // Fetch workstations data
      axios
        .get('https://ubi-interview.azurewebsites.net/api/orchestrators/workstations')
        .then((response) => {
          this.workstations = response.data;
        })
        .catch((error) => {
          console.error('Error fetching workstations data:', error);
        });
  
      // Fetch engines data
      axios
        .get('https://ubi-engines.azurewebsites.net/api/orchestrators/Engines')
        .then((response) => {
          this.engines = response.data;
        })
        .catch((error) => {
          console.error('Error fetching engines data:', error);
        });
    },
  };
  </script>

  <style>
    
    .card-header {
        background-color: black;
        color: white;
        text-align: center;
        margin-top: 20px;
        

    }
    .card {
        width: 100%;
        height: 100%;
        margin-bottom: 20px;
    }

    img {
        max-width: 30%;
        height: auto;
        display: block;
        margin: 0 auto;
    }

    h1 {
        text-align: center;
        background-color:darkblue;
        color: white;

        
    }

    .active-boot-container {
        display: flex;
    flex-direction: column;
    align-items: center;
    }

    
    .col-md-6 {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        max-width: 50%;
    }
    .bg-danger {
    background-color: red;
  }

  .bg-success {
    background-color: green;
  }
    
  </style>
  