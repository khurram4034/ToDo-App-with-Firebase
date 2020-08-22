var list = document.getElementById("list");

firebase.database().ref('todos').on('child_added', function(data){
      // create li tag with text node //
    var li = document.createElement('li');
    var liText = document.createTextNode(data.val().value);
    li.setAttribute("class", "list");
    li.appendChild(liText);


     // create edit ebutton //
    var editBtn = document.createElement("button")
    var editText = document.createTextNode("Edit");
    editBtn.appendChild(editText);
    editBtn.setAttribute("class", "btn2");
    editBtn.setAttribute('id',data.val().key);
    editBtn.setAttribute("onclick", "editItem(this)");
    
    


     // create delete button //
    var delBtn = document.createElement("button");
    var delText = document.createTextNode("Delete");
    delBtn.appendChild(delText);
    delBtn.setAttribute("class", "btn1");
    delBtn.setAttribute('id',data.val().key);
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.appendChild(delText);


    
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
})


function addToDo(){
    var todo_item = document.getElementById("todo-item");
    var database = firebase.database().ref('todos')
    var key = database.push().key;
var todo = {
    value: todo_item.value,
    key: key
}
    database.child(key).set(todo)
    todo_item.value = " "
}

function deleteAll(){
    firebase.database().ref('todos').remove()
    list.innerHTML = ""
}

function editItem(e){
    var val = prompt("Enter Updated Value", e.parentNode.firstChild.nodeValue )
   var editTodo = {
       value: val,
       key: e.id,
   }
   
   firebase.database().ref('todos').child(e.id).set(editTodo);
    e.parentNode.firstChild.nodeValue = val;
}

function deleteItem(e){
  firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove();
     
 }

