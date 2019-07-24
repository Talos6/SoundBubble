import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import Groups from '../../../api/groups';
import { Meteor } from 'meteor/meteor';
import { removeCurrentGroup } from '../../actions/groupActions';

class User extends Component {
  formatUserInfo(title, detail) {
    return (
      <dl className="user-detail">
        <dt>{title}</dt>
        <dd>{detail}</dd>
      </dl>
    );
  }

  logout() {
    Meteor.logout();
    this.props.removeCurrentGroup();
  }

  render() {
    const { user, myGroupsCount } = this.props;
    let spotifyUrl = 'https://open.spotify.com/user/' + user.id;
    let userImage =
      (user.images[0] && user.images[0].url) ||
      'https://cdn4.iconfinder.com/data/icons/staff-management-vol-1/72/38-512.png';

    return (
      <div className="user-container">
        <div className="user-left">
          <img width="150" src={userImage} />
          <br />
        </div>
        <div className="user-right">
          <h3>{user.display_name}</h3>
          <div className="user-info">
            {this.formatUserInfo('Groups', myGroupsCount)}
            {this.formatUserInfo('Email', user.email)}
          </div>
          <a className="profileLink" href={spotifyUrl}>
            Go To Your Spotify
          </a>
          <br />
          <a
            className="profileLink"
            href="https://www.spotify.com/account/apps/?_ga=2.100345246.1881641136.1561931040-1289360233.1558571744"
          >
            Manage Spotify App Access
          </a>
          <div className="logout">
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => this.logout()}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withTracker(props => {
    const myGroupsReady = Meteor.subscribe('myGroups').ready();
    return {
      myGroupsCount: myGroupsReady ? Groups.find().fetch().length : 0
    };
  }),
  connect(
    null,
    { removeCurrentGroup }
  )
)(User);
