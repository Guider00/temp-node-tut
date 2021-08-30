import styles from './Menubar.module.css'
import Home from '@material-ui/icons/Home';

import ListAlt from '@material-ui/icons/ListAlt';
import Book from '@material-ui/icons/Book'
import Folder from '@material-ui/icons/Folder'


import { Submenudropdown } from './Submenudropdown/Submenudropdown'

import { useSubscription, gql, } from '@apollo/client';
const GET_MESSAGES = gql`
  subscription {
    subdatabasestatus
  }
`;
const dbstatustotext = (status) => {
    let _text = ""
    let _color = ""
    if (status === 0 || status === "0") {
        _text = "disconnected"
        _color = "red"
    } else if (status === 1 || status === "1") {
        _text = "connected"
        _color = "green"
    } else if (status === 2 || status === "2") {
        _text = "connecting"
        _color = "yellow"
    } else if (status === 3 || status === "3") {
        _text = "disconnecting"
        _color = "yellow"
    } else {
        _text = ""
        _color = ""
    }
    return { color: _color, text: _text }
}

export const Menubar = () => {

    const { data } = useSubscription(GET_MESSAGES);
    const { subdatabasestatus } = (data !== undefined) ? data : { subdatabasestatus: null }
    return (
        <>
            <div className={styles.menu}>
                <div className={styles.logo} >
                    <img src="/image/logo.png" alt="logo" width="60" height="50" />
                </div>
                <div>
                    <a href="/home">
                        <button>
                            <div>
                                <Home />

                            </div>
                            <div>
                                Home
                            </div>

                        </button>
                    </a>
                </div>



                <div>
                    <a href="/room">
                        <button>
                            <div>
                                <Book />

                            </div>
                            <div>
                                Overview
                            </div>

                        </button>
                    </a>
                </div>
                <div>
                    <a href="/booking">
                        <button>
                            <div>
                                <Book />

                            </div>
                            <div>
                                จองห้อง
                            </div>

                        </button>
                    </a>
                </div>
                <div>
                    <a href="/check_in">
                        <button>
                            <div>
                                <Book />

                            </div>
                            <div>
                                ย้ายเข้า
                            </div>

                        </button>
                    </a>
                </div>
                <div>
                    <a href="/check_out">
                        <button>
                            <div>
                                <Book />

                            </div>
                            <div>
                                ย้ายออก
                            </div>

                        </button>
                    </a>
                </div>
                <div>
                    <a href="/contract">
                        <button>
                            <div>
                                <ListAlt />

                            </div>
                            <div>
                                สัญญา
                            </div>

                        </button>
                    </a>
                </div>
                <div>
                    <a href="/note">
                        <button>
                            <div>
                                <ListAlt />

                            </div>
                            <div>
                                Note Room
                            </div>

                        </button>
                    </a>
                </div>

                <div>
                    <a href="/report">
                        <button>
                            <div>
                                <ListAlt />

                            </div>
                            <div>
                                Report
                            </div>

                        </button>
                    </a>
                </div>
                <div>
                    <div>
                        <Submenudropdown id="submenusetting" label="Setting" icon="settings" links={[
                            { label: "Building", href: "/building", icon: "book" },
                            { label: "Floor", href: "/floor", icon: "book" },
                            { label: "Member", href: "/Member", icon: "person" },
                            { label: "RoomType", href: "/profilepriceroom", icon: "settings" },
                            { label: "Meter", href: "/meterroom", icon: "settings" },
                            { label: "Portmeter", href: "/Portmeter", icon: "settings" },
                            { label: "overviewmeter", href: "/overviewmeter", icon: "settings" },
                            { label: "MQTTOverview", href: "/MQTToverview", icon: "settings" }

                        ]} />
                    </div>
                </div>

                <div className={styles.menu_right}>


                    <div className={styles.db_status}>
                        <div>
                            <Folder style={{ color: `${dbstatustotext(subdatabasestatus).color}` }} ></Folder>
                            {
                                `${dbstatustotext(subdatabasestatus).text}`
                            }
                        </div>
                        <div>
                            SW Version 1.0.0
                        </div>
                    </div>
                    <div>
                        <div>
                            <Submenudropdown  id="submenuprofile"   label="username" icon="person" links={[
                                { label: "info", href: "/Profile", icon: "person"   },
                                { label: "Logout", href: "/login", icon: "logout" ,  middleware:()=>{ console.log("clear");localStorage.clear()}  },
                                { label: "usermanement", href: "/usermanagment", icon: "settings"   },

                            ]} />
                        </div>
                    </div>
                    {/* <div className={styles.logout}>

                        <button onClick={onclick_logout}>
                            <div>
                                <Person />
                            </div>
                            <div>
                                <label>Log out</label>
                            </div>
                        </button>


                    </div> */}
                </div>

            </div>

        </>
    )
}