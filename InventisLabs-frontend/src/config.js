export const getApiUrl = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Ensure URL has a protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // If localhost, use http, otherwise https
        if (url.includes('localhost')) {
            url = `http://${url}`;
        } else {
            url = `https://${url}`;
        }
    }

    // Remove trailing slash if present to avoid double slashes when appending paths
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    return url;
};
