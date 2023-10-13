
function refresh(){
    window.location.reload()
}
getAll()
    function getAll(){
        fetch("https://catfacts.onrender.com/catfacts", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                const all_blogs = document.getElementById("all_blogs");
                all_blogs.innerHTML = ""
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
    }
function displaySingleblog(id) {
    console.log('function called', id);
    fetch(`https://catfacts.onrender.com/catfacts/${id}`, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })

}

//delete single blog
function deleteBlog(id) {

    fetch(`https://catfacts.onrender.com/catfacts/${id}`, {
        method: "DELETE"
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            alert("Blog deleted")
            refresh()
        })

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
            refresh()
            
        });
});

//update function

function update(id) {
    // Fetch the existing data
    fetch(`https://catfacts.onrender.com/catfacts/?id=${id}`, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            const updateContainer = document.getElementById("updateContainer");

            updateContainer.innerHTML = `
            <h6>Update Form</h6>
            <form id="updateform">
                <input type="text" id="update_description" placeholder="Enter description" name="update_description" value="${data[0].description}">
                <input type="text" id="update_image_url" placeholder="Enter Image URL" name="update_image_url"value="${data[0].image}">
                <button type="submit">Update</button>
            </form>
        `;

            document.body.append(updateContainer);

            // Listen for the form submission
            const updateform = document.getElementById("updateform");
            updateform.addEventListener('submit', function (event) {
                event.preventDefault();
                const update_description = updateform.elements["update_description"].value;
                const update_image_url = updateform.elements["update_image_url"].value;
                updateContainer.innerHTML = '';

                console.log(update_description);

                //  PATCH request to update the data on the server
                fetch(`https://catfacts.onrender.com/catfacts/${id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        description: update_description,
                        image: update_image_url
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then((response) => response.json())
                    .then((updatedData) => {
                        console.log("Data updated:", updatedData);
                        refresh()
                    });
            });
        });
}

