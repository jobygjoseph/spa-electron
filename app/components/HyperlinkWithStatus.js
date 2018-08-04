/**
 * Created by ImranAnsari on 6/21/17.
 */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Row from './Row';

import { fetchStatus } from '../actions';

@connect(
  store => ({
    resCode: 200,
    contentApi: store.document.contentApi,
  }),

  dispatch => ({
    actions: {
      getAPIStatus(url) {
        dispatch(
          fetchStatus(url),
        );
      },
    },
  }),
)
export default class HyperlinkWithStatus extends Component {

  componentWillReceiveProps() {
    const { contentApi } = this.props;
    if (contentApi) {
      this.props.actions.getAPIStatus(contentApi);
    }
  }

  render() {
    const { resCode } = this.props;
    return (
      <Row fieldKey={resCode} fieldValue={resCode} placeHolder="" />
    );
  }
}
