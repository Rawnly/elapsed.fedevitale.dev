import React, { FC, useEffect } from "react";
import { ClockIcon } from '@heroicons/react/solid'
import Button from './Button';
import { useState } from 'react';

interface ITimeInputProps {
	label: string;
	name: string;
	onChange( time: string, unit: string ): void;
	select: {
		name: string;
		label: string;
		options: { label: string; value: string }[]
	}
}

const TimeInput: FC<ITimeInputProps> = ( { label, onChange, name, select } ) => {
	const [text, setText] = useState( null )
	const [unit, setUnit] = useState( 'm' )

	useEffect( () => {
		onChange( text, unit )
	}, [text, unit] )

	return (
		<div>
			<label htmlFor={name} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<div className="relative mt-1 rounded-md shadow-sm">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<span className="sm:text-sm text-gray-500">
						<ClockIcon className='w-3 h-3' />
					</span>
				</div>
				<input
					type="text"
					name={name}
					id={name}
					className="focus:ring-blueGray-500 focus:border-blueGray-500 pl-7 sm:text-sm block w-full pr-12 border-gray-300 rounded-md"
					placeholder="0.00"
					value={text}
					onChange={( e ) => setText( e.target.value )}
				/>
				<div className="absolute inset-y-0 right-0 flex items-center">
					<label htmlFor={select.name} className="sr-only">
						{select.label}
					</label>
					<select
						id={select.name}
						name={select.name}
						className="focus:ring-blueGray-500 focus:border-blueGray-500 pr-7 sm:text-sm h-full py-0 pl-2 text-gray-500 bg-transparent border-transparent rounded-md"
						defaultValue={unit}
						onChange={( e ) => setUnit( e.target.value )}
					>
						{select.options.map( ( option ) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						) )}
					</select>
				</div>
			</div>
		</div>
	);
}


export default TimeInput;
