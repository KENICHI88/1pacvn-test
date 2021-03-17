import React, {useState, useCallback, useRef} from 'react';
import Search from '../components/Search/Search';
import List from '../components/List/List';
import {useLocalStorage} from '../hook/useLocalStorage';
import Loading from '../components/Loading/Loading';

import { v4 as uuidv4 } from 'uuid';
import Tabs from '../components/Tabs/Tabs';

const Home = () => {
  const containerRef = useRef();
  const [listResult, setListResult]  = useLocalStorage('resultQuery', {keySearch: '', data: []});
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  
  const pageSize=8;
  
  const requestAPI = useCallback(async (keySearch) => {
    await setLoading(true);
    if(listResult && listResult.keySearch === keySearch) {
      setLoading(false);
    } else {
      if(keySearch.trim() === '') {
        setListResult({keySearch: '', data: []});
      } else {
          await fetch('https://images-api.nasa.gov/search?q='+ encodeURIComponent(keySearch)).then(data => data.json())
        .then(data => {
          
          const dataList = data.collection.items;
          dataList.map(item => {
            item.key = uuidv4();
            item.like = false;
            item.remove = false;
            item.editing = false;
            return item;
          })
          
          setListResult({...listResult,
            keySearch,
            data: dataList
          });
          setActivePage(0);
          setLoading(false);
        }).catch(error => {
          setLoading(false);
          console.log(error);
        })
      }
    }
  });
  
  const handleSubmitForm = (value) => {
    requestAPI(value);
  }
  
  const handlePageChange = (index) => {
    setLoading(true);
    setActivePage(index);
    scrollIntoView();
  }
  
  const scrollIntoView = () => {
    containerRef.current.scrollIntoView({
      behavior: 'smooth',
      block : 'start'
    })
  }
  
  const actionLike = useCallback((key) => {
    let processData = listResult.data.map(item => {if(item.key === key){
        item.like = !item.like;
      }
      return item;
    }
    );
    setListResult({...listResult, data: processData});
  });
  
  const actionRemove = useCallback((key) => {
    let processData = listResult.data.map(item => {if(item.key === key){
      item.remove = !item.remove;
    }
      return item;
    }
  );
  setListResult({...listResult, data: processData});
  });
  
  const actionSave = useCallback((key, value) => {
    let processData = listResult.data.map(item => {if(item.key === key){
      item.data[0].title = value;
    }
      return item;
    }
  );
  setListResult({...listResult, data: processData});
  });
  
  return (
    <div className="container" ref={containerRef}>
      <div className="row">
        <div className="col my-3">
          <h1 className="heading">WELCOME TO MY TEST PAGE!!!!</h1>
        </div>
      </div>
      <div className="row">
        <div className="col my-3">
          <Search submitForm={handleSubmitForm}/>
        </div>
      </div>
      
      <div className="row my-3">
        <div className="col">
          {listResult.data.length && <Tabs
            dataList={listResult.data} 
            pageSize={pageSize} 
            activePage={activePage} 
            afterChanged={() => setLoading(false)} 
            actionLike={actionLike}
            actionRemove={actionRemove}
            actionSave={actionSave}
            total={listResult.data.length/pageSize} activePage={activePage} 
            handlePageChange={handlePageChange} 
            pageSize={pageSize} 
          />}
          
        </div>
      </div>
      <Loading isShow={loading} />
    </div>
  );
}

export default Home;
