// create feature 
function itemTemplate(item) {
return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
<span class="item-text">${item.text}</span>
<div>
  <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
  <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
</div>
</li>`
}

// page rander 
let ourHTML = items.map(function(item) {
  return itemTemplate(item)
}).join('')

let itemList = document.getElementById('item-list')
itemList.insertAdjacentHTML('beforeend', ourHTML)

let creatField = document.getElementById('create-field')


document.getElementById('create-form').addEventListener('submit', function(e){
  e.preventDefault()
  axios.post('/create-item', {text: creatField.value}).then(function (response) {
    itemList.insertAdjacentHTML('beforeend', itemTemplate(response.data))
    creatField.value = ""
    creatField.focus()
  }).catch(function() {
    console.log("Please try again later.")
  })
  
})



document.addEventListener('click', function(e){

     // Delete Feature
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Do you really want to delete this item permanently?")) {
      axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function () {
        e.target.parentElement.parentElement.remove()
      }).catch(function() {
        console.log("Please try again later.")
      })
    }
  }

    //update feature
    if(e.target.classList.contains('edit-me')){
        let userInput = prompt("enter new version", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
       if (userInput) {
        axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function(){
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(function(){
                console.log("there is an error")
            })
       }
        
    }
})