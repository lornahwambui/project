fetch("https://catfacts.onrender.com/api/backend/catfacts", {
    method: "GET"
})
.then((response) => response.json())
.then((data) => { 
    const all_blogs = document.getElementById("all_blogs");
    
    data.map((element) => { 
        console.log(element);
        all_blogs.innerHTML += `<div  id="card">
        <img onclick="displaySingleblog(${element.id})"src="${element.image}">
        <h6>${element.description}</h6>
        <button onClick="deleteBlog(${element.id})" id="deleteBtn">Delete</button>
        <button onClick="update(${element.id})">Edit</button>

        </div>`;
    });
})
function displaySingleblog(id){
    console.log('function called',id);
    fetch(`https://catfacts.onrender.com//${id}`, {
    method: "GET"
})
.then((response) => response.json())
.then((data) =>{
    console.log(data)
} )

}

//delete single blog
function deleteBlog(id){
    
    fetch(`https://catfacts.onrender.com/${id}`, {
    method: "DELETE"
})
.then((response) => response.json())
.then((data) =>{
    alert("Blog deleted")
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

    fetch(`https://catfacts.onrender.com/catfacts`, {
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

//update function
// https://catfacts.onrender.com/api/backend/catfacts/?id=1
function update(id) {
    // Fetch the existing data
    fetch(`https://catfacts.onrender.com/api/backend/catfacts/?id=${id}`, {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log("description: "+data.description)
        const updateContainer = document.getElementById("updateContainer");
        // const updateContainer = document.createElement('div');

        updateContainer.innerHTML = `
            <h6>Update Form</h6>
            <form id="updateform">
                <input type="text" id="update_description" placeholder="Enter description" value="${data.description}">
                <input type="text" id="update_image_url" placeholder="Enter Image URL" value="${data.image_url}">
                <button type="submit">Update</button>
            </form>
        `;

        document.body.append(updateContainer);
        
        // Listen for the form submission
        const updateform = document.getElementById("updateform");
        updateform.addEventListener('submit', function (event) {
            event.preventDefault();
            const update_description = document.getElementById("update_description").value;
            const update_image_url = document.getElementById("update_image_url").value;
            updateContainer.innerHTML ='';

            //  PATCH request to update the data on the server
            fetch(`https://catfacts.onrender.com/${id}`, {
                method: "PATCH",  
                body: JSON.stringify({
                    description: update_description,
                    image_url: update_image_url
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((updatedData) => {
                console.log("Data updated:", updatedData);
            });
        });
    });
}

