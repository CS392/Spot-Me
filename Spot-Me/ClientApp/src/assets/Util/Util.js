export const checkUserStatus = () => {
    if (localStorage.getItem('user') === null) {
        this.window.location.href = "/login";
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    window.location.href = "/login";
}

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
