import React from 'react';
import t from 'tcomb-form';

const Form = t.form.Form;

const Person = t.struct({
  name: t.String,
  surname: t.String
});

const EditTaskForm = React.createClass({

  save() {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
  },

  render() {
    return (
      <div>
        <Form
          ref="form"
          type={Person}
        />
        <button onClick={this.save}>Save</button>
      </div>
    );
  }

});


export default EditTaskForm;


