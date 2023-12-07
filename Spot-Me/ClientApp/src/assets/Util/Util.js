// Description: This file contains all the reusable functions that are used throughout the application.

// reusable function to route unlogged in users / logged in users to the correct page
export const checkUserStatus = () => {
    if (localStorage.getItem('user') === null) {
        window.location.href = "/login";
    }
}

// reusable function to log out a user
export const logout = () => {
    localStorage.removeItem('user');
    window.location.href = "/login";
}

// reusable function to get all users
export const getAllUsers = async () => {
    try {
        const response = await fetch(`https://localhost:7229/api/user`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching users:", error.message);
    }
}

// reusable function to update a user with their id
export const updateUser = async (id, updatedUser) => {
    try {
        const response = await fetch(`https://localhost:7229/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(updatedUser),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error updating user:", error.message);
    }
}

// reusable function to get a user by their username
export const getUserByUsername = async (username) => {
    try {
        const response = await fetch(`https://localhost:7229/api/user/username/${username}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching user:", error.message);
    }
}
