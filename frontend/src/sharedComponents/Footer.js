import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className="row">
                    <div className={`${styles.about} col-md-4`}>
                        <h5>About</h5>
                        <p className={`${styles.paragraph}`}>Welcome to Master Swift! This blog is dedicated to providing high-quality tutorials, tips, and resources for learning SwiftUI - Apple's powerful and intuitive framework for building beautiful and engaging user interfaces across all Apple platforms.</p>
                    </div>
                    <div className={`${styles.contact} col-md-4`}>
                        <h5>Contact</h5>
                        <p>Email: lukethompson220.com</p>
                        <p>LinkedIn: <a>Luke Thompson</a></p>
                        {/* Add more contact details as needed */}
                    </div>
                    <div className="col-md-4">
                        <a href="https://github.com/LukeT2340" className={styles.link}>
                            <img className={styles.linkIcon} src="./github-mark-white.png"></img>
                            <p>LukeT2340</p>
                        </a>
                    </div>
                </div>
                <hr className={styles.hr} />
                <div className="row">
                    <div className="col-md-12">
                        <p className="text-center">&copy; 2024 Master Swift. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
