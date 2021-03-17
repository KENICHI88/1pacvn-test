import React, {useState, useMemo, useCallback, useEffect} from 'react';
import List from '../List/List';
import Pagination from '../Pagination/Pagination';

import './Tabs.style.scss';

const Tabs = ({dataList, pageSize, activePage, afterChanged, actionLike, actionRemove, actionSave, handlePageChange}) => {
  const [listTab, setListTab] = useState([{text: 'All', value : 'all', isActive: true}, {text: 'Removed', value : 'removed', isActive: false}, {text: 'Like', value: 'liked', isActive: false}]);
  const [activeType, setActiveType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  const handleTabChange = (index) => {
    let activeTab = activeType;
    setListTab(listTab.map((item, ind) => {
      if(ind === index) {
        item.isActive = true;
        activeTab = item.value;
      } else {
        item.isActive = false;
      }
      return item;
    }))
    handlePageChange(0);
    setActiveType(activeTab);
  }
  
  const sortHandle = (array, sortBy) => {
    switch(sortBy) {
      case 'a-z':
        return array.sort((a, b) => {
          const aObj = a.data[0].title.toUpperCase();
          const bObj = b.data[0].title.toUpperCase();
          return (aObj < bObj) ? -1 : (aObj > bObj) ? 1 : 0;
        });
      case 'z-a':
        return array.sort((a, b) => {
          const aObj = a.data[0].title.toUpperCase();
          const bObj = b.data[0].title.toUpperCase();
          return (aObj < bObj) ? 1 : (aObj > bObj) ? -1 : 0;
        });
      case 'oldest':
        return array.sort((a, b) => {
          const aObj = a.data[0].date_created;
          const bObj = b.data[0].date_created;
          return (aObj < bObj) ? -1 : (aObj > bObj) ? 1 : 0;
        });
      case 'newest':
      default:
        return array.sort((a, b) => {
          const aObj = a.data[0].date_created;
          const bObj = b.data[0].date_created;
          return (aObj > bObj) ? 1 : (aObj > bObj) ? -1 : 0;
        });
    }
  }
  
  const filterList = useMemo(() => {
    switch(activeType) {
      case 'removed' : {
        return sortHandle(dataList.filter(item => item.remove), sortBy);
      }
      case 'liked' : {
        return sortHandle(dataList.filter(item => item.like), sortBy);
      }
      case 'all' :
      default: {
        return sortHandle(dataList, sortBy);
      }
    }
  }, [sortBy, dataList, activeType] );
  
  return (
    <div>
      <ul className="nav nav-tabs">
        {listTab.map((item, index) => <li className="nav-item" key={item.value}>
          <a  className={item.isActive ? "nav-link active" : "nav-link"} href="#"
            onClick={() => !item.isActive && handleTabChange(index)}
          >{item.text}</a>
        </li>)}
        
        <li className="nav-item last-item">
          <div className="nav-link">Sort by:
            <a className="sort-link" onClick={() => setSortBy('newest')}>Newest</a> / 
            <a className="sort-link" onClick={() => setSortBy('oldest')}>Oldest</a> / 
            <a className="sort-link" onClick={() => setSortBy('a-z')}>A-Z</a> / 
            <a className="sort-link" onClick={() => setSortBy('z-a')}>Z-A</a>
          </div>
        </li>
      </ul>
      
      
      <div className="nav-content my-3">
        <List
          listData={filterList}  
          pageSize={pageSize} 
          activePage={activePage} 
          afterChanged={afterChanged} 
          actionLike={actionLike}
          actionRemove={actionRemove}
          actionSave={actionSave}
          />
      </div>
      
      <Pagination total={filterList.length/pageSize} activePage={activePage} 
          handlePageChange={handlePageChange} 
          pageSize={pageSize} />
    </div>
  );
}

export default Tabs;
