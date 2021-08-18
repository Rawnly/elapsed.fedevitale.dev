import React, { FC } from "react";

interface ICheckBoxProps {
	label: string;
	name: string;
	checked: React.InputHTMLAttributes<HTMLInputElement>['checked'];
	onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
}

const CheckBox: FC<ICheckBoxProps> = ( { label, checked, children, name, onChange } ) => (
	<div className="relative flex items-start">
		<div className="flex items-center h-5">
			<input
				id={name}
				aria-describedby={`${name}-description`}
				name={name}
				type="checkbox"
				checked={checked}
				className="focus:ring-blueGray-500 text-blueGray-600 w-4 h-4 border-gray-300 rounded"
				onChange={onChange}
			/>
		</div>
		<div className="ml-3 text-sm">
			<label htmlFor={name} className="font-medium text-gray-700">
				{label}
			</label>
			<p id="offers-description" className="text-gray-500">
				{children}
			</p>
		</div>
	</div>
)

export default CheckBox;
