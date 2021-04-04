import React from "react";
import { Link } from "react-router-dom";

class NewStandupCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      descriptions: "",
      instruction: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }


  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/standup_characters/create";
    const { name, descriptions, instruction } = this.state;

    if (name.length == 0 || descriptions.length == 0 || instruction.length == 0)
      return;

    const body = {
      name,
      descriptions,
      instruction: instruction.replace(/\n/g, "<br> <br>")
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/standup-character/${response.id}`))
      .catch(error => console.log(error.message));
  }


  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new character to our awesome collection of creatures.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="standupCharacterName">Character Name</label>
                <input
                  type="text"
                  name="name"
                  id="standupCharacterName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="standupCharacterDescriptions">Descriptions</label>
                <input
                  type="text"
                  name="descriptions"
                  id="standupCharacterDescriptions"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="descriptionsHelp" className="form-text text-muted">
                  Separate each description with a comma.
                </small>
              </div>
              <label htmlFor="instruction">Character Instructions</label>
              <textarea
                className="form-control"
                id="instruction"
                name="instruction"
                rows="5"
                required
                onChange={this.onChange}
              />
              <button type="submit" className="btn custom-button mt-3">
                Create Character
              </button>
              <Link to="/standup-characters" className="btn btn-link mt-3">
                Back to Characters
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default NewStandupCharacter;
