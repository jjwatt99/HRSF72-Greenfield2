import React from 'react';
import t from 'tcomb-form';




class EditTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit= this.onSubmit.bind(this);
  
  }

  onSubmit(evt) {
    if (this.refs.form.getValue()) {
      var userInput = this.refs.form.getValue();
      console.log('this.refs.form.getValue() = ', userInput)
      if (userInput) {
        this.props.submitEditTaskForm(userInput);
      }
    }
  }

  render() {
    const Form = t.form.Form;

    var ListOfPrerequisites = t.enums.of(this.props.editFormState.Prerequisites)

    var ListOfDependencies = t.enums.of(this.props.editFormState.Dependencies)

    const Person = t.struct({
      name: t.String,
      startDate: t.String,
      startMonth: t.String,
      startTime: t.String,
      dueDate: t.String,
      dueMonth: t.String,
      completed: t.Bool,
      Prerequisites: t.maybe(t.list(ListOfPrerequisites)),
      Dependencies: t.maybe(t.list(ListOfDependencies)),
      _id: t.String
    });
    const value = {
      name: this.props.editFormState.name,
      startDate: this.props.editFormState.startDate,
      startMonth: this.props.editFormState.startMonth,
      startTime: this.props.editFormState.startTime,
      dueDate: this.props.editFormState.dueDate,
      dueMonth: this.props.editFormState.dueMonth,
      completed: this.props.editFormState.completed,
      Prerequisites: this.props.editFormState.Prerequisites,
      Dependencies: this.props.editFormState.Dependencies,
      _id: this.props.editFormState._id
    };
    return (
      <div>
        <Form
          ref="form"
          type={Person}
          value={value}
        />
        <button onClick={()=>this.onSubmit(event)}>Save</button>
      </div>
    );
  }

};


export default EditTaskForm;


