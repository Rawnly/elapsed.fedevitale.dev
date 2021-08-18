export type TimeFormat = 'DIGITAL' | 'HUMAN_READABLE';
export type TimeData = {
	hours: number;
	minutes: number;
	seconds: number;
}

export const msToHMS = ( ms: number ): TimeData => {
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    // 2- Extract hours:
    const hours = Math.floor( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = Math.floor( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;


	return { seconds, minutes, hours }
}

export const sfn = (n: number) : string => n < 10 ? '0' + n : n.toString();


export const formatTime = (timeData: TimeData, timeFormat: TimeFormat, withSeconds: boolean = false): string => {
	let str: string = '';

	if ( timeFormat === 'DIGITAL' ) {
		str = `${sfn(timeData.hours)}:${sfn(timeData.minutes)}`;

		if ( withSeconds ) {
			str += `:${sfn(timeData.seconds)}`;
		}

		return str
	}

	str = `${timeData.hours}h ${timeData.minutes}m`

	if ( withSeconds ) {
		str += ` ${timeData.seconds}s`;
	}

	return str;
}
