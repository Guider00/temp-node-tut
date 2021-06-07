import styles from './Menubar.module.css'
import Home from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import Assignment from '@material-ui/icons/Assignment';
import ListAlt from '@material-ui/icons/ListAlt';
import Book from '@material-ui/icons/Book'


export const Menubar = () => {
    return (
        <>
            <div className={styles.menu}>
                <div className={styles.logo} >
                    <img src="/image/logo.png" alt="logo" width="60" height="50"/>
                </div>
                <div>
                    <a href="/home">
                        <button>
                            <div>
                            <Home/>
                           
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
                            <Book/>
                           
                            </div>
                            <div>
                                 Room
                            </div>
                           
                        </button>
                    </a>
                </div>
                <div>
                    <a href="/recordmeter">
                        <button>
                            <div>
                            <Assignment/>
                           
                            </div>
                            <div>
                                 Record meter
                            </div>
                           
                        </button>
                    </a>
                </div>
                <div>
                    <a href="/report">
                        <button>
                            <div>
                            <ListAlt/>
                           
                            </div>
                            <div>
                                 Report
                            </div>
                           
                        </button>
                    </a>
                </div>


                
                <div>
                    <a href="/profilepriceroom">
                        <button>
                            <div>
                            <Settings/>
                            </div>
                            <div>
                            Setting
                            </div>
                            
                        </button>
                    </a>
                </div>
            </div>
        </>
    )
}