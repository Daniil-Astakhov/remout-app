import { FC, useState, ChangeEvent, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import styles from "./lichiInput.module.scss";

interface InputProps {
	label?: string | undefined;
	placeholder?: string | undefined;
	onChange?: (value: string | null) => void;
	endContent?: JSX.Element | null;
	type?: string | undefined;
	debounce?: number | undefined;
	classes?: object | null;
}

const LichiInput: FC<InputProps> = ({
	label = "",
	endContent = null,
	type = "input",
	placeholder = "",
	onChange = () => {},
	debounce = 10,
	classes = {},
	...rest
}): JSX.Element => {
	const [inputContent, setInputContent] = useState<string>("");

	const debouncedValue: number | undefined | string = useDebounce(
		inputContent,
		debounce
	);

	const handleInputContent = (e: ChangeEvent<HTMLInputElement>) =>
		setInputContent(e.target.value);

	useEffect(() => {
		if (inputContent && onChange) {
			onChange(debouncedValue);
		} else {
			onChange("");
		}
	}, [debouncedValue]);

	return (
		<div className={`${styles.inputWrapper} ${classes}`}>
			<input
				onChange={handleInputContent}
				value={inputContent}
				id="input"
				aria-label={label}
				className={styles.input}
				type={type}
				placeholder={placeholder}
				{...rest}
			/>
			<label
				className={`${styles.label} ${
					(inputContent.length || placeholder) && styles.activeLabel
				}`}
				htmlFor="input"
			>
				{label}
			</label>
			{endContent && <div className={styles.endContent}>{endContent}</div>}
		</div>
	);
};

export default LichiInput;
