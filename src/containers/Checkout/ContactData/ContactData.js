import React, {Component} from 'react';
import Button from '../../../components/UI/Buttons/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinners/Spinners';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';

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
                validation: {
                    required: true,
                },
                valid: false,
                touched:false,
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched:false,

            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 6,
                    minLength: 3,
                },
                valid: false,
                touched:false,


            },
            phone : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched:false,


            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ' Your Email'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: false,
                touched:false,

            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[{value: 'normal', displayValue: 'Normal'},
                                {value: 'fastest', displayValue: 'Fastest'}],
                    placeholder: 'Deliver Method'
                },
                value: 'normal',
                valid: true,
                validation: {
                },

            }

        },
        formIsValid: false,
        loading: false,

    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let id in this.state.orderForm){
            formData[id] = this.state.orderForm[id].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
        }
        axios.post('/orders.json', order)
            .then(response => {this.setState({loading: false, });
            this.props.history.push('/');
        })
            .catch(error=> this.setState({loading: false, }));
    }

    checkValidation=(value, rules)=>{
        let isValid = true;
        // console.log(rules);
        if(rules.required){
            isValid = value.trim()!== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        console.log(isValid);
        return isValid;
    }

    inputChangedHandler=(event, id)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[id]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, 
            updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[id] = updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifiers in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement=>(
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
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

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
};
export default connect(mapStateToProps)(ContactData);