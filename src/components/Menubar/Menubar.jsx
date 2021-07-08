import styles from './Menubar.module.css'
import Home from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import Assignment from '@material-ui/icons/Assignment';
import ListAlt from '@material-ui/icons/ListAlt';
import Book from '@material-ui/icons/Book'
import  Person from '@material-ui/icons/Person'
import Icon from '@material-ui/core/Icon'


import { Submenudropdown } from './Submenudropdown/Submenudropdown'

export const Menubar = () => {
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
                         <Submenudropdown  label="Setting" icon="cog" links={ [
                            { label: "Building" , href:"/building",icon:"book"},
                            { label: "Floor" , href:"/floor",icon:"book"},
                            {label: "Member" , href:"/Member",icon:"person"},
                            {label: "RoomType" , href:"/profilepriceroom",icon:"settings"},
                            {label: "Meter" , href:"/Member",icon:"settings"},
                            {label: "Portmeter" , href:"/Portmeter",icon:"settings"},
                            {label: "overviewmeter" , href:"/overviewmeter",icon:"settings"}

                            ] }/>
                    </div>
                </div>



            </div>
        </>
    )
}