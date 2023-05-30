import { axiosInstance } from '.';
// eslint-disable-next-line import/no-extraneous-dependencies
import { XMLParser } from 'fast-xml-parser';

const handleData = (data: any) => {
	const dic: any = {};

	data?.map((item: any) => {
		dic[item?.id?.attributes?.['im:id']] = {
			image: item?.['im:image']?.[item?.['im:image']?.length - 1]?.label,
			name: item?.['im:name']?.label,
			author: item?.['im:artist']?.label,
			id: item?.id?.attributes?.['im:id'],
			summary: item?.summary?.label,
		};
	});

	return dic;
};

export async function getAllPodcasts(): Promise<any> {
	const res = await axiosInstance.get(
		`/us/rss/toppodcasts/limit=100/genre=1310/json`
	);

	const parsedData = handleData(res?.data?.feed?.entry);

	await localStorage.setItem('podcasts', JSON.stringify(parsedData));

	return parsedData;
}

export async function getPodcastById(id: string): Promise<any> {
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const targetUrl = `lookup?id=${id}`;

	const res = await axiosInstance.get(targetUrl, {
		headers: {
			'Access-Control-Allow-Origin': true,
		},
	});

	let rssResponse = {};

	if (res?.data?.results?.[0]?.feedUrl) {
		const episodesRes: any = await axiosInstance.get(
			proxyUrl + res?.data?.results?.[0]?.feedUrl
		);

		const parser = new XMLParser();
		let jObj = parser.parse(episodesRes?.data);
		rssResponse = jObj?.rss?.channel;
	}

	return { response: res, episodesData: rssResponse };
}
