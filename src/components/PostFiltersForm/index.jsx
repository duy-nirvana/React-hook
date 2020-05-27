import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
  onSubmit: [],
}

function PostFiltersForm(props) {
  const {onSubmit} = props;
  const [searchTerms, setSearchTerms] = useState('');
  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(e) {
    const value = e.target.value;
    setSearchTerms(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerms: value,
      }
      onSubmit(formValues);   
    }, 300);
  }

  return (
    <form>
      <input 
        type="text"
        value={searchTerms}
        onChange={handleSearchTermChange}
      />
    </form> 

  );
}

export default PostFiltersForm;