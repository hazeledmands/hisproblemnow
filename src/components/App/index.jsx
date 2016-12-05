/* @flow */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { Link, AbsoluteFragment as Fragment } from 'redux-little-router';

import TodoList from '../../containers/TodoList';
import CallToAction from '../CallToAction';
import StructuredText from '../StructuredText';
import styles from './styles.css';

const App = ({ callsToAction, startHere }) => (
  <div>
    <h1 id="title" styleName="title">{startHere.data['start-here.page-title'].value}</h1>
    <h2 styleName="subtitle">{startHere.data['start-here.subtitle'].value}</h2>

    <Fragment forRoute="/">
      <div id="intro" styleName="intro">
        <Link styleName="link-button" href="/start-here">{startHere.data['start-here.button-text'].value}</Link>
        <form
          action="//herokuapp.us14.list-manage.com/subscribe/post?u=8caf5cbe5346a3b5699e90085&amp;id=fc768672ff"
          method="post"
          target="_blank"
        >
          <label htmlFor="mailchimp-signup">
            Get reminders by email:
          </label>
          <input
            type="email"
            value=""
            name="EMAIL"
            id="mailchimp-signup"
            placeholder="email address"
            required
          />
          <input
            type="text"
            name="b_8caf5cbe5346a3b5699e90085_fc768672ff"
            tabIndex="-1"
            value=""
          />
          <input
            type="submit"
            value="Subscribe"
            name="subscribe"
          />
        </form>
      </div>

      <div id="calls-to-action">
        {callsToAction.map(callToAction => (
          <CallToAction {...callToAction.data} uid={callToAction.uid} key={callToAction.uid} />
        ))}
      </div>
    </Fragment>

    <Fragment forRoute="/todo">
      <TodoList />
    </Fragment>

    <Fragment forRoute="/start-here">
      <div id="start-here" styleName="start-here">
        <h2>{startHere.data['start-here.title'].value}</h2>
        <StructuredText value={startHere.data['start-here.content'].value} />
        <Link styleName="link-button" href="/">Go back to the phone sheet</Link>
      </div>
    </Fragment>
  </div>

);

App.propTypes = {
  callsToAction: PropTypes.array.isRequired,
  startHere: PropTypes.object.isRequired,
};

const StyledApp = CSSModules(App, styles);

const mapStateToProps = state => state;
const mapDispatchToProps = _.constant({});

export default connect(mapStateToProps, mapDispatchToProps)(StyledApp);
