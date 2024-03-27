/*
 * Checks if the user is an admin based on their email.   
 */
export const isAdmin = (user) => 
{
    return user.email === "admin@mail.com";
}