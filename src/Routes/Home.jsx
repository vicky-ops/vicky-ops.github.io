import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import NextCarousal from "../components/nextCarousel";
import IpadCarousal from "../components/ipad";
import GitHubCalendar from "react-github-calendar";
import MobileCarousal from "../components/mobile";
import ReactTooltip from "react-tooltip";

const logourl = [
  "data:image/png;base64,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",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/512px-Bootstrap_logo.svg.png",
  "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
  "data:image/png;base64,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",
  "https://mui.com/static/logo.png",
  "data:image/png;base64,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",
  "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
  "https://cdn-icons-png.flaticon.com/512/25/25231.png",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX////LODfJKyrioaHKMC/ZfHvIIiDz2dnek5LJLSzKNTTQSkn24uLIIiHMOTn129vinZ367e3uy8rSVlX99/fdjYzmrq7uxMPQTEvFAADWcXHNQD/GEQ/35+fVbWz77+/bhITUZmXmsLDyHCq4AAAB8UlEQVR4nO3b0VbaQBRAUYNtkEgBFQpUrG3//yO7ipmxNBAvTYrQtffjcBPn+GKWGa6uAAAAAAAAAAAAAAAAAAAAAADgaMvZ9bmbLTsVLsrBuSsXnQpvRsW5G90oVHjuFCpMhdWHgPxTI8NHTh+8vqfC6uFjQN7yl8Dw17TFSeTWh6/vqXBwHZmeVC/T5VNgePqp/uXd/t3WxmW/hbPIdC4cB4aHHQunCmMU7lK4Q+FbFAa1FM7vas95qaUwT8/TSlthGr5ruf7fF96vy63N6w5bCpf19PpzWmkpnNfD5To/Onzb1Ct5IycoTDt8yEtthfX0IFQ4KOob5cJF4+FKYZBChZnCHQq3FAYpVJgp3KFwS2GQQoXZsnx52VD+t4VNChUqDFKosIXCUxc233J3LRy3/Fc/nY8o8xuD5kZ6fstdPK5u/1TnFJP00apIG2sW3k8OXl8cvnWVFlaPRWMjVb+FRdVQND5qKVyWgesDt24uvcuJoZYn7/4pVKhwL4W96li4qF8uh+SIPefa0vNBMTrihiGbbifZn4ZHmE7qij1nE7/nv8/TY24ZETkm2Jf01LbnxGj6ZPDjhPvpX/Hbo8cBr/9ru0gKFZ4/hZdfOHr7m2abyy6MfFtw+N6bBAAAAAAAAAAAAAAAAAAAAACAX34CrC5ayvgCOKgAAAAASUVORK5CYII=",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png"
];
const Home = () => {
 
  const [active, setActive] = useState("Home");
  const [navbg, setNavbg] = useState(true);
  const [navname, setNavname] = useState(true);
  const [laptop, setlaptop] = useState(true);
  const [ipad, setIpad] = useState(false);
  const [mobile, setMobile] = useState(false);

  const handleScroll = () => {

    const scrool = window.scrollY;
    if (scrool >= 0 && scrool < 720) {
      setActive("Home");
      setNavbg(true);
      setNavname(true);
    } else if (scrool >= 720 && scrool < 1440) {
      setActive("about");
      setNavbg(false);
      setNavname(false);
    } else if (scrool >= 1440 && scrool < 2160) {
      setActive("skills");
      setNavbg(false);
      setNavname(false);
    } else if (scrool >= 2160 && scrool < 3300) {
      setActive("project");
      setNavbg(false);
      setNavname(false);
    } else if (scrool >= 3300 && scrool < 4020) {
      setActive("contact");
      setNavbg(false);
      setNavname(false);
    }
  };
  const selectLastHalfYear = (contributions) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 6;

    return contributions.filter((day) => {
      const date = new Date(day.date);
      const monthOfDay = date.getMonth();

      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - shownMonths &&
        monthOfDay <= currentMonth
      );
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <div id="mySidenav" className="sidenav">
        <a className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a href="#" className={active == "Home" ? "active1" : "none"}>
          Home
        </a>
        <a href="#about" className={active == "about" ? "active1" : "none"}>
          About
        </a>
        <a
          href="https://drive.google.com/file/d/1rn6BuKRsueZLcQKlJqxnkV3ZqblUKMZb/view?usp=sharing"
          download
          className={active == "resume" ? "active1" : "none"}
        >
          Resume
        </a>
        <a href="#skills" className={active == "skills" ? "active1" : "none"}>
          Skills
        </a>
        <a href="#project" className={active == "project" ? "active1" : "none"}>
          Projects
        </a>
        <a href="#contact" className={active == "contact" ? "active1" : "none"}>
          Contact
        </a>
      </div>
      <div
        style={{ position: "fixed" }}
        className={navbg == true ? "navbar1" : "navbar_bg_change"}
      >
        <div className={navname == true ? "name_nav" : "name_nav1"}>
          <span
            className="three_lines"
            style={{ fontSize: "30px", cursor: "pointer", marginRight: "20px" }}
            onClick={openNav}
          >
            &#9776;
          </span>
          <p>
            <span>V</span>icky<span> D</span>
          </p>
        </div>

        <div className="navigation">
          <a href="#" className={active == "Home" ? "active" : "none"}>
            Home
          </a>
          <a href="#about" className={active == "about" ? "active" : "none"}>
            About
          </a>
          <a
            href="https://drive.google.com/file/d/1rn6BuKRsueZLcQKlJqxnkV3ZqblUKMZb/view?usp=sharing"
            download
            className={active == "resume" ? "active" : "none"}
          >
            Resume
          </a>
          <a href="#skills" className={active == "skills" ? "active" : "none"}>
            Skills
          </a>
          <a
            href="#project"
            className={active == "project" ? "active" : "none"}
          >
            Projects
          </a>
          <a
            href="#contact"
            className={active == "contact" ? "active" : "none"}
          >
            Contact
          </a>
        </div>
      </div>

      <div className="main-content ">
        <section id="home">
          <div className="my_img">
            <img
              src="https://avatars.githubusercontent.com/u/80167039?v=4"
              alt="avatar"
            />
          </div>
          <div className="Im_webd">
            <p>Hey! I am</p>
            <h1>Vicky D</h1>
            <div class="container">
              <div class="typed-out">I am a Web Developer.</div>
            </div>
            <button className="all_btn">
              {" "}
              <a
                href="https://drive.google.com/file/d/1rn6BuKRsueZLcQKlJqxnkV3ZqblUKMZb/view?usp=sharing"
                download
              >
                {" "}
                Download Resume
              </a>
            </button>
            <a href="#about">
              <img
                src="https://content.invisioncic.com/p289038/monthly_2020_05/Bounce-arrow.gif.ab5ac6f311d13c20c4a6d256178344bf.gif"
                alt="🔽"
              />
            </a>
          </div>
        </section>

        <section id="about">
          <div data-aos="fade-up" className="about_section">
            <div className="about_info">
              <h1>About Me</h1>
              <p
                style={{
                  color: "#000000",
                  width: "90%",
                  marginTop: "30px",
                }}
              >
                A Full Stack Web Developer with a passion for web application development. Skilled in conceptualizing, designing, developing, and deploying software.
              </p>
            </div>
          </div>
        </section>

        <section id="skills">
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "bolder",
              marginBottom: "15px",
            }}
          >
            My Skills
          </h1>
          <div className="skill_grid" data-aos="fade-up">
            {logourl.map((el) => {
              return (
                <div
                  className="move-up"
                  style={{
                    padding: "10px 10px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                  }}
                >
                  <img src={el} alt={el} />
                </div>
              );
            })}
          </div>
        </section>

        <section id="project" data-aos="fade">
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "bolder",
              marginBottom: "15px",
            }}
          >
            My Projects
          </h1>
          <div className="check_big_size">
            <NextCarousal />
          </div>

          <div className="check_ipad">
            <IpadCarousal />
          </div>

          <div className="check_mobile">
            <MobileCarousal />
          </div>

          <button
            className="all_git_btn"
            style={{ margin: "auto", marginTop: "15px", paddingRight: "15px" }}
          >
            <a href="https://github.com/vicky-ops?tab=stars" target="_blank">View All</a>
          </button>
        </section>
        <div
          style={{ margin: "auto", marginTop: "50px" }}
          className="git_calendar"
          data-aos="zoom-in"
        >
          <div className="git_calendar_div">
            <GitHubCalendar
              username="vicky-ops"
              blockSize={20}
              fontSize={20}
              transformData={selectLastHalfYear}
              color="#3e64ff"
            >
              <ReactTooltip delay={20} html />
            </GitHubCalendar>
          </div>
        </div>
        <div
          style={{ margin: "auto", marginTop: "50px", opacity: "0.8" }}
          className="git_contri"
          data-aos="flip-up"
        >
          <a href="https://github.com/vicky-ops">
            {" "}
            <img
              src="https://github-readme-streak-stats.herokuapp.com?user=vicky-ops&hide_border=true&theme=sea"
              alt=""
            />
          </a>
        </div>

        <div className="github_lang" data-aos="flip-down">
          <a href="https://github.com/vicky-ops">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=vicky-ops"
              alt="top languages"
            />
          </a>
          <a href="https://github.com/vicky-ops">
            {" "}
            <img
              src="https://github-readme-stats.vercel.app/api?username=vicky-ops"
              alt=""
            />
          </a>
        </div>

        <section id="contact" className="contact" data-aos="fade-up">
          <div class="contact-header">
            <h1 id="co-text">Contact Me</h1>
          </div>

          <div class="contact-content" data-aos="fade-up">
            <div class="contact-form">
              <h3 id="form-title">Send me a message</h3>
              <form
                action="mailto:workmailvicky101@gmail.com"
                method="post"
                enctype="text/plain"
              >
                <fieldset>
                  <div class="form-field">
                    <input
                      name="name"
                      type="text"
                      id="name"
                      placeholder="Your Name"
                    ></input>
                  </div>
                  <div class="form-field">
                    <input
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Your Email"
                    ></input>
                  </div>
                  <div class="form-field">
                    <input
                      name="Subject"
                      type="text"
                      id="subject"
                      placeholder="Subject"
                    ></input>
                  </div>
                  <div class="form-field">
                    <textarea
                      name="message"
                      type="text"
                      id="message"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                </fieldset>
                <input id="form-btn" type="submit" value="send" />
              </form>
            </div>

            <div class="contact-info">
              <h3>Email Me At </h3>
              <a href="mailto:workmailvicky101@gmail.com">
                <p>workmailvicky101@gmail.com</p>
              </a>
              <h3>Call Me At</h3>
              <a href="#">
                <p>+91-8904098496</p>
              </a>
              <h3>Address</h3>
              <a href="#">
                <p>Bengaluru, Karnatak</p>
              </a>
              <h3>Find Me On </h3>
              <div class="contact-links">
                <a
                  href="https://www.linkedin.com/in/vicky-d-943537224/"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="30"
                    height="30"
                    fill="#000000"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </a>
                <a href="https://github.com/vicky-ops" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    width="30"
                    height="30"
                    fill="#000000"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                </a>
                <a></a>
              </div>
            </div>
          </div>
        </section>
        <footer class="footer-distributed">
          <div class="footer-left">
            <h3
              style={{
                fontSize: "50px",
                marginLeft: "20px",
                fontWeight: "bold",
              }}
            >
              {" "}
              <span style={{ color: "#3e64ff" }}>V</span>icky{" "}
              <span style={{ color: "#3e64ff" }}>D</span>
            </h3>

            <p class="footer-links">
              <a href="#" class="link-1">
                Home
              </a>

              <a href="#about">About</a>

              <a href="https://drive.google.com/file/d/1rn6BuKRsueZLcQKlJqxnkV3ZqblUKMZb/view?usp=sharing">
                Resume
              </a>

              <a href="#skills">Skills</a>

              <a href="#project">Projects</a>

              <a href="#contact">Contact</a>
            </p>
          </div>

          <div class="footer-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width="20"
                height="20"
                fill="#ffffff"
              >
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
              </svg>
              <p>Bengaluru, Karnataka</p>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="20"
                height="20"
                fill="#ffffff"
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
              <p>+91-8904098496</p>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#ffffff"
                viewBox="0 0 512 512"
              >
                <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
              </svg>
              <p>
                <a href="mailto:workmailvicky101@gmail.com">
                  workmailvicky101@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div class="footer-right">
            <p class="footer-company-about">
              <span>About me</span>
              Web Developer with a passion for web application development.
              Skilled in conceptualizing, designing, developing, and deploying
              software containing logical and mathematical solutions to business
              problems.
            </p>

            <div class="footer-icons">
              <a
                href="https://www.linkedin.com/in/vicky-d-943537224/"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="35"
                  height="35"
                  fill="#ffffff"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </a>
              <a href="https://github.com/vicky-ops" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  width="35"
                  height="35"
                  fill="#ffffff"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
