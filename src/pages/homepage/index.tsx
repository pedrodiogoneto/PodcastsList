import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/navbar';
import PodcastCard from '../../components/podcastCard';
import { getAllPodcasts } from '../../services/podcasts';

const Homepage = () => {
	const [podcasts, setPodcasts] = useState<any>();
	const [search, setSearch] = useState<string>();
	const history = useHistory();

	const getPodcasts = async () => {
		try {
			const parsedData = await getAllPodcasts();

			setPodcasts(parsedData);
		} catch (error) {
			console.log('ERR>>>', error);
		}
	};

	const searchBy = (data: any) => {
		if (!search) return true;
		if (
			search?.length &&
			(data?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
				data?.author.toLowerCase()?.includes(search?.toLowerCase()))
		) {
			return true;
		} else {
			return false;
		}
	};

	useEffect(() => {
		const isLocalStoragePopulated = localStorage?.getItem('podcasts');

		if (isLocalStoragePopulated) {
			setPodcasts(JSON.parse(isLocalStoragePopulated));
		} else {
			getPodcasts();
		}
	}, []);

	return (
		<div>
			<Navbar isLoading={!podcasts} />
			<div className="flex items-center justify-end mt-4">
				<span className="badge mr-4 bg-blue-500 rounded-md border-0 text-bold text-lg py-3 px-2">
					{podcasts && Object?.keys(podcasts)?.length}
				</span>
				<input
					onChange={(e) => setSearch(e.target?.value)}
					type="text"
					placeholder="Filter podcasts..."
					className="border rounded-md px-4 py-3"
				/>
			</div>
			<div className="mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-24">
				{podcasts &&
					Object.values(podcasts)
						?.filter(searchBy)
						?.map((podcast: any) => {
							return (
								<div key={podcast?.id}>
									<PodcastCard
										onClick={() => history.push(`/podcast/${podcast?.id}`)}
										title={podcast?.name}
										image={podcast?.image}
										author={podcast?.author}
									/>
								</div>
							);
						})}
			</div>
		</div>
	);
};

export default Homepage;
