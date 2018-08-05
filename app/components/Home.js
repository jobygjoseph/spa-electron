import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Form from './Form';
import Header from './Header';

import Row from './Row';
import FatterRow from './FatterRow';

export default class App extends Component {
  render() {
        // DO NOT GRAB DISPATCH
    const {
      splunk, url, headline, pal, error, contentGuid, contentId, contentPublisher, totalUpdates,
      rawMessages, date_created, date_published, date_updated, environments=[], types=[], brands=[],
      dispatch, isLoading, contentApi, contentScm, halBrowser, loaded, drupal, resCodes,
      coverImage,
    } = this.props;
    const dateRowBody = [
          { fieldKey: 'Date Created', fieldValue: date_created },
          { fieldKey: 'Date Published', fieldValue: date_published },
          { fieldKey: 'Date Modified', fieldValue: date_updated },
    ];
    const codeLinks = [
          { linkText: 'View this document in the Content API Browser', linkHref: halBrowser, status: resCodes.halCode },
          { linkText: 'View this document from the Content API in JSON format', linkHref: contentApi, status: resCodes.apiCode },
          { linkText: 'View the NewsPAL API representation', linkHref: pal, status: resCodes.palCode },
          { linkText: 'View the Content Warehouse Standard Content Model representation as stored in our MongoDB', linkHref: contentScm, status: resCodes.scmCode },

    ];
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$ dispatch', typeof dispatch, dispatch);
    console.log('###############################', environments);
    console.log('###############################2', types);
    console.log('###############################3', brands);
    return (
      <div className="row">
        <Header />
        <div className="col-lg-11">
          <div className="has-danger">
            <div className="form-control-feedback">All fields listed below are required.</div>
          </div>
          <br />
          <Form environments={environments} types={types} dispatch={dispatch} brands={brands} />
          <br />
          <h3>{
              error
              && <strong>We had some issue fetching document..may be server is down?</strong>
              || loaded
              && <strong>Huzzah! We Found Your Document.</strong>
              || isLoading
              && <strong>Hold Tight We are fetching some juicy details for you...</strong>
              }
          </h3>
          <ReactCSSTransitionGroup transitionName="anim" transitionAppear transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
            { loaded &&
              <div className="card card-inverse bg-primary">
                <div className="card-block clearfix">
                  <img
                    alt=""
                    src={coverImage}
                    width="455"
                    className="rounded float-right"
                  />
                  <h3 className="card-title">{headline}</h3>
                  <p className="card-text" />
                  <h5><span className="badge badge-warning">Article</span></h5>
                </div>
              </div>
                    }
          </ReactCSSTransitionGroup>
          { loaded &&
            <table className="table table-striped" key="table">
              <tbody>
                <Row fieldKey="URL" linkHref={url} placeHolder="" />
                <Row
                  fieldKey="Drupal ID" fieldValue={contentId}
                  placeHolder="The unique ID of the document in the Drupal CMS."
                />
                <Row
                  fieldKey="CW GUID" fieldValue={contentGuid}
                  placeHolder="The unique ID of the document in the Content Warehouse."
                />
                <Row
                  fieldKey="Total Updates" fieldValue={totalUpdates}
                  placeHolder="Total Number of Updates on this document"
                />
                <Row fieldKey="Edit in Drupal" linkHref={drupal} placeHolder="CMS authorization required." />
                <Row fieldKey="Publisher" fieldValue={contentPublisher} placeHolder="" />
                <Row fieldKey="View CMS Messages" linkHref={rawMessages} placeHolder="" />
                <Row fieldKey="Splunk Ingest" linkHref={splunk} placeHolder="View the 90-day ingest history of this document in Splunk." />
                <FatterRow fieldKey="Datestamps" rowBody={dateRowBody} placeHolder="" />
                <FatterRow fieldKey="The Geeky Links" rowLinks={codeLinks} placeHolder="" />

              </tbody>
            </table>
                    }
        </div>
      </div>
    );
  }
}
