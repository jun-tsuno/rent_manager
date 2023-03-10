import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: string | JSX.Element;
	primary?: boolean;
	secondary?: boolean;
	danger?: boolean;
}

const MyButton = ({
	children,
	primary,
	secondary,
	danger,
	...rest
}: IProps) => {
	const classes = classNames(
		`py-3 px-3 rounded w-full shadow-xl hover:brightness-125 transition duration-300 ease-in-out`,
		{
			"bg-gradient-to-r from-blue-500 to-blue-700 text-white": primary,
			"bg-gradient-to-r from-violet-500 to-violet-700 text-white": secondary,
			"bg-gradient-to-r from-rose-400 to-rose-500 text-white": danger,
		}
	);
	return (
		<button className={classes} {...rest}>
			{children}
		</button>
	);
};

export default MyButton;
