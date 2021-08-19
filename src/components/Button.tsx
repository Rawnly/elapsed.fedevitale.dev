import cx, { Argument } from 'classnames';
import React, { FC } from "react";
import colors from 'tailwindcss/colors'


interface IButtonProps {
	color?: keyof typeof colors;
	onClick?: () => void
	disabled?: boolean;
	type?: 'submit' | 'button'
	className?: Argument
	id?: string;
	title?: string;
}


const Button: FC<IButtonProps> = ( { color = 'indigo', children, className = [], ...props } ) => (
	<button {...props} className={cx(
		'cursor-pointer rounded px-4 py-2 shadow-sm transition-colors font-semibold',
		`bg-${color}-500 hover:bg-${color}-600 text-white`,
		'transform hover:-translate-y-px active:translate-y-0',
		`disabled:hover:bg-${color}-500 disabled:bg-${color}-300 disabled:cursor-not-allowed disabled:transform-none`,
		className
	)}>
		{children}
	</button >
)

export default Button;
