import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as allActions from '../actions';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(allActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
