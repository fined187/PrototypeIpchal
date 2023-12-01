import axios from 'axios';

export const baseApiURL = 'https://business.juso.go.kr';

const headers = {
	"Content-Type": "application/json"
};

const baseApiInstance = axios.create({
  baseURL: baseApiURL,
  headers
});

export default baseApiInstance;