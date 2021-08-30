import React from 'react';
import _ from 'lodash';

const Pagination = ({totalpost, pageSize, onPageChange, currentpage}) => {
    const pageCount = Math.ceil(totalpost / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    
    return ( 
        <nav aria-label="page navigation example">
            <ul className="pagination">
                {pages.map(page => {
                        return (<li className={ (page === currentpage) ? 'page-item active' : 'page-item'} key={page}>
                                    <a className="page-link" onClick={() => onPageChange({id: page})} href="#">{page}</a>
                                </li>);
                    }
                )}
            </ul>
        </nav>
    );
}

export default Pagination;