
import InputGroup from 'react-bootstrap/InputGroup'

function StateFilter({handleStateChecked}) {

    const stateAbbreviations = [
        'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
        'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
        'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
        'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
        'VT','VI','VA','WA','WV','WI','WY'
       ];

       const handleChange = (event) =>{
            handleStateChecked(event.target.name, event.target.checked)
       }
    return (
      <div>
          {
            stateAbbreviations.map(state =>{
                return(
                    <div>
                <span>{state}</span> 
                <InputGroup.Checkbox name={state} aria-label="Checkbox for following text input" onChange={handleChange} />
                </div>
                )
            })
          }
           
      </div>
    );
  }
  
  export default StateFilter;
  