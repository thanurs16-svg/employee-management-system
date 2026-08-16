function loadEmployees() {

   
	 fetch('/employees')
	        .then(response => response.json())
	        .then(data => {
				document.getElementById("employeeCount").textContent = data.length;

	            let output = `
	                <table>
	                    <thead>
	                        <tr>
	                            <th>ID</th>
	                            <th>Name</th>
	                            <th>Email</th>
	                            <th>Phone</th>
	                            <th>Department</th>
	                            <th>Salary</th>
	                            <th>Actions</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	            `;

	            data.forEach(employee => {

	                output += `
	                    <tr>
	                        <td>${employee.id}</td>
	                        <td>${employee.name}</td>
	                        <td>${employee.email}</td>
	                        <td>${employee.phone}</td>
	                        <td>${employee.department}</td>
	                        <td>₹${employee.salary}</td>
	                        <td>
	                            <button onclick="editEmployee(${employee.id})">
	                                Edit
	                            </button>

	                            <button onclick="deleteEmployee(${employee.id})">
	                                Delete
	                            </button>
	                        </td>
	                    </tr>
	                `;
	            });

	            output += `
	                    </tbody>
	                </table>
	            `;

	            document.getElementById("employeeList").innerHTML = output;

	        })
	        .catch(error => {
	            console.error("Error:", error);
	        });
	}


document.getElementById("employeeForm").addEventListener("submit", function(event) {

    event.preventDefault();
	const editingId = this.dataset.editingId;

    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        salary: Number(document.getElementById("salary").value)
    };

  
	const url = editingId
	    ? `/employees/${editingId}`
	    : '/employees';

	const method = editingId ? 'PUT' : 'POST';

	fetch(url, {
	    method: method,
	    headers: {
	        'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(employee)
	})
	.then(response => response.json())
	.then(data => {

	    if(editingId){
	        alert("Employee updated successfully!");
	        }else{
				alert("Employee added successfully!");
	    }

	    document.getElementById("employeeForm").reset();

	    delete document.getElementById("employeeForm").dataset.editingId;

	    document.querySelector("#employeeForm button").textContent = "Add Employee";

	    loadEmployees();

	})
	.catch(error => {
	    console.error("Error:", error);
	    alert("Operation failed");
	});
});

function deleteEmployee(id) {

    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }

    fetch(`/employees/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(message => {

        alert(message);

        loadEmployees();

    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to delete employee");
    });
}
function editEmployee(id) {

    fetch(`/employees/${id}`)
        .then(response => response.json())
        .then(employee => {

            document.getElementById("name").value = employee.name;
            document.getElementById("email").value = employee.email;
            document.getElementById("phone").value = employee.phone;
            document.getElementById("department").value = employee.department;
            document.getElementById("salary").value = employee.salary;

            document.getElementById("employeeForm").dataset.editingId = id;

            document.querySelector("#employeeForm button").textContent = "Update Employee";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
function searchEmployees() {

    const name = document.getElementById("searchName").value.trim();

    if (name === "") {
        loadEmployees();
        return;
    }

    fetch(`/employees/search?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
			if(data.length===0){
				document.getElementById("employeeList").innerHTML="<p>No employees found.</p>";
				return;
			}

            let output = `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(employee => {
                output += `
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.email}</td>
                        <td>${employee.phone}</td>
                        <td>${employee.department}</td>
                        <td>${employee.salary}</td>
                        <td>
                            <button onclick="editEmployee(${employee.id})">Edit</button>
                            <button onclick="deleteEmployee(${employee.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });

            output += `
                    </tbody>
                </table>
            `;

            document.getElementById("employeeList").innerHTML = output;
        })
        .catch(error => console.error("Search error:", error));
}
window.onload = function () {
    loadEmployees();
};



