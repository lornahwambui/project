fetch("http://localhost:5000/catfacts", {
    method: "GET"
})
.then((response) => response.json())
.then((data) => { // Fix the variable name from res to data
    const all_blogs = document.getElementById("all_blogs");
    
    data.map((element) => { // Use parentheses instead of square brackets for the map function
        console.log(element);
        all_blogs.innerHTML += `<div  id="card">
        <img onclick="displaySingleblog(${element.id})"src="${element.image}">
        <h6>${element.description}</h6>
        <button onClick="deleteBlog(${element.id})" id="deleteBtn">Delete</button>

        </div>`;
    });
})
function displaySingleblog(id){
    console.log('function called',id);
    fetch(`http://localhost:5000/catfacts/${id}`, {
    method: "GET"
})
.then((response) => response.json())
.then((data) =>{
    console.log(data)
} )

}

//delete single blog
function deleteBlog(id){
    
    fetch(`http://localhost:5000/catfacts/${id}`, {
    method: "DELETE"
})
.then((response) => response.json())
.then((data) =>{
    Alert("Blog deleted")
} )

}
//add blog
const addform = document.getElementById("addform");
addform.addEventListener("submit", function (event) {
    event.preventDefault();
    const description = document.getElementById("description").value;
    const image_url = document.getElementById("image_url").value;
    console.log("description:", description);
    console.log("image_url:", image_url);

    fetch(`http://localhost:5000/catfacts`, {
        method: "POST",
        body: JSON.stringify({
            description: description,
            image: image_url
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        alert("Blog created"); 
    });
});
