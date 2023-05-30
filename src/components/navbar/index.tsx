import { useHistory } from 'react-router-dom';
import Loader from '../loader';
import { NavbarProps } from './types';

const Navbar = ({ isLoading }: NavbarProps) => {
	const history = useHistory();

	return (
		<div className="w-full">
			<div className="mb-1 flex justify-between">
				<a
					className="btn btn-ghost text-xl normal-case text-blue-500"
					onClick={() => history.push('/')}
				>
					Podcaster
				</a>
				{isLoading && <Loader />}
			</div>
			<hr className="border " />
		</div>
	);
};

export default Navbar;
