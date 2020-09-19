import React, {Component} from 'react';
import Button from '../../../components/UI/Buttons/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinners/Spinners';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state={
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: '',
            },
            phone : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone'
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ' Your Email'
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[{value: 'fastest', displayValue: 'Fastest'},
                                {value: 'Normal', displayValue: 'Normal'}],
                    placeholder: 'Deliver Method'
                },
                value: '',
            }
        },
        loading: false,

    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        axios.post('/orders.json', order)
            .then(response => {this.setState({loading: false, });
            this.props.history.push('/');
        })
            .catch(error=> this.setState({loading: false, }));
    }


    inputChangedHandler=(event, id)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[id]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[id] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }


    render(){

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form =(
            <form>
                {formElementsArray.map(formElement=>(
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event)=>this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;