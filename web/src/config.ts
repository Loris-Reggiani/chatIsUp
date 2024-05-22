let apiUrl = 'https://voron.djnn.sh/api';

//console.log(apiUrl)

if (import.meta.env.VITE_REACT_APP_NODE_ENV === 'development')
    apiUrl = import.meta.env.VITE_REACT_APP_LOCAL_API_URL as string;

//apiUrl = 'http://localhost:8000';

console.log(apiUrl)

const config = {
    apiUrl,
};

export default config;
