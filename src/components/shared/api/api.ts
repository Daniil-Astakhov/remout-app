import axios from "axios";

export const $api = axios.create({
	baseURL: "http://loyalty-dev.spb.lichishop.com/",
	withCredentials: true,
});
