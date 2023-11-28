import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

interface Props {
	menuTitle: string;
}

export default function Navbar({ menuTitle }: Props) {
	return (
		<>
			<div className="nav__bar">
				<div className="nav__bar__logo">
					<IoIosMenu size={30} className="cursor-pointer ml-2" />
				</div>
				<div className="nav__bar--title">
					<span>{menuTitle}</span>
				</div>
				{/* mobile button */}
				<div>
					<div className="nav__bar__mobile--close">
						<IoMdClose size={30} className="mr-2 cursor-pointer" />
					</div>
				</div>
			</div>
		</>
	)
}