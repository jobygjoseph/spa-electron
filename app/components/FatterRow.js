import React, { Component } from 'react';
import Row from './Row';

export default class FatterRow extends Component {
  render() {
    const { fieldKey, rowBody, rowLinks } = this.props;
    return (
      <tr>
        <th scope="row">{fieldKey}</th>
        <td><table className="table"><tbody>
          {rowBody && rowBody.map((bd, i) => <Row key={i} fieldKey={bd.fieldKey} fieldValue={bd.fieldValue} placeHolder="" />)}
          {rowLinks && rowLinks.map((bd, i) => <Row key={i} linkHref={bd.linkHref} linkText={bd.linkText} status={bd.status} placeHolder="" />)}
        </tbody></table>
        </td>
      </tr>
    );
  }
}
