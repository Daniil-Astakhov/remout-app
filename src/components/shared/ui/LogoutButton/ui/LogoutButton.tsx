import Link from "next/link";
import { memo } from "react";

import style from "./LogoutButton.module.scss";

const LogoutButtont = memo(() => {
	const handleClickOut = () => {
		setTimeout(() => {
			localStorage.clear();
		}, 500);
	};

	return (
		<Link className={style.link} href="/" onClick={handleClickOut}>
			Выйти
		</Link>
	);
});

export default LogoutButtont;
