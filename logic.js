function mode(){
    var bdy = document.body;
    var nv = document.querySelector(".navbar");
    var nm = document.getElementsByClassName("navbar-brand");
    bdy.classList.toggle("dark-mode");
    nv.classList.toggle("dark-mode");
    nm[0].classList.toggle("dark-mode");
    var icon = document.getElementById("darkmode");
    icon.classList.toggle("dark-mode");
    if (icon.innerHTML.trim() === "dark_mode") {
        icon.innerHTML = "wb_sunny";
    } else {
        icon.innerHTML = "dark_mode";
    }
    var ss = document.querySelector(".search-bar")
    ss.classList.toggle("dark-mode");
    var inp = document.querySelectorAll(".container-fluid"); 
    inp.forEach(element => { 
        element.classList.toggle("dark-mode"); 
    });
}


mode();

document.addEventListener("DOMContentLoaded", function () {
    function toggleWorkoutGuide() {
      const workoutGuideSection = document.getElementById("Workout-guide");
      if (workoutGuideSection.style.display === "none") {
        workoutGuideSection.style.display = "block";
      } else {
        workoutGuideSection.style.display = "none";
      }
    }
  
    
    document.getElementById("workoutGuideLink").addEventListener("click", function (event) {
      event.preventDefault(); 
      toggleWorkoutGuide(); 
    });
  });
  

document.addEventListener("DOMContentLoaded", function () {
  let selectedMuscle = "All Muscle Groups";
  let selectedEquipment = "No Equipment";
  let searchQuery = "";

  function fetchAndDisplayExercises() {
      document.getElementById("results").innerHTML = "";
      fetch("./workoutData.json")
          .then(response => response.json())
          .then(data => {
              let filteredExercises = data.filter(exercise => {
                  return (selectedMuscle === "All Muscle Groups" || exercise.primaryMuscle === selectedMuscle) &&
                   (selectedEquipment === "No Equipment" ? exercise.equipmentNeeded === selectedEquipment : exercise.equipmentNeeded.includes(selectedEquipment))&&
                         (searchQuery === "" || exercise.name.toLowerCase().startsWith(searchQuery.toLowerCase())
                          );
                    });

              filteredExercises.forEach(exercise => {
                  let exerciseElement = document.createElement("div");
                  exerciseElement.innerHTML = `
                      <h3>${exercise.name}</h3>
                      <p><strong>Primary Muscle:</strong> ${exercise.primaryMuscle}</p>
                      <p><strong>Secondary Muscle:</strong> ${exercise.secondaryMuscle}</p>
                      <p><strong>Description:</strong> ${exercise.description}</p>
                      <p><strong>How to Perform:</strong> ${exercise.howToPerform}</p>
                      <p><strong>Equipment Needed:</strong> ${exercise.equipmentNeeded}</p>
                      <hr>
                  `;
                  document.getElementById("results").appendChild(exerciseElement);
              });
              if (filteredExercises.length === 0) {
                let noResultsMessage = document.createElement("p");
                noResultsMessage.textContent = "No results found.";
                document.getElementById("results").appendChild(noResultsMessage);
              }
          })
          
          .catch(error => {
              console.error("Error fetching exercises:", error);
          });
  }


  document.getElementById("Search").addEventListener("input", function () {
    searchQuery = this.value.trim(); 
    fetchAndDisplayExercises(); 
  });
  document.getElementById("equipment").addEventListener("change", function () {
    selectedEquipment = this.value;
    if (selectedEquipment === "Full Gym") {
        selectedEquipment = true;
    }
    fetchAndDisplayExercises();
});
  document.getElementById("muscleType").addEventListener("change", function () {
      selectedMuscle = this.value;
      fetchAndDisplayExercises();
  });

  

  fetchAndDisplayExercises();
});



function openModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'block';
    document.style.overflow = 'none';
}

function closeModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
}

document.addEventListener('keydown', function(e){
    console.log(e.key);
    if(e.key == 'Escape'){
    if(modal.style.display!='none'){
        closeModal();
    }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById("fitnessForm").addEventListener("submit", function(event) {
        event.preventDefault();

        
        let date = document.getElementById("exerciseDate").value;
        let exercise = document.getElementById("exerciseName").value;
        let sets = document.getElementById("sets").value;
        let reps = document.getElementById("reps").value;
        let weight = document.getElementById("weight").value || "-";
        let duration = document.getElementById("duration").value || "-";
        // let calories = document.getElementById("calories").value || "-";

        
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${date}</td>
            <td>${exercise}</td>
            <td>${sets}</td>
            <td>${reps}</td>
            <td>${weight}</td>
            <td>${duration}</td>
        `;
        document.querySelector("#fitnessJournal tbody").appendChild(newRow);


        document.getElementById("fitnessForm").reset();
    });
});
