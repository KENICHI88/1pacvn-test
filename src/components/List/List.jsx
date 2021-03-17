import React, {useEffect, useCallback, useMemo}  from 'react';
import Item from './Item';

import './List.style.scss';

const List = ({listData, pageSize, activePage, afterChanged, actionLike, actionRemove, actionSave}) => {
  
  const renderList = useMemo(() => {
    let rs = [];
    if(listData) {
      for(let i= activePage*pageSize; i < (activePage+1)*pageSize && i < listData.length; i++ ) {
        rs.push(listData[i]);
      }
    }
    if(rs.length) {
      return rs.map((item) => <Item key={item.key} 
        data={item}
        actionLike={actionLike}
        actionRemove={actionRemove}
        actionSave={actionSave}
      ></Item>);
    }
    return (<p>Sorry! We don't see you are looking for! Please try again</p>);
  }, [listData, pageSize, activePage]);

  useEffect(() => {
    return () => {
      afterChanged();
    }
  }, [listData, pageSize, activePage]);
  
  return (
    <div className="card-group">
      {renderList}
    </div>
  );
}

export default List;
