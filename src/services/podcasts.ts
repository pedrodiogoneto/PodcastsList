import { axiosInstance } from '.';

export async function getAllPodcasts(): Promise<any> {
	const res = await axiosInstance.get(
		`/us/rss/toppodcasts/limit=100/genre=1310/json`
	);
	return res;
}
