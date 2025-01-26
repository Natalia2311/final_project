import "./NotFound.css";
import NotFoundImage from "../../images/not-found_v1.svg";

const NotFound = () => (
  <div className="notFound">
    <img src={NotFoundImage} className="notFound__image" alt="NotFoundImage" />
    <div className="notFound__text"> Nothing Found </div>
    <span className="notMatched__text">Sorry, but nothing matched your search terms.</span>
  </div>
);

export default NotFound;
