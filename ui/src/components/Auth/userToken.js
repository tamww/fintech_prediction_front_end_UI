import {createAuthProvider} from 'react-token-auth';

/*variables: to handle the request communication with backend server*/
export const [useAuth, authFetch, logintoken, logout] =
    createAuthProvider({
        accessTokenKey: 'access_token',
        onUpdateToken: (token) => fetch('http://localhost:5000/api/refresh', {
            method: 'POST',
            body: token.access_token
        })
        .then(r => r.json())
    });
