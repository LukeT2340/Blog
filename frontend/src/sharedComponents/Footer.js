import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// The bottom component of each page
const Footer = () => {

    // About me section
    const AboutMeSection = () => {
        return (
            <div className={`${styles.about} col-md-3`}>
                <h5>About</h5>
                <p className={`${styles.paragraph}`}>Welcome to Master Swift! This blog is dedicated to providing high-quality tutorials, tips, and resources for learning SwiftUI - Apple's powerful and intuitive framework for building beautiful and engaging user interfaces across all Apple platforms.</p>
            </div>
        )
    }

    // Contact section
    const ContactSection = () => {
        return (
            <div className={`${styles.contact} col-md-3`}>
                <h5>Contact</h5>
                <a href="https://github.com/LukeT2340" className={styles.link}>
                    <img className={styles.linkIcon} src="./github-mark-white.png"></img>
                    <p>LukeT2340</p>
                </a>
                <div className={`${styles.link} mt-2`}>
                    <FontAwesomeIcon icon={faEnvelope} className={styles.linkIcon}/>
                    <p>lukethompson220@gmail.com</p>
                </div>
            </div>
        )
    }

    // Footnote
    const FootNoteSection = () => {
        return (
            <div className="row">
                <div className="col-md-12">
                    <p className="text-center">&copy; 2024 Master Swift. All Rights Reserved.</p>
                </div>
            </div>
        )
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className="d-flex justify-content-between">
                    <AboutMeSection />
                    <ContactSection />
                </div>
                <hr className={styles.hr} />
                <FootNoteSection />
            </div>
        </footer>
    );
}

export default Footer;
