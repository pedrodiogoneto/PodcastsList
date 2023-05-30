import { PodcastCardProps } from './types';

const PodcastCard = ({ title, author, image, onClick }: PodcastCardProps) => {
	return (
		<div
			className="w-60 h-46 flex flex-col rounded shadow-lg border border-grayLight items-center justify-center relative p-6"
			onClick={onClick}
		>
			<div
				className="w-24 h-24 rounded-full absolute -top-12"
				style={{
					backgroundImage: `url(${image})`,
					backgroundSize: 'contain',
					zIndex: 10,
				}}
			></div>
			<h3 className="mt-10 text-center text-sm mb-2">{title}</h3>
			<p className="text-center text-xs">Author: {author}</p>
		</div>
	);
};

export default PodcastCard;
