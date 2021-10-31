import { useEffect, useState } from 'react';

import styles from './Checkout.module.css';
import { API_queryRooms, API_queryBuildings, API_updateMeterRoomkwh, API_updateMeterRoomwater } from '../../API/index';
import SearchIcon from '@material-ui/icons/Search';


const getRooms = async () => {
	return new Promise(async (resolve, reject) => {
		let res = await API_queryRooms();
		let table = [];
		if (res && res.status === 200) {
			table = res.data.rooms.map((data) => {
				let _data = data;
				return {
					id: data.id,
					data: _data,
					building: (data.floor&& data.floor.building &&  data.floor.building.name ) ? data.floor.building.name : '---',
					floor: data.floor ? data.floor.name : '---',
					name: data.name,
					status: data.status ? data.status : '---',
					member: data.member ? data.member.name : '---',
                    memberlastname: data.member ? data.member.lastname : '---',
					metername: data.meterroom ? data.meterroom.name : '---',
					meterroom: data.meterroom ? data.meterroom : '---',
                    datecheckout : data.datecheckout ? data.datecheckout : '---'
				};
			});
		}

		resolve(table);
	}).catch((e) => {
		console.log('Promise Error', e);
		return [];
	});
};

export const Checkout = () => {
	const [ textfilter, settextfilter ] = useState('');
	const [ rooms, setrooms ] = useState([]);
	const [ loading, setloading ] = useState(false);
	const [ selectedroom, setselectedroom ] = useState(null);
	useEffect(
		() => {
			async function fetchData() {
				let Rooms = await getRooms();
				console.log('Rooms', Rooms);
				setrooms(Rooms);
			}
			fetchData();
			setloading(true);
		},
		[ loading ]
	);

    return (
        <>
           	<div>
			<div className={styles.tableroomselect}>
				<div className={styles.headertable}>
					<div className={styles.text}> ห้องเช่าและแจ้งย้ายออก </div>
					<div className={styles.input}>
						<div className={styles.zonetextbox}>
							<input
								type="text"
								value={textfilter}
								onChange={(e) => {
									settextfilter(e.target.value);
								}}
							/>
						</div>
						<div className={styles.zonebtn}>
							<select>
								<option>ทั้งหมด</option>
								<option>ห้อง</option>
							</select>
							<button onClick={() => {}}>
								{' '}
								ค้นหา<SearchIcon />{' '}
							</button>
						</div>
					</div>
				</div>
				<div className={styles.bodytable}>
					<table>
						<tr>
							<th> ห้อง</th>
							<th> อาคาร</th>
							<th> ชั้น</th>
							<th> ประเภทห้อง</th>
							
                            <th> ชื่อ</th>
                            <th> นามสกุล</th>
                            <th> วันที่ย้ายออก</th>
						</tr>
						{rooms.filter((room) => (room && room.status === 'มีคนอยู่') || room.status === 'ย้ายออก').map(
							(room, index) =>
								room ? (
									<tr
										onClick={() => {
											setselectedroom(room.id);
										}}
										style={{ background: selectedroom === room.id ? 'lightgray' : 'none' }}
									>
										<td>{room.name ? room.name : '---'}</td>
										<td>{room.building ? room.building : '---'}</td>
										<td>{room.floor ? room.floor : '---'}</td>
										<td>{room.type ? room.type : '---'}</td>
                                        <td>{room.member ? room.member : '---'}</td>
                                        <td>{room.memberlastname ? room.memberlastname : '---'}</td>
                                        <td>{room.datecheckout ? room.datecheckout : '---'}</td>
										
									</tr>
								) : null
						)}
					</table>
				</div>
			</div>
		</div>
        </>
    )
}