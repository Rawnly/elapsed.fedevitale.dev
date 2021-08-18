import React, { FC } from "react";

interface IInputGroupProps {
	name: string;
	label: string;
	type?: React.InputHTMLAttributes<HTMLInputElement>['type']
	icon?: React.ReactNode;
}

const InputGroup: FC<IInputGroupProps> = ( { name, label, icon, type = 'text' } ) => (
	<div>
		<label htmlFor={name} className="block text-sm font-medium text-gray-700">
			{label}
		</label>
		<div className="relative mt-1 rounded-md shadow-sm">
			{icon && (
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<span className="sm:text-sm text-gray-500">
						{icon}
					</span>
				</div>
			)}
			<input
				type={type}
				name={name}
				id={name}
				className="focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm block w-full pr-12 border-gray-300 rounded-md"
				placeholder="0.00"
			/>
		</div>
	</div>
);


export default InputGroup;
