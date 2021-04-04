import React from "react";
import { Link } from "react-router-dom";


class StandupCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { standup_character: { descriptions: "" } };
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteStandupCharacter = this.deleteStandupCharacter.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ standup_character: response }))
      .catch(() => this.props.history.push("/standup-characters"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deleteStandupCharacter() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/standup-characters"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { standup_character } = this.state;
    let descriptionList = "No descriptions available";

    if (standup_character.descriptions.length > 0) {
      descriptionList = standup_character.descriptions
        .split(",")
        .map((description, index) => (
          <li key={index} className="list-group-item">
            {description}
          </li>
        ));
    }
    const standupCharacterInstruction = this.addHtmlEntities(standup_character.instruction);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={standup_character.image}
            alt={`${standup_character.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {standup_character.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Description</h5>
                {descriptionList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">How to Use</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${standupCharacterInstruction}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteStandupCharacter}>
                Delete Character
              </button>
            </div>
          </div>
          <Link to="/standup-characters" className="btn btn-link">
            Back to Characters
          </Link>
        </div>
      </div>
    );
  }

}

export default StandupCharacter;
