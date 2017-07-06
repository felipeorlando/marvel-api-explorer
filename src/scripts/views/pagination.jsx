import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserHistory } from 'react-router';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps, prevState) {
    var totalPages = this.props.pagination.total;

    var page = this.props.match.params.page || 0;
    if (isNaN(page) === false && page && page !== prevProps.pagination.current) {
      this.props.paginationAction(page);
    }
  }

  render() {

    return (
      <div>
        <NavLink strict className="link" to={{ pathname: `/${this.props.filter}/${Number(this.props.pagination.current) - 1}` }} key={'prev'} >
          <span>prev</span>
        </NavLink>

        {
          this.props.pagination.pages.map((data, index) => {
            return <NavLink strict className="link" to={{
              pathname: `/${this.props.filter}/${index}`
            }} key={data + index} >
              <span>{index + 1}</span>
            </NavLink>
          })
        }
        <NavLink strict className="link" to={{ pathname: `/${this.props.filter}/${Number(this.props.pagination.current) + 1}` }} key={'next'} >
          <span>next</span>
        </NavLink>
      </div>
    );
  }
}
Pagination.propTypes = {
  paginationAction: React.PropTypes.func,
  pagination: React.PropTypes.any,
  location: React.PropTypes.object,
  filter: React.PropTypes.any,
  match: React.PropTypes.object,
}
export default Pagination;
