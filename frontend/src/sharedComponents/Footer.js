import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className="row">
                <div className="col-md-4">
                        <h5>About</h5>
                        <p className={`${styles.paragraph}`}>Welcome to Master Swift! This blog is dedicated to providing high-quality tutorials, tips, and resources for learning SwiftUI - Apple's powerful and intuitive framework for building beautiful and engaging user interfaces across all Apple platforms.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Links</h5>
                        <ul>
                            <li><a href="https://github.com/LukeT2340" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                            <li><a href="/contact">Contact</a></li>
                            {/* Add more links as needed */}
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact</h5>
                        <p>Email: lukethompson220.com</p>
                        <p>LinkedIn: <a>Luke Thompson</a></p>
                        {/* Add more contact details as needed */}
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
