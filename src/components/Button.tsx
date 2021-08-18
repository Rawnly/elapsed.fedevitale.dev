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
		// `hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 flex-shrink-0 px-4 py-2 ml-4 text-sm font-medium text-white bg-${color}-600 border border-transparent rounded-md shadow-sm`,
		`bg-${color}-500 hover:bg-${color}-600 text-white`,
		'transform hover:-translate-y-px active:translate-y-0',
		className
	)}>
		{children}
	</button >
)

export default Button;
