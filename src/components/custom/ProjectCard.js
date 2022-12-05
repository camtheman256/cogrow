import { Card } from "antd";
import "../../assets/styles/card.css";
import comment from "../../assets/icon/Comment 3px.png";
import enlarge from "../../assets/icon/enlarge icon.png";
import { Link } from "react-router-dom";

export default function ProjectCard({
  imageUrl,
  status,
  title,
  subtitle,
  description,
  creationDate,
  numSubmissions,
  learnMoreLink
}) {
  return (
    <Card bordered={false} style={{backgroundColor: '#fafafa', boxShadow: 'none'}}>
      <div className="card-module">
        <div className="thumbnail">
          <div className="sub_thumbnail">
            <button className="expand">
              <img src={enlarge} />
            </button>
          </div>
          <img src={imageUrl} />
        </div>
        <div className="card-content">
          <div className="category">{status}</div>
          <h1 className="title">{title}</h1>
          <h2 className="sub_title">{subtitle}</h2>
          <div className="badges">
            <div className="badge_scale"> Scale </div>
            <div className="badge_ownership"> Ownership</div>
            <div className="badge_metric_score"> Metrics</div>
          </div>
          <p>{description}</p>
          <Link to={learnMoreLink}>Contribute</Link>
          <div className="card-meta">
            <span className="timestamp">
              {" "}
              Created: <i className="fa fa-clock-"></i>{" "}
              <Link to={learnMoreLink}>{creationDate}</Link>
            </span>
            <span className="comments">
              <i className="fa fa-comments"></i>
              <img src={comment} />
              <Link to={learnMoreLink}>{numSubmissions} submissions</Link>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
