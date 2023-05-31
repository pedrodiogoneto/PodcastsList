import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';

const EpisodeDetails = () => {
	const [episodeDetails, setEpisodeDetails] = useState<any>();
	const [podcastCachedInfo, setPodcastCachedInfo] = useState<any>();

	const location = useLocation<any>();

	const { id, episodeId } = useParams<any>();

	useEffect(() => {
		if (episodeId) {
			setEpisodeDetails(location?.state);
			setPodcastCachedInfo(
				JSON.parse(localStorage?.getItem('podcasts') || '')?.[id]
			);
		}
	}, [location?.state]);

	return (
		<div>
			<Navbar isLoading={!episodeDetails} />
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
						<h2>{episodeDetails?.['itunes:title']}</h2>
						<h3>{episodeDetails?.['itunes:subtitle']}</h3>
						<audio className="w-full" controls>
							<source src={episodeDetails?.enclosure?.url} type="audio/mpeg" />
						</audio>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EpisodeDetails;
