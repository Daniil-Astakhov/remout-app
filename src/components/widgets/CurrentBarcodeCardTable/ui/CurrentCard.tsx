"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	Button,
	Card,
	CardBody,
	Divider,
	Skeleton,
	Snippet,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { animationOpacity } from "@/components/styles/motion/animation";
import { LichiSelect } from "@/components/shared/ui/LichiSelect";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import {
	getUserBarcode,
	getUserData,
	userActions,
} from "@/components/entities/User";
import { getHistoryList } from "@/components/entities/HistoryTableData";

import { getGlobalSpin } from "@/components/shared/ui/SpinGlobal/model/selectors/spinGlobalSelectors";
import { getUserCards } from "@/components/entities/User/model/selectors/userSelectors";
import { LichiModal } from "@/components/shared/ui/LichiModal/LichiModal";
import { getStatus } from "../../FormManualCard/model/selectors/formManuCardSelectors";
import FormManualCard from "../../FormManualCard/ui/FormManuCard";
import styles from "./CurrentCard.module.scss";

const CurrentCard = memo(() => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [cards, setCards] = useState<any>();

	const cardsList = useSelector(getUserCards);
	const loading = useSelector(getGlobalSpin);
	const formStatus = useSelector(getStatus);
	const user = useSelector(getUserData);

	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(() => {
		if (user[0]?.card)
			setCards(
				user.map((item: { card: { barcode: string } }, key: number) => {
					return { id: key, key: item?.card.barcode };
				})
			);
		if (user[0]?.card)
			dispatch(getHistoryList({ barcode: user[0]?.card.barcode }));
		if (user[0]?.card)
			dispatch(getUserBarcode({ barcode: user[0]?.card.barcode }));
	}, [user]);

	useEffect(() => {
		return () => {
			dispatch(userActions.setUser([]));
			dispatch(userActions.setUserCards([]));
			setCards([]);
		};
	}, []);

	useEffect(() => {
		if (formStatus === 200) {
			setModalOpen(false);
		}
	}, [formStatus]);

	const getSelect = (elem: string) => {
		if (elem) {
			dispatch(getHistoryList({ barcode: elem }));
			dispatch(getUserBarcode({ barcode: elem }));
		}
	};
	const getFlag = (value: boolean) => {
		setModalOpen(value);
	};

	return (
		<motion.div
			className={styles.mainWrap}
			{...animationOpacity}
			transition={{ duration: 0.4 }}
		>
			<LichiModal
				open={modalOpen}
				onChange={getFlag}
				contents={{
					header: (
						<div className="text-[#000000d0] flex justify-center items-center">
							Работа с бонусами карты:{" "}
							<Snippet
								tooltipProps={{
									color: "danger",
									content: "Копировать Email",
									disableAnimation: true,

									closeDelay: 0,
								}}
								symbol=""
								className={styles.snippet}
							>
								{user[0]?.card?.barcode}
							</Snippet>
						</div>
					),
					body: <FormManualCard barcode={user[0]?.card?.barcode} />,
					footer: null,
				}}
			/>
			<Card className={styles.Card}>
				<CardBody className={styles.CardBody}>
					<div className={styles.header}>
						<Button
							id="back"
							className={styles.backBtn}
							onClick={() => {
								router.back();
							}}
						>
							<img src="back.svg" alt="back" />
							<p>НАЗАД</p>
						</Button>
						<div className={styles.manualWrap}>
							<div className={styles.select}>
								{cards ? (
									<LichiSelect
										label="Карта №"
										noValue="Нет данных"
										defaultSelect={cards[0].key}
										onChange={getSelect}
										items={cards}
									/>
								) : null}
							</div>
							<Button
								id="TestButton"
								className={styles.manualBtn}
								onClick={() => setModalOpen(true)}
							>
								Бонусы карты
							</Button>
						</div>
					</div>

					<div className={styles.wrapCardContent}>
						<div className={styles.spanWrap}>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Имя</p>
								<Skeleton isLoaded={!loading} className="rounded-lg w-full">
									<p className={styles.pContent}>
										{cardsList[0]?.card?.u_firstname}{" "}
										{cardsList[0]?.card?.u_middlename}{" "}
										{cardsList[0]?.card?.u_lastname}
									</p>
								</Skeleton>
							</span>

							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Email</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<Snippet
										tooltipProps={{
											color: "danger",
											content: "Копировать Email",
											disableAnimation: true,

											closeDelay: 0,
										}}
										symbol=""
										className={styles.snippet}
									>
										<p className={styles.pContent}>
											{cardsList[0]?.card?.u_email ?? <span>Не указан</span>}
										</p>
									</Snippet>
								</Skeleton>
							</span>

							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Телефон </p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<Snippet
										tooltipProps={{
											color: "danger",
											content: "Копировать Телефон",
											disableAnimation: true,

											closeDelay: 0,
										}}
										symbol=""
										className={styles.snippet}
									>
										<p className={styles.pContent}>
											{cardsList[0]?.card?.u_phone ?? <span>Не указан</span>}
										</p>
									</Snippet>
								</Skeleton>
							</span>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Карта создана</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p className={styles.pContent}>
										{cardsList[0]?.card?.created_at}
									</p>
								</Skeleton>
							</span>
						</div>

						<div className={styles.spanWrap}>
							<Divider
								className="h-full pt-[42px] absolute left-[-20px]"
								orientation="vertical"
							/>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Сумма</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p className={styles.pContent}>{cardsList[0]?.credit.sum}</p>
								</Skeleton>
							</span>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Бонусы</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p className={styles.pContent}>{cardsList[0]?.credit.hold}</p>
								</Skeleton>
							</span>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Сумма холда</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p className={styles.pContent}>{cardsList[0]?.credit.hold}</p>
								</Skeleton>
							</span>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Сумма последней покупки</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p
										className={styles.pContent}
									>{`${cardsList[0]?.card?.last_purchase_amount} ${cardsList[0]?.card?.status?.current?.currency}`}</p>
								</Skeleton>
							</span>
						</div>
						<div className={styles.spanWrap}>
							<Divider
								className="h-full pt-[42px] absolute left-[-20px]"
								orientation="vertical"
							/>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Регион</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p className={styles.pContent}>
										{cardsList[0]?.card?.region}
									</p>
								</Skeleton>
							</span>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Тип</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p className={styles.pContent}> {cardsList[0]?.card?.type}</p>
								</Skeleton>
							</span>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Текущий %</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p className={styles.pContent}>
										{cardsList[0]?.card?.status?.current?.bonus_percent}%
									</p>
								</Skeleton>
							</span>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Период рефила</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p className={styles.pContent}>
										{cardsList[0]?.card?.status?.current?.refill_period}
									</p>
								</Skeleton>
							</span>
						</div>
						<div className={styles.spanWrap}>
							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Период валидации</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p className={styles.pContent}>
										{cardsList[0]?.card?.status?.current?.validity_period}
									</p>
								</Skeleton>
							</span>

							<span className={styles.pWrap}>
								<p className={styles.pTitle}>Имя карты</p>
								<Skeleton isLoaded={!loading} className="rounded-lg">
									<p className={styles.pContent}>
										{cardsList[0]?.card?.status?.current?.name}
									</p>
								</Skeleton>
							</span>
						</div>
					</div>
				</CardBody>
			</Card>
		</motion.div>
	);
});

export default CurrentCard;
