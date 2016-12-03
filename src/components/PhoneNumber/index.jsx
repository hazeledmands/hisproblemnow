import CSSModules from 'react-css-modules';
import React, { PropTypes } from 'react';
import _ from 'lodash';
import phoneFormatter from 'phone-formatter';

import ToggleTodo from '../../containers/ToggleTodo';

import styles from './styles.css';

function PhoneNumber({ value, actionId }) {
  const title = _.get(value, 'title.value');
  const firstName = _.get(value, 'first-name-or-organization.value');
  const lastName = _.get(value, 'last-name.value');

  const name = _([title, firstName, lastName]).flatten().join(' ');
  const phone = phoneFormatter.format(String(_.get(value, 'phone-number.value', '')), '(NNN) NNN-NNNN');

  return (
    <div styleName="phone-number-block">
      <ToggleTodo phoneNumber={value} actionId={actionId} />
      {name && <div styleName="name">{name}</div>}
      <div styleName="phone-number">{phone}</div>
    </div>
  );
}

PhoneNumber.propTypes = {
  value: PropTypes.object.isRequired,
  actionId: PropTypes.string.isRequired,
};

export default CSSModules(PhoneNumber, styles);
