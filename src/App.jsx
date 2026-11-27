import { useReducer, useState } from 'react'

 const initialArray =  [{
name: "Juan",
isDone: false
}]

// reducer function // 
function reducer (list, action){
   switch (action.type){
    case 'addEvent':{
        return [
          ...list,
          {
            name: action.newName,
            isDone: false
          }];}
    
    case 'removeEvent':{
    return list.filter ((event, i) => i!== action.index);
    }

    case 'editEvent':{
      return list;
    }
    case 'saveEvent':{
      return list;
    }
    case 'preSaveEvent':{
        return list.map((event, i) => i==action.index
        ? {...event, name : action.newName}
        : event
      ); 
    }
    case 'toggleEvent': {
      return list.map((event, i) =>
        i === action.index
          ? { ...event, isDone: !event.isDone }
          : event
      );
    }
     default:
      return list;
  }
}

// main function //
function App() {
  const [view, setView] = useState([
    {index:0,
    currentView:true
    }
  ]);

  const [nameForAdd, setNameForAdd] = useState ("");
  const [array,dispatch] = useReducer(reducer,initialArray)

function handleNew1 (e) {
  setNameForAdd(e.target.value);
}

function handleSubmit1 (e){
  e.preventDefault();

  dispatch({
      type:'addEvent',
      newName: nameForAdd
  });
  setNameForAdd("");
}

function handleEdit (e,index){
dispatch({
          type: 'editEvent',
          index: index,
        });
setView (view.some(current=>current.index===index)
?(view.map(current=>
    current.index===index
    ?{ ...current, currentView: false }
    : current
))
:[...view,{index:index,
  currentView:false}]
);
}

function handleSubmit2 (e,index){
  e.preventDefault();
  
  dispatch({
      type:'saveEvent'
  });

  setView (view.map(current=>
    current.index===index
    ?{ ...current, currentView: true }
    : current
  ));
}

  return (
    <>
    <h1>Event List</h1>
        <div>
          <form onSubmit={handleSubmit1}>

            <input
              name= "name"
              value={nameForAdd}
              onChange= {handleNew1}
            />

            <button type ="submit">add </button>

          </form>

        </div>

        <ul>

          {array.map((event,index) => (
            <li key={index}> 

              <input type = "checkbox" checked = {event.isDone} onChange={() => dispatch({
                type: 'toggleEvent',
                index: index })}
              />

              {view.find(oneView => oneView.index===index)?.currentView!==false?
              (
                <>
                {event.name}
                
                <button onClick ={(e) => handleEdit (e,index)}>
                  Edit 
                </button>
                </> 
              ):(
                <form onSubmit={(e) =>handleSubmit2(e,index)}>
                
                <input 
                name= "name"
                value={event.name}
                onChange= {(e) => dispatch({
                  type: 'preSaveEvent',
                  index: index,
                  newName: e.target.value
                })}
                />

                <button type="submit" > Save </button>

              </form>
              )}
          <button  onClick  = {() => dispatch({
          type: 'removeEvent',
          index: index
        })}> Remove </button>
        </li>
      ))}
        </ul>
    </>
  );
}
export default App
