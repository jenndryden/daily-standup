import React from "react";
import { Link } from "react-router-dom";

class StandupCharacters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      standup_characters: []
    };
  }

  componentDidMount() {
      const url = "/api/v1/standup_characters/index";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ standup_characters: response }))
        .catch(() => this.props.history.push("/"));
  }
render() {
    const { standup_characters } = this.state;
    const allStandupCharacters = standup_characters.map((standup_character, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={standup_character.image}
            className="card-img-top"
            alt={`${standup_character.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{standup_character.name}</h5>
            <Link to={`/standup-character/${standup_character.id}`} className="btn custom-button">
              View Character
            </Link>
          </div>
        </div>
      </div>
    ));
    const noStandupCharacter = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No characters yet. Why not <Link to="/new-character">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Characters for every Stand-up</h1>
            <p className="lead text-muted">
              We’ve pulled together our favourite characters so there’s sure to a
	      silly, creative, creature for you to use.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/new-character" className="btn custom-button">
                Create New Character
              </Link>
            </div>
            <div className="row">
              {standup_characters.length > 0 ? allStandupCharacters : noStandupCharacter}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}
export default StandupCharacters;
