import axios from 'axios';

export const keycloakApi = axios.create({
    baseURL: `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect`,
    timeout: 10000
})

