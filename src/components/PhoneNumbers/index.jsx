import CSSModules from 'react-css-modules';
import React, { PropTypes } from 'react';

import PhoneNumber from '../PhoneNumber';

import styles from './styles.css';

const PhoneNumbers = ({ value }) => (
  <div styleName="phone-numbers">
    {(value || []).map((number, i) => (
      <PhoneNumber key={i} value={number} />
    ))}
  </div>
);

PhoneNumbers.propTypes = {
  value: PropTypes.array.isRequired,
};

export default CSSModules(PhoneNumbers, styles);
