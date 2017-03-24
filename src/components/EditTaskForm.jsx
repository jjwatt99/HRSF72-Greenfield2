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

    const Person = t.struct({
      name: t.String,
      startDate: t.String,
      startMonth: t.String,
      startTime: t.String,
      dueDate: t.String,
      dueMonth: t.String,
      completed: t.Bool
    });
    const value = {
      name: this.props.editFormState.name,
      startDate: this.props.editFormState.startDate,
      startMonth: this.props.editFormState.startMonth,
      startTime: this.props.editFormState.startTime,
      dueDate: this.props.editFormState.dueDate,
      dueMonth: this.props.editFormState.dueMonth,
      completed: this.props.editFormState.completed
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


