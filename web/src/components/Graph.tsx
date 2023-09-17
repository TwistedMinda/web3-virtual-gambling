import { AxisOptions, Chart } from 'react-charts'
import { useMemo } from 'react';
import { useEthPrice } from 'hooks/useEthPrice';

import ETH_HISTORY from '../eth.json'

const ethHistory = ETH_HISTORY.map((item) => ({
	date: new Date(item.timestamp),
	stars: item.close,
}))

export const Graph = () => {

	const { price } = useEthPrice()

	type DailyStars = {
		date: Date,
		stars: number,
	}
	
	type Series = {
		label: string,
		data: DailyStars[]
	}
	
	const data: Series[] = [
		{
			label: '',
			data: ethHistory
		}
	]

	const primaryAxis = useMemo(
		(): AxisOptions<DailyStars> => ({
			getValue: datum => datum.date,
		}),
		[]
	)

	const secondaryAxes = useMemo(
		(): AxisOptions<DailyStars>[] => [
			{
				getValue: datum => datum.stars,
				elementType: 'line',
				formatters: {
					tooltip: (datum: any) => `${datum}€`
				}
			},
		],
		[]
	)


  return (
		<div className='w-96'>
			<div className='text-red-500 text-center flex-1 rounded bg-gray-100 p-2 opacity-80'>
				Game ID: 22408
			</div>
			
			<div className='bg-white h-96 rounded'>
				<Chart
					options={{
						data,
						primaryAxis,
						secondaryAxes,
					}}
				/>
			</div>

			<div className='text-red-500 text-center flex-1 rounded'>
				Virtual balance: {price}€<br />
				ETH amount: {0} ETH<br />
				Total Value: {price}€
			</div>

			<div className='flex flex-row justify-center'>
				<div className='text-red-500 text-center flex-1 rounded bg-gray-100 p-2 opacity-80'>
					BUY
				</div>

				<div className='text-red-500 text-center flex-1 rounded bg-gray-100 p-2 opacity-80'>
					SELL
				</div>
			</div>
		</div>
  )
}