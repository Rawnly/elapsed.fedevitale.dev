import React, { useState } from 'react';
import { NextPage } from 'next';
import { useLocalStorage } from 'beautiful-react-hooks'
import { nanoid } from 'nanoid'
import Button from '../components/Button';
import TimeInput from '../components/TimeInput';
import Select from '../components/Select';
import CheckBox from '../components/CheckBox';
import { formatTime, msToHMS, TimeFormat } from '../lib/util';
import { ClipboardIcon, SwitchHorizontalIcon, ArrowLeftIcon } from '@heroicons/react/solid'
import ms from 'ms'
import { match } from 'ts-pattern'
import Clipboard from 'clipboard'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react';

interface PageProps { }




const Page: NextPage<PageProps> = _ => {
	const [isVerbose, setIsVerbose] = useState( false )
	const [format, setFormat] = useState<TimeFormat>( 'DIGITAL' )
	const [time, setTime] = useState( { text: null, unit: 'm' } )
	const [showNotification, setShowNotification] = useState( false )

	const [result, setResult] = useState( '' );

	useEffect( () => {
		if ( !showNotification ) return;
		setTimeout( () => setShowNotification( false ), 750 )
	}, [showNotification] )

	function onSubmit() {
		let milliseconds = parseInt( time.text );

		if ( time.unit !== 'ms' ) {
			milliseconds = ms( `${time.text} ${time.unit}` )
		}

		const timeData = msToHMS( milliseconds )

		setResult( formatTime( timeData, format, isVerbose ) )
	}

	function swapUnit() {
		const timeFormat: TimeFormat = match( format )
			.with( 'DIGITAL', () => 'HUMAN_READABLE' )
			.with( 'HUMAN_READABLE', () => 'DIGITAL' )
			.exhaustive() as TimeFormat

		setFormat( timeFormat )
		onSubmit()
	}

	function copyResultToClipboard() {
		const clip = new Clipboard( '.copy-btn', {
			text: () => result
		} )

		clip.on( 'success', () => {
			setShowNotification( true )
		} )
	}

	return (
		<div className='bg-blueGray-800 flex flex-col items-center justify-center w-screen h-screen'>
			<h1 className='font-colus w-full mb-2 text-3xl text-center text-white'>Elapsed</h1>
			<div className='relative flex flex-col gap-2 p-4 bg-white rounded shadow-lg' style={{ minWidth: 300 }}>
				{result && (
					<>
						<button onClick={swapUnit} className='top-3 hover:bg-gray-50 right-3 active:bg-gray-100 absolute p-2 rounded-full cursor-pointer'>
							<SwitchHorizontalIcon className='text-blueGray-800 w-3 h-3' />
						</button>
						<h3 className='tabular-nums text-blueGray-800 w-full my-4 text-2xl font-bold leading-relaxed text-center cursor-pointer'>{result}</h3>
						<div className="flex gap-2">
							<Button className='hover:bg-blueGray-600 bg-blueGray-500 flex items-center w-full gap-2 mt-4 text-left' color='blueGray' onClick={() => setResult( null )}>
								<ArrowLeftIcon className='w-5 h-5' />
								<span>Back</span>
							</Button>
							<Button color='lime' className='copy-btn hover:bg-lime-600 bg-lime-500 mt-4' onClick={copyResultToClipboard}>
								<ClipboardIcon className='w-5 h-5' />
							</Button>
						</div>
					</>
				)}

				{!result && (
					<>
						<TimeInput
							onChange={( text, unit ) => setTime( { text, unit } )}
							name='time'
							label='Time'
							select={{
								label: 'Unit',
								name: 'unit',
								options: [
									{
										label: 'Hours',
										value: 'h'
									},
									{
										label: 'Minutes',
										value: 'm'
									},
									{
										label: 'Seconds',
										value: 's'
									},
									{
										label: 'Milliseconds',
										value: 'ms'
									},
								]
							}}
						/>

						<fieldset className='-mt-3 space-y-4 bg-white'>
							<legend className='block w-full mb-2 text-sm font-medium text-center text-gray-700 sr-only'>Options</legend>
							<Select<TimeFormat>
								label='Format'
								name='format'
								onChange={setFormat}
								options={[
									{
										id: nanoid(),
										label: 'Digital (00:00)',
										value: 'DIGITAL'
									},
									{
										id: nanoid(),
										label: 'Human Readable (0h 0m 0s)',
										value: 'HUMAN_READABLE'
									},
								]}
							/>

							<CheckBox label='Verbose' name='verbose' checked={isVerbose} onChange={() => setIsVerbose( x => !x )}>
								Add seconds to the conversion.
							</CheckBox>

						</fieldset>

						<Button color='blueGray' className='hover:bg-blueGray-600 bg-blueGray-500 mt-4' onClick={onSubmit}>
							Calculate
						</Button>
					</>
				)}
			</div>

			<AnimatePresence>
				{showNotification && (
					<motion.div className='bottom-5 absolute p-3 leading-relaxed text-center bg-white rounded shadow'
						style={{ width: '80vw', maxWidth: 250 }}
						exit={{
							opacity: 0,
							translateY: 10,
							scale: .97
						}}
						initial={{
							opacity: 0,
							translateY: 10,
							scale: .97
						}}
						animate={{
							opacity: 1,
							translateY: 0,
							scale: 1
						}}
					>
						Copied to clipboard
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
};

Page.displayName = 'IndexPage';

export default Page;
