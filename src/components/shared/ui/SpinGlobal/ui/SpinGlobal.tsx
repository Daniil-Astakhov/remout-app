import React from "react";

import { useSelector } from "react-redux";

import cls from "./SpinGlobal.module.scss";
import { getGlobalSpin } from "../model/selectors/spinGlobalSelectors";

const SpinGlobal: React.FC = () => {
	const isActive = useSelector(getGlobalSpin);

	return (
		<div>
			{isActive && (
				<div className={cls.SpinGlobal}>
					<span className={cls.loader} />
				</div>
			)}
		</div>
	);
};

export default SpinGlobal;
