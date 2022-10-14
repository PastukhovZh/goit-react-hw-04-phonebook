import { Component, useState } from "react";
import { Form, Label, Input, Button } from "./ContactForm.styled";


export class ContactForm extends Component{
    state = {
        name: '',
        number:''
}

    handleChange = (name, number) => e => {
    const { target } = e;

    this.setState(() => ({
        [name]: target.value,
        [number]: target.value,
    }));
  };
    
    

  handleSubmit = e => {
    e.preventDefault()
const { onSubmit } = this.props;
      onSubmit(this.state);
      this.reset();
      
    
    }
    reset = () => {
        this.setState(() => ({
            name: '',
            number:''
        }))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
        <Label> Name  
            <Input
                onChange={this.handleChange('name')}
                value={this.state.name}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
                </Label>
                <Label> Number
                    <Input
                        onChange={this.handleChange('number')}
                value={this.state.number}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </Label>
                <Button type="submit">Add friend</Button>
                
        </Form>
        )
    }
}
        

// export const ContactForm = ({onSubmit}) => {
//     const [name, setName] = useState('')
//     const [number, setNumber] = useState('')


//     const handleChange = (e) => {
//         switch (e.target.name) {
//             case 'name':
//                 setName(e.target.value)
//                 break;
            
//             case 'number':
//                 setNumber(e.target.value)
//                 break;
        
//             default:
//                 return;
//         }
//     }


//     const handleSubmit = e => {
//     e.preventDefault()
// // const { onSubmit } = this.props;
// // //       onSubmit(this.state);
// // //       this.reset();
//       onSubmit(name, number)
    
//     }
//      return (
//             <Form onSubmit={handleSubmit}>
//         <Label> Name  
//             <Input
//                 onChange={handleChange}
//                 value={name}
//                 type="text"
//                 name="name"
//                 pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                 title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                 required
//             />
//                 </Label>
//                 <Label> Number
//                     <Input
//                         onChange={handleChange}
//                 value={number}
//                         type="tel"
//                         name="number"
//                         pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                         required
//                     />
//                 </Label>
//                 <Button type="submit">Add friend</Button>
                
//         </Form>)
// }