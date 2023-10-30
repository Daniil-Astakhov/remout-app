/* eslint-disable no-console */
/* eslint-disable camelcase */

"use client";

import { useSelector } from "react-redux";
import { getGlobalSpin } from "@/components/shared/ui/SpinGlobal/model/selectors/spinGlobalSelectors";
import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Switch,
} from "@nextui-org/react";
import { FC, FormEvent, memo, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { animationOpacity } from "@/components/styles/motion/animation";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import { FormSchema } from "../model/types/formManuCardSchema";
import { manualCard } from "../model/actions/formManuCardActions";

import { getStatus } from "../model/selectors/formManuCardSelectors";
import { manualFormActions } from "../model/slice/formManuCardSlice";
import { manualCardAll } from "../model/actions/formManuCardActionsAll";
import style from "./FormManuCard.module.scss";

interface FormProps {
	barcode?: string;
	region?: string;
}

const FormManualCard: FC<FormProps> = memo(
	({ barcode = null, region = null }) => {
		const [value, setValue] = useState<Dayjs | null>(dayjs());
		const [expireDate, setExpireDate] = useState<Dayjs | null>(dayjs());
		const [isSelected, setIsSelected] = useState(false);

		const tomorrow = dayjs();

		const dispatch = useAppDispatch();

		const loading = useSelector(getGlobalSpin);

		const status = useSelector(getStatus);

		const sendAuthorizationData = async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (barcode) {
				const formData = new FormData(event.currentTarget);
				const form: FormSchema = {
					barcode: formData.get("barcode") as string,
					bonus: formData.get("bonus") as string,
					sum: formData.get("sum") as string,
					valid_at: expireDate?.format("YYYY-MM-DD-HH:mm:ss") as
						| string
						| Dayjs
						| any,
					is_expiring: isSelected as unknown,
					expire_date: !isSelected
						? null
						: (value?.format("YYYY-MM-DD-HH:mm:ss") as
								| unknown
								| boolean
								| string),
					author: formData.get("author") as string,
					comment: formData.get("comment") as string,
				};
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore;
				dispatch(manualCard(form));
			} else {
				const formData = new FormData(event.currentTarget);
				const form: FormSchema = {
					region: formData.get("region") as string,
					bonus: formData.get("bonus") as string,
					sum: formData.get("sum") as string,
					valid_at: expireDate?.format("YYYY-MM-DD-HH:mm:ss") as
						| string
						| Dayjs
						| any,
					is_expiring: isSelected as unknown,
					expire_date: !isSelected
						? null
						: (value?.format("YYYY-MM-DD-HH:mm:ss") as
								| unknown
								| boolean
								| string),
					author: formData.get("author") as string,
					comment: formData.get("comment") as string,
				};
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore;
				dispatch(manualCardAll(form));
			}
		};

		return (
			<motion.div
				{...animationOpacity}
				transition={{ duration: 0.4 }}
				className={`${style.formWrap} w-full`}
			>
				<form onSubmit={sendAuthorizationData}>
					<div className={style.gridWrap}>
						{!region ? (
							<div className={`${style.inputWrap}`}>
								<div className={style.forgot}>
									<label htmlFor="barcode" className={style.label}>
										Штрихкод
									</label>
								</div>
								<input
									className={style.input}
									inert="true"
									id="barcode"
									defaultValue={barcode ?? ""}
									name="barcode"
									type="text"
									required
								/>
							</div>
						) : (
							<div className={style.inputWrap}>
								<div className={style.forgot}>
									<label htmlFor="region" className={style.label}>
										Регион
									</label>
								</div>

								<input
									className={style.input}
									inert="true"
									id="region"
									defaultValue={region ?? ""}
									name="region"
									type="text"
									required
								/>
							</div>
						)}

						<div className={style.inputWrap}>
							<div className={style.forgot}>
								<label htmlFor="bonus" className={style.label}>
									Бонусы
								</label>
							</div>

							<input
								className={style.input}
								id="bonus"
								name="bonus"
								type="number"
								required
							/>
						</div>
						<div className={style.inputWrap}>
							<div className={style.forgot}>
								<label htmlFor="sum" className={style.label}>
									Сумма пополнения
								</label>
							</div>

							<input
								className={style.input}
								id="sum"
								name="sum"
								type="number"
								required
							/>
						</div>

						<div className={style.inputWrap}>
							<div className={style.forgot}>
								<label htmlFor="author" className={style.label}>
									Автор
								</label>
							</div>

							<input
								className={style.input}
								id="author"
								name="author"
								type="text"
								required
							/>
						</div>

						<div className={style.inputWrap}>
							<div className={style.forgot}>
								<label htmlFor="comment" className={style.label}>
									Комментарий
								</label>
							</div>

							<input
								className={style.input}
								id="comment"
								name="comment"
								type="text"
								required
							/>
						</div>
						<div className={style.inputWrap}>
							<div className={style.forgot}>
								<label htmlFor="is_expiring" className={style.label}>
									Временная?
								</label>
							</div>
							<Switch
								id="is_expiring"
								name="is_expiring"
								isSelected={isSelected}
								value={isSelected ? "true" : "false"}
								onValueChange={setIsSelected}
								className="h-[30px]"
								size="sm"
							/>
						</div>
						<div className="flex flex-col items-center justify-around h-[82px]">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<label htmlFor="expire-date" className={style.label}>
									Действительно до
								</label>
								<DateTimeField
									id="expire-date"
									name="expire-date"
									value={expireDate}
									className="bg-white rounded-[8px] h-[32px] p-[6px 6px]"
									style={{ padding: "6px 8px" }}
									onChange={(newValue) => setExpireDate(newValue)}
									format="L HH:mm"
									slotProps={{ textField: { size: "small" } }}
								/>
							</LocalizationProvider>
						</div>
						<div className="flex flex-col items-center justify-around h-[82px]">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<label htmlFor="valid_at" className={`${style.label}`}>
									Дата окончания
								</label>
								<DateTimeField
									id="valid_at"
									name="valid_at"
									minDate={tomorrow}
									className="bg-white rounded-[8px] h-[32px] p-[6px 6px]"
									value={isSelected ? value : null}
									defaultValue={isSelected ? null : ""}
									disabled={!isSelected}
									onChange={(newValue: any) => setValue(newValue)}
									format="L HH:mm"
								/>
							</LocalizationProvider>
						</div>
					</div>

					<div>
						<Popover
							isOpen={status !== 200 && status !== 0}
							onOpenChange={() =>
								setTimeout(() => {
									dispatch(manualFormActions.setSuccess(0));
								}, 1000)
							}
							placement="top"
							shouldCloseOnBlur
							offset={10}
							className="bg-[#F54180]"
						>
							<PopoverTrigger>
								<Button isLoading={loading} className={style.btn} type="submit">
									Подтвердить
								</Button>
							</PopoverTrigger>

							<PopoverContent>
								<div className="px-1 py-2 ">
									<div className="text-[14px] font-normal text-[#ffffff] text-center">
										Произошла ошибка
									</div>
									<div className="text-[13px] font-normal text-[#ffffff] text-center">
										Проверьте ввeдeнные данные
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</form>
			</motion.div>
		);
	}
);

export default FormManualCard;
