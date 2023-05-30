import { Switch, Route } from 'react-router-dom';
import './index.css';
import EpisodeDetails from './pages/episodeDetails';
import Homepage from './pages/homepage';
import PodcastDetails from './pages/podcastDetails';

function App() {
	return (
		<div className="w-full h-full p-8">
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>
				<Route exact path="/podcast/:id">
					<PodcastDetails />
				</Route>
				<Route exact path="/podcast/:id/episode/:episodeId">
					<EpisodeDetails />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
