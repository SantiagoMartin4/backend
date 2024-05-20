document.getElementById('showUsersBtn').addEventListener('click', async () => {
    const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const users = await response.json();
    const usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.innerHTML = `
            <p><strong>Full Name:</strong> ${user.fullName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>Last Connection:</strong> ${user.lastConnection}</p>
            <hr>
        `;
        usersContainer.appendChild(userElement);
    });
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
