import React from 'react'


/*store the global information in context format */
const UserContext = React.createContext()

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export default UserContext