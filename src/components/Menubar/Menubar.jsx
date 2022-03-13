import styles from "./Menubar.module.css";
import Home from "@material-ui/icons/Home";
import Book from "@material-ui/icons/Book";
import Folder from "@material-ui/icons/Folder";

import { Notifications } from "./Notifications/Notifications";
import { Submenudropdown } from "./Submenudropdown/Submenudropdown";
import { useSubscription, gql } from "@apollo/client";
import { useEffect, useState } from "react";

import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const GET_MESSAGES = gql`
  subscription {
    subdatabasestatus
  }
`;

const API_SUBROOMS = gql`
  subscription {
    subRooms {
      status
    }
  }
`;
const API_SUBALERT = gql`
  subscription {
    subAlerts {
      id
      customer_name
      customer_tel
    }
  }
`;

const dbstatustotext = (status) => {
    let _text = "";
    let _color = "";
    if (status === 0 || status === "0") {
        _text = "disconnected";
        _color = "red";
    } else if (status === 1 || status === "1") {
        _text = "connected";
        _color = "green";
    } else if (status === 2 || status === "2") {
        _text = "connecting";
        _color = "yellow";
    } else if (status === 3 || status === "3") {
        _text = "disconnecting";
        _color = "yellow";
    } else {
        _text = "";
        _color = "";
    }
    return { color: _color, text: _text };
};

export const Menubar = () => {
    const { data } = useSubscription(GET_MESSAGES);
    const { subdatabasestatus } =
        data !== undefined ? data : { subdatabasestatus: null };
    const api_subrooms = useSubscription(API_SUBROOMS);

    const api_subalert = useSubscription(API_SUBALERT);
    const [numberalart, setnumberalart] = useState(0);
    console.log("api_subalert", api_subalert);
    console.log("api_subrooms", api_subalert);

    useEffect(() => {
        if (api_subalert && api_subalert.data && api_subalert.data.subAlerts) {
            setnumberalart(api_subalert.data.subAlerts.length);
        }
    }, [api_subalert]);
    return (
        <>
            <Navbar className={styles.menu} expand="lg" bg="#E8E7E7"  variant="light">
                <Container fluid>
                    <Navbar.Brand href='/'>
                        <img src="/image/logo.png" alt="logo" width="60" height="50" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className={styles.container} >
                        <Nav className="me-auto">
                            <Nav.Link href="/home" className={styles.md}>
                                Home
                                <div>
                                    <Home />
                                </div>
                            </Nav.Link>
                            <Nav.Link href="/room" className={styles.md} >
                                Overview
                                <div>
                                    <Home />
                                </div>
                            </Nav.Link>
                            <Nav.Link href="/booking" className={styles.md} >
                                จองห้อง
                                <div>
                                    <Book />

                                </div>
                            </Nav.Link>
                            <Nav.Link href="/check_in" className={styles.md}>
                                ย้ายเข้า
                                <div>
                                    <Book />
                                </div>
                            </Nav.Link>
                            <Nav.Link href="/check_out"  className={styles.md}>
                                ย้ายออก
                                <div>
                                    <Book />

                                </div>
                            </Nav.Link>
                            <Nav.Link href="/checkoutinform" className={styles.md}>
                                แจ้งย้ายออก
                                <div>
                                    <Book />

                                </div>
                            </Nav.Link>
                            <Nav.Link href="/createinvoice" className={styles.md}>
                                สร้างใบแจ้งหนี้
                                <div>
                                    <Book />

                                </div>
                            </Nav.Link>
                            <Nav.Link href="/invoice" className={styles.md}>
                                ใบแจ้งหนี้
                                <div>
                                    <Book />
                                </div>
                            </Nav.Link>
                            <Nav.Link href="/Reimbursement" className={styles.md}>
                                คืนเงินประกัน
                                <div>
                                    <Book />
                                </div>
                            </Nav.Link>
                            <Nav.Link href="/contract" className={styles.md}>
                                สัญญา
                                <div>
                                    <Book />
                                </div>
                            </Nav.Link>
                            <Nav.Link href="/note" className={styles.md}>
                                Note Room
                                <div>
                                    <Book />
                                </div>
                            </Nav.Link>
                        </Nav>

                        <div>
                            <div className={styles.dropdownReport}>
                                <Submenudropdown id="submenusetting" label="Report" icon="list" links={[
                                    { label: "Financial", href: "/report_financial", icon: "book" },
                                    { label: "electrical", href: "/report_electrical", icon: "book" },
                                    { label: "water", href: "/report_water", icon: "book" },
                                ]} />
                            </div>
                        </div>
                        <div>
                            <div className={styles.dropdownSetting}>
                                <Submenudropdown id="submenusetting" label="Setting" icon="settings" links={[
                                    { label: "Building", href: "/building", icon: "book" },
                                    { label: "Floor", href: "/floor", icon: "book" },
                                    { label: "Member", href: "/Member", icon: "person" },
                                    { label: "RoomType", href: "/profilepriceroom", icon: "settings" },
                                    { label: "Meter", href: "/meterroom", icon: "settings" },
                                    { label: "Portmeter", href: "/Portmeter", icon: "settings" },
                                    { label: "overviewmeter", href: "/overviewmeter", icon: "settings" },
                                    { label: "MQTTOverview", href: "/MQTToverview", icon: "settings" },
                                    { label: "Realtimetable", href: "/Realtimetable", icon: "settings" },
                                    { label: "Address", href: "/Address", icon: "settings" }

                                ]} />
                            </div>
                        </div>
                    </Navbar.Collapse>
                    <div className={styles.menu_right}>
                        <Notifications number={numberalart} />
                        {api_subrooms && api_subrooms.data && api_subrooms.data.subRooms ?
                            <div className={styles.optionright} >
                                <div className={styles.cornflowerblue} > {api_subrooms.data.subRooms.filter(room => room.status === 'จอง').length} </div>
                                <div>จอง </div>
                                <div className={styles.red} > {api_subrooms.data.subRooms.filter(room => room.status === 'ย้ายออก').length} </div>
                                <div>แจ้งย้ายออก </div>
                                <div className={styles.green} > {api_subrooms.data.subRooms.filter(room => room.status === 'มีคนอยู่').length} </div>
                                <div>มีคนอยู่</div>
                                <div className={styles.gray} > {api_subrooms.data.subRooms.filter(room => room.status === 'ห้องว่าง').length} </div>
                                <div>ห้องว่าง</div>
                                <div className={styles.yellow} > {api_subrooms.data.subRooms.filter(room => room.status === 'ย้ายเข้า').length} </div>
                                <div>ย้ายเข้า</div>
                                <div className={styles.orange} > {api_subrooms.data.subRooms.filter(room => room.status === 'ปรับปรุง').length} </div>
                                <div>ปรับปรุง</div>
                            </div>
                            : <div className={styles.optionright} >
                                <div>  - Error subscription  Rooms - </div>
                            </div>
                        }

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
                        <div className={styles.none}>
                            <div>
                                <Submenudropdown id="submenuprofile" label="username" icon="person" links={[
                                    { label: "info", href: "/Profile", icon: "person" },
                                    { label: "Logout", href: "/login", icon: "logout", middleware: () => { console.log("clear"); localStorage.clear() } },
                                    { label: "usermanement", href: "/usermanagment", icon: "settings" },

                                ]} />
                            </div>
                        </div>
                    </div>

                </Container>
            </Navbar>
        </>
    );
};
