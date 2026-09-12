const form = document.getElementById("customerForm");
const customerList = document.getElementById("customerList");

const leadForm = document.getElementById("leadForm");
const leadList = document.getElementById("leadList");

const dealForm = document.getElementById("dealForm");
const dealList = document.getElementById("dealList");



// ==================== REGISTER ====================

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const user = {
        name: document.getElementById("registerName").value,
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword").value,
        role: document.getElementById("registerRole").value
    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Registration successful!");

            registerForm.reset();

        } else {

            alert(data.message || "Registration failed!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

});



// ==================== LOGIN ====================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const loginData = {

        email: document.getElementById("loginEmail").value,

        password: document.getElementById("loginPassword").value

    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(loginData)
            }
        );

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userName", data.user.name);
            localStorage.setItem("userRole", data.user.role);

            alert(
                "Login successful! Welcome " +
                data.user.name +
                " (" +
                data.user.role +
                ")"
            );

            loginForm.reset();

        } else {

            alert(data.message || "Invalid email or password!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

});



// ==================== CUSTOMER MANAGEMENT ====================

// Add Customer
form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const customer = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        company: document.getElementById("company").value

    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/customers",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(customer)
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Customer added successfully!");

            form.reset();

            loadCustomers();

        } else {

            alert(data.message || "Failed to add customer!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

});



// Load Customers
async function loadCustomers() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/customers"
        );

        const customers = await response.json();

        customerList.innerHTML = "";

        if (customers.length === 0) {

            customerList.innerHTML =
                "<p>No customers added yet.</p>";

            return;

        }

        customers.forEach(customer => {

            const div = document.createElement("div");

            div.className = "customer";

            div.innerHTML = `
                <strong>${customer.name}</strong><br>
                Email: ${customer.email}<br>
                Phone: ${customer.phone}<br>
                Company: ${customer.company}<br><br>

                <button onclick="editCustomer(
                    '${customer._id}',
                    '${customer.name}',
                    '${customer.email}',
                    '${customer.phone}',
                    '${customer.company}'
                )">
                    Edit
                </button>

                <button onclick="deleteCustomer('${customer._id}')">
                    Delete
                </button>
            `;

            customerList.appendChild(div);

        });

    } catch (error) {

        console.log(error);

    }

}



// Edit Customer
async function editCustomer(
    id,
    name,
    email,
    phone,
    company
) {

    const newName = prompt(
        "Enter customer name:",
        name
    );

    if (newName === null) return;

    const newEmail = prompt(
        "Enter email:",
        email
    );

    if (newEmail === null) return;

    const newPhone = prompt(
        "Enter phone:",
        phone
    );

    if (newPhone === null) return;

    const newCompany = prompt(
        "Enter company:",
        company
    );

    if (newCompany === null) return;

    const updatedCustomer = {

        name: newName,

        email: newEmail,

        phone: newPhone,

        company: newCompany

    };

    try {

        const response = await fetch(
            `http://localhost:5000/api/customers/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedCustomer)
            }
        );

        if (response.ok) {

            alert("Customer updated successfully!");

            loadCustomers();

        } else {

            alert("Failed to update customer!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

}



// Delete Customer
async function deleteCustomer(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/customers/${id}`,
            {
                method: "DELETE"
            }
        );

        if (response.ok) {

            alert("Customer deleted successfully!");

            loadCustomers();

        } else {

            alert("Failed to delete customer!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

}



// ==================== LEAD MANAGEMENT ====================

// Add Lead
leadForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const lead = {

        name: document.getElementById("leadName").value,

        email: document.getElementById("leadEmail").value,

        phone: document.getElementById("leadPhone").value,

        company: document.getElementById("leadCompany").value,

        status: document.getElementById("leadStatus").value,

        dealValue:
            document.getElementById("leadDealValue").value || 0

    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/leads",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(lead)
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Lead added successfully!");

            leadForm.reset();

            loadLeads();

        } else {

            alert(data.message || "Failed to add lead!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

});



// Load Leads
async function loadLeads() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/leads"
        );

        const leads = await response.json();

        leadList.innerHTML = "";

        if (leads.length === 0) {

            leadList.innerHTML =
                "<p>No leads added yet.</p>";

            return;

        }

        leads.forEach(lead => {

            const div = document.createElement("div");

            div.className = "customer";

            div.innerHTML = `
                <strong>${lead.name}</strong><br>
                Email: ${lead.email}<br>
                Phone: ${lead.phone}<br>
                Company: ${lead.company}<br>
                Status: ${lead.status}<br>
                Deal Value: ₹${lead.dealValue}<br><br>

                <button onclick="editLead(
                    '${lead._id}',
                    '${lead.name}',
                    '${lead.email}',
                    '${lead.phone}',
                    '${lead.company}',
                    '${lead.status}',
                    '${lead.dealValue}'
                )">
                    Edit
                </button>

                <button onclick="deleteLead('${lead._id}')">
                    Delete
                </button>
            `;

            leadList.appendChild(div);

        });

    } catch (error) {

        console.log(error);

    }

}



// Edit Lead
async function editLead(
    id,
    name,
    email,
    phone,
    company,
    status,
    dealValue
) {

    const newName = prompt(
        "Enter lead name:",
        name
    );

    if (newName === null) return;

    const newEmail = prompt(
        "Enter email:",
        email
    );

    if (newEmail === null) return;

    const newPhone = prompt(
        "Enter phone:",
        phone
    );

    if (newPhone === null) return;

    const newCompany = prompt(
        "Enter company:",
        company
    );

    if (newCompany === null) return;

    const newStatus = prompt(
        "Enter status:",
        status
    );

    if (newStatus === null) return;

    const newDealValue = prompt(
        "Enter deal value:",
        dealValue
    );

    if (newDealValue === null) return;

    const updatedLead = {

        name: newName,

        email: newEmail,

        phone: newPhone,

        company: newCompany,

        status: newStatus,

        dealValue: Number(newDealValue)

    };

    try {

        const response = await fetch(
            `http://localhost:5000/api/leads/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedLead)
            }
        );

        if (response.ok) {

            alert("Lead updated successfully!");

            loadLeads();

        } else {

            alert("Failed to update lead!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

}



// Delete Lead
async function deleteLead(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/leads/${id}`,
            {
                method: "DELETE"
            }
        );

        if (response.ok) {

            alert("Lead deleted successfully!");

            loadLeads();

        } else {

            alert("Failed to delete lead!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

}



// ==================== DEAL MANAGEMENT ====================

// Add Deal
dealForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const deal = {

        title: document.getElementById("dealTitle").value,

        customer: document.getElementById("dealCustomer").value,

        value:
            document.getElementById("dealValue").value || 0,

        stage:
            document.getElementById("dealStage").value,

        expectedDate:
            document.getElementById("expectedDate").value

    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/deals",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "user-id": localStorage.getItem("userId")
                },

                body: JSON.stringify(deal)
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Deal added successfully!");

            dealForm.reset();

            loadDeals();

        } else {

            alert(data.message || "Failed to add deal!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

});



// Load Deals
async function loadDeals() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/deals"
        );

        const deals = await response.json();

        dealList.innerHTML = "";

        if (deals.length === 0) {

            dealList.innerHTML =
                "<p>No deals added yet.</p>";

            return;

        }

        deals.forEach(deal => {

            const div = document.createElement("div");

            div.className = "customer";

            div.innerHTML = `
                <strong>${deal.title}</strong><br>
                Customer: ${deal.customer}<br>
                Deal Value: ₹${deal.value}<br>
                Stage: ${deal.stage}<br>
                Expected Date:
                ${deal.expectedDate || "Not specified"}<br><br>

                <button onclick="editDeal(
                    '${deal._id}',
                    '${deal.title}',
                    '${deal.customer}',
                    '${deal.value}',
                    '${deal.stage}',
                    '${deal.expectedDate || ""}'
                )">
                    Edit
                </button>

                <button onclick="deleteDeal('${deal._id}')">
                    Delete
                </button>
            `;

            dealList.appendChild(div);

        });

    } catch (error) {

        console.log(error);

    }

}



// Edit Deal
async function editDeal(
    id,
    title,
    customer,
    value,
    stage,
    expectedDate
) {

    const newTitle = prompt(
        "Enter deal title:",
        title
    );

    if (newTitle === null) return;

    const newCustomer = prompt(
        "Enter customer name:",
        customer
    );

    if (newCustomer === null) return;

    const newValue = prompt(
        "Enter deal value:",
        value
    );

    if (newValue === null) return;

    const newStage = prompt(
        "Enter stage:",
        stage
    );

    if (newStage === null) return;

    const newDate = prompt(
        "Enter expected date:",
        expectedDate
    );

    if (newDate === null) return;

    const updatedDeal = {

        title: newTitle,

        customer: newCustomer,

        value: Number(newValue),

        stage: newStage,

        expectedDate: newDate

    };

    try {

        const response = await fetch(
            `http://localhost:5000/api/deals/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedDeal)
            }
        );

        if (response.ok) {

            alert("Deal updated successfully!");

            loadDeals();

        } else {

            alert("Failed to update deal!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

}



// Delete Deal
async function deleteDeal(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this deal?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/deals/${id}`,
            {
                method: "DELETE",

                headers: {
                    "user-id": localStorage.getItem("userId")
                }
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Deal deleted successfully!");

            loadDeals();

        } else {

            alert(data.message || "Failed to delete deal!");

        }

    } catch (error) {

        console.log(error);

        alert("Server connection failed!");

    }

}



// ==================== LOAD DATA ====================

loadCustomers();
loadLeads();
loadDeals();
// ================= SALES DASHBOARD =================

async function loadDashboard() {

    try {

        // Get Customers
        const customerResponse = await fetch(
            "http://localhost:5000/api/customers"
        );

        const customers = await customerResponse.json();


        // Get Leads
        const leadResponse = await fetch(
            "http://localhost:5000/api/leads"
        );

        const leads = await leadResponse.json();


        // Get Deals
        const dealResponse = await fetch(
            "http://localhost:5000/api/deals"
        );

        const deals = await dealResponse.json();


        // Total Customers
        document.getElementById("totalCustomers").textContent =
            customers.length;


        // Total Leads
        document.getElementById("totalLeads").textContent =
            leads.length;


        // Total Deals
        document.getElementById("totalDeals").textContent =
            deals.length;


        // Total Deal Value
        let totalValue = 0;

        deals.forEach(deal => {
            totalValue += Number(deal.value) || 0;
        });

        document.getElementById("totalDealValue").textContent =
            "₹" + totalValue;


        // Closed Won
        const closedWonDeals = deals.filter(
            deal => deal.stage === "Closed Won"
        );

        document.getElementById("closedWon").textContent =
            closedWonDeals.length;

    } catch (error) {

        console.log("Dashboard Error:", error);

    }
}


// Load dashboard when page opens
loadDashboard();
// ================= ACTIVITY LOGS =================

// Add Activity
document.getElementById("activityForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const activityData = {
        customerName: document.getElementById("activityCustomer").value,
        activityType: document.getElementById("activityType").value,
        description: document.getElementById("activityDescription").value,
        date: document.getElementById("activityDate").value
    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/activities",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(activityData)
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Activity added successfully!");

            document.getElementById("activityForm").reset();

            loadActivities();

        } else {

            alert(data.message || "Failed to add activity");

        }

    } catch (error) {

        console.log("Activity Error:", error);

        alert("Server error. Please check the backend.");

    }

});


// Load Activities
async function loadActivities() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/activities"
        );

        const activities = await response.json();

        const activityList =
            document.getElementById("activityList");

        if (activities.length === 0) {

            activityList.innerHTML =
                "<p>No activities added yet.</p>";

            return;
        }

        activityList.innerHTML = "";

        activities.forEach(activity => {

            const activityDiv = document.createElement("div");

            activityDiv.className = "activity-item";

            activityDiv.innerHTML = `
                <h3>${activity.activityType}</h3>

                <p>
                    <strong>Customer:</strong>
                    ${activity.customerName}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${activity.description}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${activity.date}
                </p>

                <button onclick="deleteActivity('${activity._id}')">
                    Delete
                </button>
            `;

            activityList.appendChild(activityDiv);

        });

    } catch (error) {

        console.log("Load Activity Error:", error);

    }

}


// Delete Activity
async function deleteActivity(id) {

    try {

        const response = await fetch(
            "http://localhost:5000/api/activities/" + id,
            {
                method: "DELETE"
            }
        );

        if (response.ok) {

            alert("Activity deleted successfully!");

            loadActivities();

        } else {

            alert("Failed to delete activity");

        }

    } catch (error) {

        console.log("Delete Activity Error:", error);

    }

}


// Load activities when page opens
loadActivities();