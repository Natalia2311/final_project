import "./About.css";
import AuthorImage from "../../images/AuthorImage.jpg";


const About = () => {
    return (
      <section className="about">
        <div className="about__container">
          <img src={AuthorImage} className="about__image" alt="Author" />
          <div className="about__text">
            <h2 className="about__text-author">About The Author</h2>
            <p className="about__text-description">
              Hello! My name is Natalia Semenova. Welcome to my TripleTen final project. 
              I am a full stack web developer. I have learned how to 
              create online apps such as this one with tools like JavaScript, 
              React, Trello for work flow management, Figma, and others.
            </p>
            <p className="about__text-description">
              I have learned full stack web development from TripleTen.
               I loved learning new skills and new ways to apply old ones.
                It was exciting to learn how to jump into the world of software engineering
                 so that I can be a part of building future applications 
                 for the business I want to be a part of.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;