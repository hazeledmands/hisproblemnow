import CSSModules from 'react-css-modules';
import React, { PropTypes } from 'react';

import PhoneNumber from '../PhoneNumber';

import styles from './styles.css';

const PhoneNumbers = ({ value, actionId }) => (
  <div styleName="phone-numbers">
    {(value || []).map((number, i) => (
       <PhoneNumber key={i} value={number} actionId={actionId} />
    ))}
  </div>
);

PhoneNumbers.propTypes = {
  value: PropTypes.array.isRequired,
  actionId: PropTypes.string.isRequired,
};

export default CSSModules(PhoneNumbers, styles);
