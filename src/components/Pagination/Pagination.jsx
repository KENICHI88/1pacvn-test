import React from 'react';

const Pagination = ({total = 0, activePage = 0, pageSize , handlePageChange}) => {
  
  const renderPaging = (pages, current)=>{
    let i = 0,
        rs = [],
        length = pageSize;
    if(pages > pageSize){
      if(current>4) {
        i= current -4;
        length = current+5;
      }
      
      while(i <= length && i < pages){
        let cur = i;
        if(i === current){
          rs.push(<li key={`paging-${i}`} className="page-item active" aria-current="page"><span className="page-link">{cur+1}<span className="sr-only">(current)</span></span></li>)
        }else {
          rs.push(<li key={`paging-${i}`} className="page-item"><button className="page-link" onClick={() => handlePageChange(cur)}>{cur+1}</button></li>)
        }
        i++;
      }
      
    }else {
      while(i <= pages){
        let cur = i;
        if(i === current){
          rs.push(<li key={`paging-${i}`} className="page-item active" aria-current="page"><span className="page-link">{i+1}<span className="sr-only">(current)</span></span></li>)
        }else {
          rs.push(<li key={`paging-${i}`} className="page-item"><button className="page-link" onClick={() => handlePageChange(cur)}>{i+1}</button></li>)
        }
        i++;
      }
    }
    return rs ? rs : null;
  }
  
  
  return (
    <nav aria-label="Page navigation">
        <ul className="pagination">
          {total && renderPaging(total, activePage)}
        </ul>
      </nav>
  );
}

export default Pagination;
