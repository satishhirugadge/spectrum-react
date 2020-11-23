import Table from 'react-bootstrap/Table';

function RestroTable(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {props.cols.map((col) => (
            <th key={col.name}> {col.header}</th>
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
