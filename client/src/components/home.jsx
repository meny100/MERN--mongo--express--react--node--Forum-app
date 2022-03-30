import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import categories from "../assets/categories";
import { NavLink } from "react-router-dom";
import BootstrapCarousel from "./bootstrapCarousel";

class Home extends Component {
  state = {};

  render() {
    const { user } = this.props;

    return (
      <div className="container my-4">
        <div className="row">
          <div className="mb-5">
            <PageHeader titleText="Welcome to M.S Forum" />
          </div>
          <div className="row">
            {user && (
              <React.Fragment>
                <div className="col-3">
                  <h4>
                    <span className="font-italic border-bottom text-secondary">
                      Categories
                    </span>
                  </h4>
                  {categories.map((category, index) => (
                    <NavLink
                      key={index}
                      className="dropdown-item border-bottom text-danger"
                      to={`/category/${category.toLowerCase()}`}
                      onClick={() =>
                        setTimeout(() => {
                          // window.location.reload();
                          window.scrollTo(0, 0);
                        }, 0.001)
                      }
                    >
                      {category}
                    </NavLink>
                  ))}
                </div>
                <div className="col-9">
                  <BootstrapCarousel></BootstrapCarousel>
                </div>
              </React.Fragment>
            )}
            {!user && (
              <div className="row">
                <div className="col-4 ml-5">
                  <p
                    style={{
                      height: "300px",
                      overflowY: "auto",
                    }}
                  >
                    <b className="border-bottom" style={{opacity:"0.6", fontSize:"0.8em"}}>From Wikipedia, the free encyclopedia</b>
                    <br />
                    An Internet forum, or message board, is an online discussion
                    site where people can hold conversations in the form of
                    posted messages. They differ from chat rooms in that
                    messages are often longer than one line of text, and are at
                    least temporarily archived. Also, depending on the access
                    level of a user or the forum set-up, a posted message might
                    need to be approved by a moderator before it becomes
                    publicly visible. Forums have a specific set of jargon
                    associated with them; example: a single conversation is
                    called a "thread", or topic. A discussion forum is
                    hierarchical or tree-like in structure: a forum can contain
                    a number of subforums, each of which may have several
                    topics. Within a forum's topic, each new discussion started
                    is called a thread and can be replied to by as many people
                    as so wish. Depending on the forum's settings, users can be
                    anonymous or have to register with the forum and then
                    subsequently log in to post messages. On most forums, users
                    do not have to log in to read existing messages.
                  </p>
                </div>
                <div className="col-7">
                  <BootstrapCarousel></BootstrapCarousel>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
