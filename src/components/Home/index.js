import React from 'react';
import { Link } from 'react-router-dom';
import { problemList } from '../../shared/data';

const HomePage = () => {
  // const problemList = [
  //   {
  //     title: 'Change Box Color',
  //     link: '/change-color',
  //     description: 'The UI should look like shown in the image above with 7 boxes shaped in C shape.On clicking the box, its color changes to green.When all boxes are green, they should again go back to the previous color yellow, one by one, by a 1-second delay, in the same order as they were clicked.',
  //   },
  //   {
  //     title: 'Progress Bar',
  //     link: '/progress-bar',
  //     description: 'progress bar',
  //   },
  //   {
  //     title: 'Table Challenge',
  //     link: '/table-challenge',
  //     description: 'get the data from below url https://lnkd.in/gMWt2VgK.Display a table with years and population from this api. Add a input to search year or population appy debouncing here.Add a reset button which will reset the data in table to initial data. Add delete option in each row which should delete respective row when clicked.',
  //   },
  //   {
  //     title: 'Timer',
  //     link: '/timer',
  //     description: 'Create a react component that displays a timer with initial value 0.There should be two buttons one to start/stop, and other to reset timer.Clicking on start will start timer from 0 and increase timer value by 1 for every second and button text should change to "stop".Clicking on stop will pause the timer and change button text to "start".Now click on start then timer should continue from paused value.Clicking on reset will reset the timer to initial value 0.',
  //   },
  //   {
  //     title:'TO-DO-List',
  //     link:'/to-do-list',
  //     description:"Implement a todo list component in React. User can add, mark todos as completed & filter todos.Each todo object should have a text property and a completed property.Display the list of todos.Each todo should be displayed as a checkbox with the todo text as its label. The checkbox should be checked if the todo is completed.The component has a input field and a button for adding new todos. When the button clicked, a new todo should be added to the list with the input fied's value as its text and completed set to false.When checkbox is clicked, the completed property of that todo should be toggled.filters 'ALL','ACTIVE','COMPLETED'. 'ALL'"
  //   }
  // ];

  return (
    <>
      <div className="row">
        <div className="col-12 my-5" style={{ textAlign: 'center' }}>
          <h1>Machine Coding React Interview</h1>
          <p>Click on the below link to see the solution</p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">

          <ul style={{ listStyleType: 'none' }}>
            {problemList.map((item, index) => (
              <li key={index} style={{ marginBottom: '15px' }}>
                <div className="col-8" style={{ margin: '0 auto' }}>
                  <Link to={item.link+`/${item.title}`} style={{ textDecoration: 'none', color: 'blue' }}>
                    <h4>{index+1 + ". "+item.title}</h4>
                  </Link>
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomePage;

  
//       <div className='row'>
//         <div className='col-12  text-center'  >
//           <div className='row'>
         
//             {problemList.map((item, index) => {
//               return (
//                 <ul style={{ listStyleType: 'number' }}>
//                 <li>
//                 <div className='col-8'>
//               Heloo
//             </div>
//             </li>
//             </ul>
//               )
//             })}
           
//           </div>
           
//         </div>
//       </div>

//     </>
//   )
// }

// export default HomePage