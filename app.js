// insert current date
const currentDate = new Date().toDateString();
document.getElementById("date").innerHTML = currentDate;

const clearAllList = document.querySelector(".fa-sync-alt");
const listOfElements = document.querySelector(".all-items");
const inputField = document.querySelector(".add-to-list");
const inputBtn = document.querySelector(".fa-plus-circle");
const item = document.querySelectorAll(".item");

let LIST, id;

// get item from localStorage
let data = localStorage.getItem("ToDo");
// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    // load the list to the user interface
    LIST.forEach(function(item){
        addToDo(item.task, item.id, item.done, item.trash);
    });  
} else {
    LIST = [];
    id = 0;
}

clearAllList.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
   // listOfElements.innerHTML = "";
});

function addToDo(task, id, done, trash){
    if(trash){
        return;
    }

    const DONE = done ? "fa-check-circle" : "fa-circle";
    const LINE = done ? "lineThrough" : "";

    const text =   `<li class="item">
                        <i class="far ${DONE}" id="${id}" job="complete"></i>
                        <i class="paragraph ${LINE}">${task}</i>
                        <i class="far fa-trash-alt" id="${id}" job="delete"></i>
                        </li>`;

    listOfElements.insertAdjacentHTML("beforeend",text);
}

inputBtn.addEventListener("click",executa);

// enter key
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        executa();
    }
});

function executa(){
    const inputText = inputField.value;
    if(inputText !== ""){
        addToDo(inputText, id, false, false); 

        LIST.push({
            task: inputText,
            id: id,
            done: false,
            trash: false
        });

        localStorage.setItem("ToDo",JSON.stringify(LIST)); // (this code must be added where the LIST array is updated)
       
        id++;
    }
    inputField.value = "";
}


listOfElements.addEventListener("click",function(event){
    let element = event.target; // <i class="far fa-trash-alt....." (return the element we clicked inside our listOfElements)
    const elementJob = event.target.attributes.job.value; // delete or complete

    if(elementJob === "complete"){
        element.classList.toggle("fa-circle");
        element.classList.toggle("fa-check-circle");
        element.parentNode.querySelector(".paragraph").classList.toggle("lineThrough");
        //console.log(LIST[element.id]);
        LIST[element.id].done = LIST[element.id].done ? false : true;
    } else if(elementJob === "delete"){
        element.parentNode.parentNode.removeChild(element.parentNode);
        LIST[element.id].trash = true;
    }

    localStorage.setItem("ToDo",JSON.stringify(LIST)); // save ToDo list to localStorage
});


// save ToDo list to localStorage  ---->> localStorage.setItem('key','value');