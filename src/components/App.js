import React, {PropTypes} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import CallToAction from './CallToAction';
import StructuredText from './StructuredText';

const App = ({callsToAction, startHere}) => (
  <div>
    <h1 id='title' className='title'>{startHere.data['start-here.page-title'].value}</h1>
    <h2 className='subtitle'>{startHere.data['start-here.subtitle'].value}</h2>

    <div id='intro' className='intro info'>
      <a className='link-button' href='#start-here'>{startHere.data['start-here.button-text'].value}</a>
    </div>

    <div id='calls-to-action' className='calls-to-action'>
      {callsToAction.map((callToAction) => (
        <CallToAction {...callToAction.data} uid={callToAction.uid} key={callToAction.uid} />
      ))}
    </div>

    <div id='start-here' className='start-here info'>
      <h2>{startHere.data['start-here.title'].value}</h2>

      <StructuredText value={startHere.data['start-here.content'].value} />

      <a className='link-button' href='#title'>Go back to the phone sheet.</a>
    </div>
  </div>

)

App.propTypes = {
  callsToAction: PropTypes.array.isRequired,
  startHere: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = _.constant({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
