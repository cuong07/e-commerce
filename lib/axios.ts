import axios from 'axios';

const request = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_HOST_API_URL}:${process.env.NEXT_PUBLIC_POST_API_URL}/${process.env.NEXT_PUBLIC_API_PREFIX}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
    },
});
export { request };
