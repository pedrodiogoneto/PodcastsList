// eslint-disable-next-line import/no-extraneous-dependencies
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { getAllPodcasts, getPodcastById } from '../../services/podcasts';

const PodcastDetails = () => {
	const [podcastDetails, setPodcastDetails] = useState<any>();
	const [podcastCachedInfo, setPodcastCachedInfo] = useState<any>();
	const [rssInfo, setRssInfo] = useState<any>();

	const history = useHistory();

	const { id } = useParams<any>();

	const getPodcastDetails = async () => {
		try {
			const res = await getPodcastById(id);

			if (res) {
				const { response, episodesData } = res;

				setPodcastDetails(response?.data?.results?.[0]);
				setRssInfo(episodesData?.item);
			}
		} catch (error) {
			console.log('ERR>>>', error);
		}
	};

	useEffect(() => {
		const isLocalStoragePopulated = localStorage?.getItem('podcasts') || '';

		if (!isLocalStoragePopulated) {
			const parsedData: any = getAllPodcasts();
			setPodcastCachedInfo(parsedData?.[id]);
		} else {
			setPodcastCachedInfo(JSON.parse(isLocalStoragePopulated)?.[id]);
		}
		getPodcastDetails();
	}, []);

	return (
		<div>
			<Navbar isLoading={!podcastDetails} />
			<div className="mt-6 flex">
				<div className="w-1/3">
					<div className="border rounded p-4 flex flex-col justify-center">
						<img src={podcastCachedInfo?.image} className="px-2 rounded mb-2" />
						<hr className="border" />
						<p>{podcastCachedInfo?.name}</p>
						<p>{podcastCachedInfo?.author}</p>
						<hr className="border" />
						<p>Description</p>
						<p>{podcastCachedInfo?.summary}</p>
					</div>
				</div>
				<div className="w-2/3">
					<div className="border rounded p-2">
						<h2>Episodes: {podcastDetails?.trackCount}</h2>
					</div>

					<div className="border rounded p-2 mt-6">
						<div className="overflow-x-auto">
							<table className="table table-zebra w-full">
								{/* head */}
								<thead>
									<tr>
										<th>Title</th>
										<th>Date</th>
										<th>Duration</th>
									</tr>
								</thead>
								<tbody>
									{/* row 1 */}
									{rssInfo?.map((episode: any) => {
										return (
											<tr
												key={episode?.guid}
												onClick={() => {
													return history.push(
														`/podcast/${id}/episode/${episode?.['acast:episodeId']}`,
														episode
													);
												}}
											>
												<td>{episode?.title}</td>
												<td>
													{format(new Date(episode?.pubDate), 'dd/MM/yyyy')}
												</td>
												<td>{episode?.['itunes:duration']}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PodcastDetails;
