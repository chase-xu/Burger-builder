import React, {Component} from 'react';
import Button from '../../../components/UI/Buttons/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinners/Spinners';

class ContactData extends Component {
    state={
        name: "",
        email: '',
        address: {
            street: '',
            postCode: '',
        },
        loading: false,

    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max',
                address: {
                    street: '777 Javascript Pl',
                    zipCode: '777',
                    city: 'Vancouver',
                    country: 'Canada',
                },
                phone : '777-7777',
                email: 'burger@van.com',

            },
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json', order)
            .then(response => {this.setState({loading: false, });
            this.props.history.push('/');
        })
            .catch(error=> this.setState({loading: false, }));
    }
    render(){
        let form =(
            <form>
                <input className={styles.Input}type="text" name="name" placeholder="Your name" />
                <input className={styles.Input}type="email" name="email" placeholder="Your email" />
                <input className={styles.Input}type="text" name="street" placeholder="Street" />
                <input className={styles.Input}type="text" name="Postal" placeholder="Postal Code" />
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