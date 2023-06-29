import './Filter.scss';
import PropTypes from 'prop-types';

export const Filter = ({ handleSearch }) => {
  return (
    <label className="phonebook__search">
      Find contact by name:
      <input type="text" name="filter" onChange={handleSearch} />
    </label>
  );
};

Filter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
