import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function StateFilter({ handleGenreChecked }) {
  const genreFilters = [
    'Steak',
    'American',
    'Contemporary',
    'Seafood',
    'Cafe',
    'French',
    'European',
    'Oysters',
    'Italian',
    'Bistro',
    'Vegetarian',
    'Asian',
    'International',
    'Belgian',
    'Sushi',
    'Japanese',
  ];

  const handleChange = (event) => {
    handleGenreChecked(event.target.name, event.target.checked);
  };
  const style = {
    row: {
      marginRight: 4,
    },
    checkbox: {
      margin: 10,
    },
  };
  return (
    <Row style={style.row}>
       
      {genreFilters.map((genre) => {
        return (
          <div style={style.checkbox}>
            <span style={style.row}>{genre}</span>
            <input
              type='checkbox'
              name={genre}
              key={genre}
              onChange={handleChange}
            />
          </div>
        );
      })}
    </Row>
  );
}

export default StateFilter;
