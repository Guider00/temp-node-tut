import { useEffect, useState } from 'react';
import { useSubscription, useQuery } from '@apollo/client';
import styles from './Realtimetable.module.css';
import { Subdevicemeterrealtime } from '../../../API/Schema/setting/Realtimetable/Realtimetable';
import { API_GET_Portmeters } from '../../../API/Schema/PortMeter/PortMeter';
import { API_GET_MeterRooms } from '../../../API/Schema/MeterRoom/MeterRoom';

const DEFAULTSTATTABLEINDEX = 1;
const DEFAULTSIZETABLEINDEX = 10;
const DEFAULTSTOPTABLEINDEX = DEFAULTSTATTABLEINDEX - 1 + DEFAULTSIZETABLEINDEX;
export const Realtimetable = () => {
	const [devicename, setdevicename] = useState('');
	const [ports, setports] = useState([]);
	const [devices, setdevices] = useState([]);
	const [portselected, setportselected] = useState('---');
	const [deviceselected, setdeviceselected] = useState('---');

	const [tablestartindex, settablestartindex] = useState(DEFAULTSTATTABLEINDEX);
	const [tablestoptindex, settablestoptindex] = useState(DEFAULTSTOPTABLEINDEX);
	const [tableviewsize, settableviewsize] = useState(DEFAULTSIZETABLEINDEX);
	const Portmeters = useQuery(API_GET_Portmeters);
	const MeterRooms = useQuery(API_GET_MeterRooms);

	const subdevicemeterrealtime = useSubscription(Subdevicemeterrealtime);
	const handlerchagetableview = (e) => {
		if (e && e.target) {
			if (e.target.name === 'next') {
				settablestartindex(tablestartindex + tableviewsize);
				settablestoptindex(tablestoptindex + tableviewsize);
			} else if (e.target.name === 'back') {
				if (tablestartindex - tableviewsize > 0) {
					settablestartindex(tablestartindex - tableviewsize);
					settablestoptindex(tablestoptindex - tableviewsize);
				}
			}
		}
	};
	const handleronchange = (e) => {
		console.log('change ', e);
		if (e && e.target) {
			if (e.target.name === 'port') {
				setportselected(e.target.value);
			} else if (e.target.name === 'device') {
				setdeviceselected(e.target.value);
			}
			// set default table view
			settablestartindex(DEFAULTSTATTABLEINDEX);
			settablestoptindex(DEFAULTSTOPTABLEINDEX);
		}
	};
	const filter_datatable = (lists, port, device) => {
		return lists.filter((item) => item.port === port && item.device === device);
	};

	useEffect(() => {
		if (Portmeters.data) {
			setports(JSON.parse(JSON.stringify(Portmeters.data.Portmeters)));
			console.log(Portmeters.data)
		}
		if (MeterRooms.data) {
			setdevices(JSON.parse(JSON.stringify(MeterRooms.data.MeterRooms)));
			console.log(MeterRooms.data)
		}
	}, [Portmeters.data, MeterRooms.data]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1> Realtimetable</h1>

				<div className={styles.boxinput}>
					<div className={styles.forminput}>
						<div className={styles.row50}>
							<label style={{ color: 'rgb(11, 101, 180)' }}> Port </label>
							<select
								style={{ cursor: 'pointer' }}
								name="port" onChange={handleronchange}>
								{ports && ports.length > 0 ? ports.map((port) => <option>{port.name}</option>) : null}
							</select>
						</div>
						<div className={styles.row50}>
							<label style={{ color: 'rgb(11, 101, 180)' }}> Device </label>
							<select
								style={{ cursor: 'pointer' }}
								name="device" onChange={handleronchange}>
								{devices && devices.length > 0 ? (
									devices.map((device) => <option>{device.name}</option>)
								) : null}
							</select>
						</div>
					</div>
				</div>

			</div>
			<div className={styles.body}>
				{subdevicemeterrealtime && subdevicemeterrealtime.data ? (
					<div className={styles.boxtable}>
						<div className={styles.topic}>
							<h3>
								{' '}
								Port : <label style={{ color: 'red', margin: '0.5rem' }}>{portselected}</label> Device :<label style={{ color: 'red', margin: '0.5rem' }} >{deviceselected}{' '}</label>
							</h3>
						</div>
						<div className={styles.row}>
							<table>
								<thead>
									<tr>
										<th>#</th>
										<th>Tag</th>
										<th>Value</th>
									</tr>
								</thead>
								<tbody>
									<tr className={styles.od}>
										<td>1</td>
										<td>2</td>
										<td>3</td>
									</tr>
									<tr>
										<td>1</td>
										<td>2</td>
										<td>3</td>
									</tr>
									<tr>
										<td>1</td>
										<td>2</td>
										<td>3</td>
									</tr>
									<tr>
										<td>1</td>
										<td>2</td>
										<td>3</td>
									</tr>
									{/* {filter_datatable(
									subdevicemeterrealtime.data.subdevicemeterrealtime,
									portselected,
									deviceselected
								).map((list, index) => {
									return index >= tablestartindex - 1 && index <= tablestoptindex - 1 ? (
										<tr key={`tablelist${index}`}>
											<td>{index + 1}</td>
											<td>{list.tag}</td>
											<td>{list.value}</td>
										</tr>
									) : null;
								})} */}
								</tbody>
								<tfoot>
									<tr>
										<td colspan="3">
											<button
												className={styles.button}
												name="back"
												disabled={tablestartindex - tableviewsize <= 0}
												onClick={handlerchagetableview}
											>
												{' '}
												{`<`}
											</button>
											<label className={styles.nextpage} style={{color:'rgb(41, 107, 206)'}}>{tablestartindex}</label> -- <label className={styles.nextpage} style={{color:'rgb(41, 107, 206)'}}>{tablestoptindex}</label>
											/length
											<label className={styles.nextpage} style={{color:'rgb(41, 107, 206)'}} >
												{
													filter_datatable(
														subdevicemeterrealtime.data.subdevicemeterrealtime,
														portselected,
														deviceselected
													).length
												}

											</label>
											<button
												className={styles.button}
												name="next"
												disabled={
													tablestartindex + tableviewsize >
													filter_datatable(
														subdevicemeterrealtime.data.subdevicemeterrealtime,
														portselected,
														deviceselected
													).length
												}
												onClick={handlerchagetableview}
											>
												{' '}
												{`>`}{' '}
											</button>
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				) : null}

			</div>

		</div>
	);
};
