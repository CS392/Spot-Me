export const checkUserStatus = () => {
    if (localStorage.getItem('user') === null) {
        this.window.location.href = "/login";
    }
}
