document.getElementById('showUsersBtn').addEventListener('click', async () => {

try {
    const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const users = await response.json();
    console.log(users)
    const usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.innerHTML = `
        <p><strong>Full Name:</strong> ${user.fullName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role}</p>
        <p><strong>Last Connection:</strong> ${user.lastConnection}</p>
        <button class="update-role-btn" data-user-email="${user.email}">Update Role</button>
        <button class="delete-user-btn" data-user-email="${user.email}">Delete User</button>
        <hr>
    `;
        usersContainer.appendChild(userElement);
    });
    } catch (error) {
        console.error('Error fetching users:', error);
        alert('Error fetching users. Please try again later.');
}
});

document.getElementById('deleteInactiveUsersBtn').addEventListener('click', async () => {
    const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    console.log(result);
});

document.getElementById('usersContainer').addEventListener('click', async (event) => {
    if (event.target.classList.contains('update-role-btn')) {
        const email = event.target.dataset.userEmail;
        try {
            const response = await fetch(`/api/users/premium/admin/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);
            alert('User role updated successfully');
        } catch (error) {
            console.error('Error updating user role:', error);
            alert('Error updating user role. Please try again later.');
        }
    } else if (event.target.classList.contains('delete-user-btn')) {
        const email = event.target.dataset.userEmail;
        try {
            const response = await fetch(`/api/users/admin/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user. Please try again later.');
        }
    }
});