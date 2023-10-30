import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { FC, useEffect } from "react";

interface contentsProps {
	header: JSX.Element | null;
	body: JSX.Element | null;
	footer: JSX.Element | null;
}

interface LichiModalProps {
	open?: boolean;
	contents?: contentsProps;
	onChange?: (value: boolean) => void;
	isDismissable?: boolean;
}

export const LichiModal: FC<LichiModalProps> = ({
	open = false,
	isDismissable = true,
	contents = {
		header: <div>Хедер</div>,
		body: <div>Боди</div>,
		footer: null,
	},
	onChange = () => {
		return null;
	},
}): JSX.Element => {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

	useEffect(() => {
		if (open) {
			onOpen();
		} else {
			onClose();
		}
	}, [open]);

	useEffect(() => {
		onChange(isOpen);
	}, [isOpen]);

	return (
		<Modal
			isDismissable={isDismissable}
			onOpenChange={onOpenChange}
			className="mt-0 mb-0 first:mb-0 first:mt-0"
			classNames={{
				wrapper: "mt-0 mb-0",
				body: "py-6 w-full overflow-scroll",
				backdrop: "bg-[#292f46]/50 backdrop-opacity-40]",
				base: "border-[#292f46] bg-[#fff] dark:bg-[#fff] text-[#a8b0d3]",
				header: "border-b-[1px] border-[#292f46]",
				footer: "border-t-[1px] border-[#292f46]",
				closeButton: "hover:bg-white/5 active:bg-white/10",
			}}
			size="lg"
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalContent>
				{(close) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{contents.header}
						</ModalHeader>
						<ModalBody>{contents.body}</ModalBody>

						{contents.footer ? (
							<ModalFooter>
								<Button color="danger" variant="light" onPress={close}>
									Close
								</Button>
							</ModalFooter>
						) : null}
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
