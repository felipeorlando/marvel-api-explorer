import pagination from './pagination';
import filter from './filter';

export function characters(data) {
  return {
    type: 'FETCHED',
    data
  };
}

export function charactersGet(options) {
  return function (dispatch, getState, api) {
    var { limit, offset, orderBy, total } = options;
    return api.getCharacters({ limit, offset, orderBy }).then((data) => {
      dispatch(characters(data));
      dispatch(filter(getState().filter));
      var { limit, offset, total } = data.data.data;
      var pages = Math.round(total / limit);

      if (getState().pagination.total !== pages) {
        dispatch(pagination(Object.assign({}, getState().pagination, { total: pages })));
      }
    })
  };
}

