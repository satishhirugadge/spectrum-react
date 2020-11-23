import Table from 'react-bootstrap/Table';

function RestroTable(props) {

   const handleHeaderClick = (e) => {
      let header = e.target.getAttribute('name')
      props.handleHeaderClick(header)
   }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {props.cols.map((col) => (
            <th key={col.name} > <div name={col.name} onClick={handleHeaderClick}>{col.header}</div></th>
          ))}
        </tr>
      </thead>
      {props.rows.length !== 0 && (
        <tbody>
          {props.rows.map((row) => (
            <tr key={row.id}>
              {props.cols.map((col) => (
                <td key={col.name}>
                  {col.name === 'genre'
                    ? row.genreArray.map((v) => {
                        return <div key={v}>{v}</div>;
                      })
                    : row[col.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      )}
    </Table>
  );
}

export default RestroTable;
