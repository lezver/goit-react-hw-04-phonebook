import './Filter.scss';
import PropTypes from 'prop-types';

export const Filter = ({ search }) => {
  return (
    <label className="phonebook__search">
      Find contact by name:
      <input type="text" name="filter" onChange={search} />
    </label>
  );
};

Filter.propTypes = {
  search: PropTypes.func.isRequired,
};
