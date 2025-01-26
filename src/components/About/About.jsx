import "./About.css";
import AuthorImage from "../../images/AuthorImage.jpg";


const About = () => {
    return (
      <section className="about">
        <div className="about__container">
          <img src={AuthorImage} className="about__image" alt="Author" />
          <div className="about__text">
            <h1 className="about__author">About The Author</h1>
            <p className="about__description">
            Hello! My name is Natalia Semenova, and welcome to my TripleTen final project.
            I am a full-stack web developer with experience in creating online applications 
            using tools like JavaScript, React, Trello for workflow management,
             and Figma, among others.
            </p>
            <p className="about__description">
            In TripleTen, I’ve gained invaluable skills in full-stack web development. 
            This experience not only allowed me to acquire new technical knowledge but
             also showed me exciting ways to enhance and apply my existing skills.
            I’m thrilled to contribute to building innovative applications that will 
            drive the future of businesses I hope to be a part of.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;