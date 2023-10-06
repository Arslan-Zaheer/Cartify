
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
import { getDatabase, ref, push , onValue, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"
import appSettings from "./database.js"

// Initialize Database
const app = initializeApp(appSettings)
const database = getDatabase(app)
const Shopping_List = ref(database, "ShoppingList")


let addCart_btn = document.getElementById("add-btn")
let inputField = document.getElementById("input-field")
let ul_Element = document.getElementById("shopping-list")

addCart_btn.addEventListener("click",function(){

    let getValue = inputField.value
    push(Shopping_List, getValue)
    clearInputField()
})

onValue(Shopping_List, function(snapshot){

  if(snapshot.exists()){
    let DB_list = Object.entries(snapshot.val())
    clearUlList()

    for (let i = 0; i < DB_list.length; i++) {
      let currentItem = DB_list[i]
      AppendItemToShoppingListEl(currentItem)
    }
  }
  else{
    ul_Element.innerHTML = "No Items in the Cart...!"
  }
})

function clearInputField(){
  inputField.value = ""
}
function clearUlList(){
  ul_Element.innerHTML = ""
}

function AppendItemToShoppingListEl(item){
  
  let itemID = item[0]
  let itemValue = item[1] 

  let newElement = document.createElement("li")

  newElement.textContent = itemValue

  newElement.addEventListener("dblclick",function(){

    let exactLocationOfItemInDB = ref(database,`ShoppingList/${itemID}`)
    remove(exactLocationOfItemInDB)

  })

  ul_Element.append(newElement)
}

