import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as allActions from '../actions';

function mapStateToProps({ document, environments, types, brands }) {
  const { loading, loaded, error, splunk, url, headline, pal, contentGuid, contentId, publisher, total, totalUpdates, rawMessages, contentPublisher,
    date_created, date_published, date_updated, drupal, contentApi, contentScm, halBrowser, resCodes, coverImage } = document;
  
    return {
    loading,
    loaded,
    error,
    splunk,
    url,
    headline,
    pal,
    contentGuid,
    contentId,
    publisher,
    total,
    totalUpdates,
    rawMessages,
    contentPublisher,
    date_created,
    date_published,
    date_updated,
    environments,
    isLoading: loading,
    types,
    brands,
    drupal,
    contentApi,
    contentScm,
    halBrowser,
    resCodes,
    coverImage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(allActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
