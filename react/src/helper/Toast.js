const { __ } = wp.i18n
import React, { useEffect, useState } from "react";
import "./Toast.scss";
import icons from "../library/icons";

const Toast = ({
	delay,
	toastMessages,
	setToastMessages
}) => {

	const [visible, setVisible] = useState(true);
	const [show, setShow] = useState('show');

	const deleteMessage = (idx) => {
		let copy = [...toastMessages.messages];
		copy = copy.filter((row, index) => {
			return index !== idx;
		});
		setToastMessages({
			...toastMessages,
			messages: copy,
		});
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
			setShow('');
			setToastMessages({
				state: false,
				status: "",
			});
		}, delay);
		return () => clearTimeout(timer);
	}, [delay]);

	return (
		<div className="qmt-scroll-toast">
			{ visible && toastMessages.status && toastMessages.messages.length > 0 && (
				<div className="qmt-scroll-toast-messages">
					{toastMessages.messages.map((message, index) => {
						return (
							<span key={`toast_${Date.now().toString()}_${index}`}>
								<div className={`qmt-scroll-toaster ${show}`}>
									<span>
										{ toastMessages.status === 'error' ? icons.failed : icons.success }
									</span>
									<span className="itmCenter">{message}</span>
									<span className="itmLast" onClick={() => deleteMessage(index)}>{__('Close', 'product-blocks')}</span>
								</div>
							</span>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Toast;