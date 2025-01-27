import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import languageContext from './context/languageContext'
import stringsModule from './helpers/strings'

/**
 * Functional react component for congratulatory message.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false).
 */
const Congrats = (props) => {
  const language = useContext(languageContext);

  if (props.success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    );
  } else {
    return (
      <div data-test="component-congrats" />
    );
  }
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
