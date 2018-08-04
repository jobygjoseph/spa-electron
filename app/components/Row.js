  /**
 * Created by ImranAnsari on 6/15/17.
 */

import React, { Component } from 'react';

export default class Row extends Component {
  // eslint-disable-next-line class-methods-use-this
  getStatusClass(status) {
    if (status < 300) {
      return 'badge badge-success';
    }
    if (status < 400) {
      return 'badge badge-warning';
    }
    if (status >= 400) {
      return 'badge badge-danger';
    }
    return 'badge badge-default';
  }

  render() {
    const { fieldKey, fieldValue, linkText, linkHref, placeHolder, status } = this.props;
    const linkBody = (linkHref && !linkText) ? linkHref : linkText;
    return (
      <tr>
        <th scope="row">{fieldKey}</th>
        <td>
          {linkHref && <a href={linkHref} target="blank">{linkBody}</a>}
          {fieldValue && <span>{fieldValue}</span>}
          <br />{placeHolder.length > 1 && <small className="light-gray-def"><i>{placeHolder}</i></small>}
        </td>
        {status && <td><span className={this.getStatusClass(status)}>{status}</span></td>}
      </tr>
    );
  }

}
