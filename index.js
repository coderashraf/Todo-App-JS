const main = document.getElementById("main")
const cards = document.getElementById("cards")
const addList = document.getElementById("addlist-page")
const listButton =  document.getElementById("listButton")
const itemButton = document.getElementById("itemButton")
const addItemContainer = document.getElementById("additem-page")
const closeButton1 = document.getElementById("closeButton1")
const closeButton2 = document.getElementById("closeButton2")
const goBack = document.getElementById("go-back")
const listInfo = document.getElementById("list-info")

const noItems = document.getElementById("noItems")
var globalCardVariable=""
var globalCardVariableInfo="";


const addlistPage= () =>{
  if(listInfo.children[1]){
    listInfo.classList.add("filtered")
    addList.style.display= "flex"
    listInfo.style.zIndex =-1;
    addList.style.zIndex =1;
  }
  else{
    main.classList.add("filtered");
    addList.style.display= "flex"
  }
}

let taskList = [];

const checknoItems= () =>{
  if(taskList.length){
    noItems.style.display ="none"
  }
  else{
    noItems.style.display ="block"
  }
}


const addTask = (event) => {
  event.preventDefault()
  const list = document.getElementById("new-list");
  list.setAttribute("class", "list-title");
  const listName = list.value;
  list.value=""
  const tempObj = {
    taskName : listName,
  }
  taskList.push(tempObj);
  addTaskOnScreen();
  listInfo.classList.remove("filtered")
    addList.style.display= "none"
    listInfo.style.zIndex ="unset";
    addList.style.zIndex ="unset";
  //////////////////////////////////////
}

const addTaskOnScreen = () =>{
  const card = document.createElement("div"); //creating card
  card.setAttribute("class", "card");
  cards.appendChild(card);
  const hr = document.createElement("hr");
  const listTitle = document.createElement("div"); // creating list-title
  listTitle.setAttribute("class", "list-title");
  const listTitleAnchor = document.createElement("a"); //creating list-title-anchor
  listTitleAnchor.innerText = taskList[taskList.length-1].taskName;
  card.appendChild(listTitle)
  listTitle.appendChild(listTitleAnchor)
  card.appendChild(hr)
  const itemBtns = document.createElement("div"); //creating buttons div
  itemBtns.setAttribute("class", "itemBtns");
  card.appendChild(itemBtns)
  const deleteItemBtn = document.createElement("div"); //creating delete button
  deleteItemBtn.setAttribute("class", "deleteItemBtn");
  itemBtns.appendChild(deleteItemBtn)
  const addItemBtn = document.createElement("div"); //creating add-item button
  addItemBtn.setAttribute("class", "addItemBtn");
  itemBtns.appendChild(addItemBtn)
  deleteItemBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
  addItemBtn.innerHTML = '<i class="fas fa-plus-circle"></i>'

  main.classList.remove("filtered");
  addList.style.display= "none"
  checknoItems()
}

const deleteAdd = (e) =>{

  if(e.target.parentElement.parentElement.parentElement.classList[0] =="list-info")
  {
    globalCardVariableInfo = e.target;
    if(globalCardVariableInfo.classList[0] ==="deleteItemBtn" ) // checking if delete button is pressed;deletion
    {
      
      const card = globalCardVariable.parentElement;
      let cardText = card.children[0].children[0].innerText;
      for(let i=0;i<taskList.length;i++)
      {
        if(cardText==taskList[i].taskName)
        {
          taskList.splice(i,1);
          checknoItems()
          break;
        }
      }
      // listInfo.removeChild(listInfo.children[1]);
      // if(card.classList[0] =="card"){
        card.remove() 
        listInfo.removeChild(listInfo.children[1]);
        globalCardVariable=""
        listInfo.style.display = "none"
      main.style.display="block"
      // }
      

    }  
    else if(globalCardVariableInfo.classList[0] ==="addItemBtn"){
      addItemPage()
    } else if(globalCardVariableInfo.classList[0] ==="item-status")
      { // checking if MARK DONE is click
        item = globalCardVariableInfo.parentElement
        itemName=item.children[0]
        itemName.classList.add("completed")
        globalCardVariableInfo.style.display ="none"
      }
  }
  else{
    globalCardVariable = e.target;
  }

  if(globalCardVariable.classList[0] ==="deleteItemBtn" ) // checking if delete button is pressed;deletion
  {
    
    const card = globalCardVariable.parentElement.parentElement;
    let cardText = card.children[0].children[0].innerText;
    for(let i=0;i<taskList.length;i++){
      if(cardText==taskList[i].taskName)
      {
        taskList.splice(i,1);
        
        break;
      }
    }
      card.remove()
      checknoItems()
  }
  else if(globalCardVariable.classList[0] ==="addItemBtn"){ //checking if add-item button is pressed;Item addition
    addItemPage()
  }
  else if(globalCardVariable.classList[0] ==="list-title"){    // checking if LIST TITLE is clicked
    const listTitle = globalCardVariable.children[0].innerText; // LIST TITLE  VALUE
    listInfo.style.display = "block"
    main.style.display="none" 
    
    const items=globalCardVariable.parentElement;
    const cardInfo = document.getElementById("list-info")
    const heading = cardInfo.children[0].children[1].children[0]
    heading.innerText = listTitle // adding list-title-heading on top
    
    if(cardInfo.childElementCount ==1){// when 
      cardInfo.appendChild(items.cloneNode(true))
      const listInfoCard = listInfo.children[1]
      listInfoCard.addEventListener("click",deleteAdd)
    } 
    // globalCardVariable=""
  }
  else if(globalCardVariable.classList[0] ==="item-status"){ // checking if MARK DONE is click
    item = globalCardVariable.parentElement
    itemName=item.children[0]
    itemName.classList.add("completed")
    globalCardVariable.style.display ="none"
  }
    
}

const addItemPage = () =>{ // displaying the ADD-ITEM page
  if(listInfo.children[1]){
    listInfo.classList.add("filtered")  // filter not working
    listInfo.style.zIndex =-1;
    addItemContainer.style.display="flex";
    addItemContainer.style.zIndex =1;
  }
  else {
    addItemContainer.style.display="flex"
    main.classList.add("filtered");
  }
}

const addItem =() =>{ // adding items to the card
  console.log(1);
  const itemNameInput = document.getElementById("new-item") // getting the element- NEW ITEM input 
  const itemNameValue = document.getElementById("new-item").value //value of the NEW ITEM
  const item = document.createElement("div"); //creating a new ITEM
  item.classList.add("flex","item")
  const itemName = document.createElement("p"); //creating P tag inside ITEM
  itemName.classList.add("itemName");
  itemName.innerText = itemNameValue;
  item.appendChild(itemName);
  const itemStatus = document.createElement("button") //creating a MARK DONE button
  itemStatus.classList.add("item-status");
  itemStatus.innerHTML="Mark Done";
  item.appendChild(itemStatus);
  const card = globalCardVariable.parentElement.parentElement;
  card.appendChild(item)
  itemNameInput.value = ""
  addItemContainer.style.display = "none"
  main.classList.remove("filtered");
  if(globalCardVariableInfo.parentElement){
    cardInfo= globalCardVariableInfo.parentElement.parentElement;
    const card = globalCardVariable.parentElement
    cardInfo.appendChild(item)
    card.appendChild(item.cloneNode(true))
    globalCardVariableInfo=""
    listInfo.classList.remove("filtered")  // filter not working
    listInfo.style.zIndex ="unset";
    addItemContainer.style.display="flex";
    addItemContainer.style.zIndex ="unset";
    addItemContainer.style.display ="none"
  }
}

const closeDialog = () =>{ //pressing the close button calls this function
  if(listInfo.children[1]){
    listInfo.classList.remove("filtered")
    addList.style.display ="none"
    addItemContainer.style.display = "none"
  }
  else{
    addList.style.display ="none"
    addItemContainer.style.display = "none"
    listInfo.style.display = "none"
    main.style.display="block"
    main.classList.remove("filtered");
  }
  
}
const goBackFunc =() =>{
  addList.style.display ="none"
  addItemContainer.style.display = "none"
  listInfo.style.display = "none"
  if(listInfo.children[1]){
    listInfo.removeChild(listInfo.children[1]); // removing CARD from
  }
  main.style.display="block"
  main.classList.remove("filtered");
}

listButton.addEventListener("click",addTask)
cards.addEventListener("click",deleteAdd)
itemButton.addEventListener("click",addItem)
closeButton1.addEventListener("click",closeDialog)
closeButton2.addEventListener("click",closeDialog)
goBack.addEventListener("click",goBackFunc)
