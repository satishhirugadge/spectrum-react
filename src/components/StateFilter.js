import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function StateFilter({
  handleStateChecked,
  filteredApplied,
  handleClearStateFilter,
}) {
  const stateAbbreviations = [
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FM',
    'FL',
    'GA',
    'GU',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MH',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'MP',
    'OH',
    'OK',
    'OR',
    'PW',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VI',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  const [inputState, setInputState] = useState('');
  const [state, setState] = useState(stateAbbreviations);
  const [filteredState, setFilterState] = useState(stateAbbreviations);
  const [openList, setOpenList] = useState(false);
  const handleChange = (event) => {
    handleStateChecked(event.target.name, event.target.checked);
  };
  const style = {
    row: {
      marginRight: 4,
    },
    checkbox: {
      margin: 10,
    },
  };

  const handleStateChange = (event) => {
    setInputState(event.target.value);
    if (event.target.value !== '') {
      setOpenList(true);
    } else {
      setOpenList(false);
    }
  };

  useEffect(() => {
    setFilterState(
      state.filter((v) => {
        return (
          v.toLowerCase().includes(inputState.toLowerCase()) &&
          !filteredApplied.includes(v.toUpperCase())
        );
      })
    );
  }, [inputState, state, filteredApplied]);

  function handleListClicked(v) {
    handleStateChecked(v.target.name, true);
  }

  return (
    <div style={style.row}>
      <Row style={{width:200}}>
        {filteredApplied.map((v) => {
          return (
            <div
              style={{
                padding: 10,
                margin: 5,
                borderRadius: 20,
                background: 'grey',
              }}>
              {v}
            </div>
          );
        })}
        {filteredApplied.length > 0 && (
          <Button
            style={{ padding: 10, margin: 5, borderRadius: 20 }}
            onClick={handleClearStateFilter}>
            clear
          </Button>
        )}
      </Row>
      <Row>
        <Form.Group controlId='formBasicEmail'>
          <Form.Control
            type='search'
            placeholder='Filter by State...'
            onChange={handleStateChange}
          />
          <Form.Text className='text-muted'>
            <Row style={{justifyContent:"center", marginLeft:2, position:"absolute"}}>
              {openList ? (
                <ListGroup style={{width:200, padding: 2}}>
                  {filteredState.map((v) => {
                    return (
                      <ListGroup.Item
                        action
                        name={v}
                        onClick={handleListClicked}>
                        {v}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              ) : null}
            </Row>
          </Form.Text>
        </Form.Group>
      </Row>
    </div>
  );
}

export default StateFilter;
