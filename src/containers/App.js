import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Radium, {StyleRoot} from 'radium';
import Cockpit from '../Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      { id: 'grfgr54y654', name: 'Max', age: 28 },
      { id: 't56565', name: 'Manu', age: 29 },
      { id: 'hjuyk', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons } )
  }
  // delete: index- kliknięty element, 1. podstawiamy za zmienną listę z któeej chcemy usunąć (żeby nie zmieniać state kopiujemy - destrukturyzacja)
  // 2. usuwamy jeden el poprzes splice(index,1) 1 to 1 el. 3 aktualizajja
  deletePersonHandler = (Index) => {
    const persons = [...this.state.persons];
    persons.splice(Index,1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }


  render () {
   let persons = null;

   const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {           // radium psełdoselektor
      backgroundColor: 'lightgreen',
      color: 'black',
    }
  };
    if (this.state.showPersons) {
      style.backgroundColor = 'red';
      style[':hover'] = {         // radium psełdoselektor
        backgroundColor: 'salmon',
        color: 'black'
      }
      persons = (
        <div>
          <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
           />
      </div>
      );


    };
    return (
      <StyleRoot>
          <div className="App">
          <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons} 
          clicked={this.togglePersonsHandler}
          style={style}
          title={this.props.appTitle}/>
          {persons}
          </div>
        </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);
