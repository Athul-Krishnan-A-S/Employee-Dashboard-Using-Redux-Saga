export const isTokenValid = () => {
    const loggedInTime = localStorage.getItem('loginTime');
    if (!loggedInTime) {
        return false;
    }
    const loginTimestamp = parseInt(loggedInTime, 10);
    const loginDateTime = new Date(loginTimestamp);
    const currentDateTime = new Date();
    
    const expirationTime = new Date(loginDateTime.getTime() + 3600000);
    
    return currentDateTime < expirationTime;
}