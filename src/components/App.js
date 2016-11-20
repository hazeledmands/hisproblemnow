import React, {PropTypes} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import CallToAction from './CallToAction';

const App = ({callsToAction}) => (
  <div>
    <h1 id='title' className='title'>☎️ Anti-Trump Phone Sheet ☎️</h1>
    <h2 className='subtitle'>Push back against Donald Trump by calling your elected representatives using these handy scripts.</h2>

    <div id='intro' className='intro info'>
      <a className='link-button' href='#start-here'>What is this about?</a>
    </div>

    <div id='calls-to-action' className='calls-to-action'>
      {callsToAction.map((callToAction) => (
        <CallToAction {...callToAction.data} uid={callToAction.uid} key={callToAction.uid} />
      ))}
    </div>

    <div id='start-here' className='start-here info'>
      <h2>What is this about?</h2>

      <p>All election cycle, Donald Trump has been our problem. Now, we're <b>HIS PROBLEM</b>, and since Congress serves us, <b>SO ARE THEY</b>. Let's use the best tool at our disposal (our elected representation) to show Donald once and for all that, in our America, <b>ACCOUNTABILITY TRUMPS HATE</b>.</p>

      <p><a href="http://www.attn.com/stories/12768/former-congressional-staffer-explains-how-to-make-congressman-listen">Read this series of tweets for more on why phone calls are an effective tool for political action.</a></p>


      <p>This page contains a list of weekly scripts to use when calling your elected representatives. You can find more resources and information <a href='https://docs.google.com/spreadsheets/d/174f0WBSVNSdcQ5_S6rWPGB3pNCsruyyM_ZRQ6QUhGmo/htmlview?usp=sharing&sle=true#'>on this google spreadsheet</a>. </p>

      <p>Begin with the WEEKLY-CALL-TO ACTION. This is the #1 priority for calls. I'll update every Sunday eve/early Monday, or sometimes mid-week if something urgent comes up. Call Party Leadership AND your own representatives.</p>

     <p>Toward the end of the week, when you have made and followed up on the WEEKLY-CALL-TO-ACTION, make calls about specific progressive issues that are important to you. Call about even-numbered issues on Thursdays and odd-numbered issues on Fridays. Try to avoid calling about an issue that is directly-related to the WEEKLY-CALL-TO-ACTION, since officials will likely receive lots of calls about this particular topic. If that issue is super important to you, just make extra follow-up calls using the WEEKLY-CALL-TO-ACTION script.</p>

      <a className='link-button' href='#title'>Go back to the phone sheet.</a>
    </div>
  </div>

)

App.propTypes = {
  callsToAction: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = _.constant({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
