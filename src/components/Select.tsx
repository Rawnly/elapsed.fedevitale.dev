import React, { FC } from "react";

type Option<T = string> = {
	id: string;
	label: string;
	value: T;
};

interface ISelectProps<T> {
	label: string;
	name: string;
	defaaultValue?: string;
	onChange: ( value: T ) => void;
	options: Option<T>[];
}

const Select = <T extends {}>( props: ISelectProps<T> ) => (
	<div className="mt-1 -space-y-px rounded-md shadow-sm">
		<div>
			<label htmlFor={props.name} className="block mb-1 text-sm font-medium text-gray-700">
				{props.label}
			</label>
			<select
				id={props.name}
				name={props.name}
				className="focus:ring-blueGray-500 focus:border-blueGray-500 focus:z-10 sm:text-sm relative block w-full bg-transparent border-gray-300 rounded-none rounded-md"
				onChange={e => props.onChange( e.target.value as any )}
			>
				{props.options.map( ( option, index ) => (
					<option
						key={index}
						value={option.value as any}
					// className="relative block w-full bg-transparent border-gray-300 rounded-none"
					>
						{option.label}
					</option>
				) )}
			</select>
		</div>
	</div>
);


export default Select;
