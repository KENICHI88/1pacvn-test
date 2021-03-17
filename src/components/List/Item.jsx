import React , {useState, useRef} from 'react';
import LazyLoad from 'react-lazyload';

import './Item.style.scss';

const Item = (props) => {
  const inputRef = useRef();
  const {title, description_508 : description, date_created} = props.data.data[0];
  const {href : thumbnail} = props.data.links ? props.data.links[0] : {href:'https://via.placeholder.com/150x110'};
  const [editing, setEditing] = useState(false);
  
  const saveItem = () => {
    props.actionSave(props.data.key, inputRef.current.value);
    setEditing(false);
  }
  
  return (
    <div className="card col-sm-6 col-lg-3">
      <LazyLoad height={200}>
        <img src={thumbnail} className="card-img-top" alt={title} />
      </LazyLoad>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">Date: { (new Date(date_created).toUTCString('dd/mm/YYYY'))}</p>
      </div>
      <div className="card-footer">
        
        {editing ? 
        (<><button className="btn btn-dark btn-sm" onClick={saveItem} >Save</button>
        <div className="">
          <p>Edit title </p>
        <input className="form-control" ref={inputRef} />
        </div></>) : (
          <><button className="btn btn-primary btn-sm" onClick={() => props.actionLike(props.data.key) } >{props.data.like ? 'Dislike' : 'Like'}</button>
          <button className="btn btn-danger btn-sm" onClick={() => props.actionRemove(props.data.key) } >{props.data.remove ? 'Undo' : 'Remove'}</button>
          <button className="btn btn-dark btn-sm" onClick={() => setEditing(true) } >Edit</button>
        </>)
        }
        
      </div>
    </div>
  );
}

export default Item;
