import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DOCUMENT_FETCH_LOADING, DOCUMENT_FETCH_SUCCESS, DOCUMENT_FETCH_ERROR } from '../reducers/document';


//@connect(store => store)
export default class Form extends Component {
  constructor() {
    super();
    this.getProxyUrl = this.getProxyUrl.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getProxyUrl(url) {
    let returnUrl = url;
    if (process.env.NODE_ENV === 'production') {
      returnUrl = `/api?url=${url}`;
    }
    return returnUrl;
  }

  submitForm(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const id = this.id.value;
    const type = this.type.options[this.type.selectedIndex].value;
    const environment = this.environment.options[this.environment.selectedIndex].value;
    const brand = this.brand.options[this.brand.selectedIndex].value;

    const url = `${environment}/${brand}/${type}/${id}/stats`;

    dispatch({
      type: DOCUMENT_FETCH_LOADING,
    });

    fetch(this.getProxyUrl(url), { mode: 'cors' })
        .then((response) => {
          if (response.ok) {
            return response.json().then((payload) => {
              const { pal } = payload.web;
              const {
                content_api: contentApi,
                content_scm: contentScm,
                hal_browser: halBrowser } = payload.warehouse_api;
              const urlTests = [pal, contentApi, contentScm, halBrowser]; // order matters here
              let coverImage = '';
              Promise.all(urlTests.map(uri => fetch(this.getProxyUrl(uri), { mode: 'cors' })))
                  .then((values) => {
                    const [
                      { status: palCode },
                      { status: apiCode },
                      { status: scmCode },
                      { status: halCode }] = values;
                    values[1].json().then(((ap) => {
                      coverImage = ap._embedded['nbcng:coverImage'].url || ap._embedded['nbcng:image'].url || '';
                      dispatch({
                        type: DOCUMENT_FETCH_SUCCESS,
                        payload: { ...payload,
                          resCodes: { apiCode, scmCode, halCode, palCode },
                          coverImage },
                      });
                    }))
                    .catch(() => {
                      // let's dispatch without an image.
                      dispatch({
                        type: DOCUMENT_FETCH_SUCCESS,
                        payload: { ...payload,
                          resCodes: { apiCode, scmCode, halCode, palCode },
                          coverImage },
                      });
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                    dispatch({
                      type: DOCUMENT_FETCH_ERROR,
                      payload: err.message,
                    });
                  });
            });
          }
          throw new Error(`Network response was not ok, response code is : ${response.status}`);
        }).catch((error) => {
          console.error(error);
          dispatch({
            type: DOCUMENT_FETCH_ERROR,
            payload: error.message,
          });
        });
  }


  render() {
    const { environments, types, brands } = this.props;

    return (
      <form onSubmit={this.submitForm.bind(this)}>

        <select className="selectpicker" ref={(env) => { this.environment = env; }}>
          {environments.map(env => <option key={env.value} value={env.value}>{env.label}</option>)}
        </select>
        <br /><br />
        <select className="selectpicker" ref={(type) => { this.type = type; }}>
          {types.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
        </select>
        <br /><br />
        <select className="selectpicker" ref={(brand) => { this.brand = brand; }}>
          {brands.map(brand =>
            <option key={brand.value} value={brand.value}>{brand.label}</option>)}
        </select>
        <br /><br />
        <input
          className="selectpicker"
          ref={(id) => { this.id = id; }}
          defaultValue="53981"
          type="text"
          placeholder="Enter the Drupal Document Id"
        />
        <br /><br />
        <div >
          <button className="btn btn-primary mt-2 mt-sm-0">Submit</button>
        </div>
      </form>
    );
  }
}
