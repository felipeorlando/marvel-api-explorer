import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Home from '../views/home';
import { charactersGet } from '../actions/characters';
import { comicsGet } from '../actions/comics';
import fetching from '../actions/fetching';
import search from '../actions/search';
import fetchingError from '../actions/fetchingError';
import filter from '../actions/filter';
import pagination from '../actions/pagination';
import { push } from 'react-router-redux';
import appStore from '../model/store';
import defaultStore from '../model/initialState';
import { createSelector } from 'reselect';
import PaginationHelper from '../model/paginationHelper';

const pg = new PaginationHelper();

function mapStateToProps(store) {
  return { error: store.error, fetching: store.fetching, filter: store.filter, search: store.search, pagination: Object.assign(
      {},
      store.pagination,
      {
        pages: pg.getPages(store.pagination),
        next: pg.getNext(store.pagination),
        prev: pg.getPrev(store.pagination)
      }
    ), data: store.data };
}

const mapDispatchToProps = (dispatch, store) => {

  const fetch = (filter, pagination, search) => {
    dispatch(fetching(true));
    if (filter === 'characters') {
      dispatch(charactersGet(Object.assign({}, { page: pagination.current, total: pagination.total, orderBy: 'name', nameStartsWith: search })));
    } else {
      dispatch(comicsGet(Object.assign({}, { page: pagination.current, total: pagination.total, orderBy: 'title', titleStartsWith: search })));
    }
  };

  return {
    errorClear: (props) => {
      dispatch(fetchingError(''));
    },
    fetchAction() {
      fetch(appStore.getState().filter, appStore.getState().pagination, appStore.getState().search);
    },
    searchAction: (val, props) => {
      const queryString = val.length? `?search=${val}`:'';
      dispatch(push(`/${props.filter}/${defaultStore.pagination.current}${queryString}`));
      dispatch(search(val));
      dispatch(pagination(defaultStore.pagination));
      fetch(appStore.getState().filter, appStore.getState().pagination, val);
    },
    searchClear: (val) => {
      dispatch(search(val));
    },
    filterAction: (val, props) => {
      dispatch(push(`/${val}/${defaultStore.pagination.current}?search=${appStore.getState().search}`));
      dispatch(filter(val));
      dispatch(pagination(defaultStore.pagination));
      fetch(val, appStore.getState().pagination, appStore.getState().search);
    },
    paginationAction: (url, props) => {
      dispatch(push(url));
      const page = Number(url.split('/')[2].split('?')[0]);
      const store = appStore.getState();
      dispatch(pagination({
          current: page,
          pages: pg.getPages(store.pagination),
          next: pg.getNext(store.pagination),
          prev: pg.getPrev(store.pagination)
        }));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
