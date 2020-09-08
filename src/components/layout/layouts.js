import React from 'react';
import Aux from '../../hoc/Aux';
import styles from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) =>(
    <Aux>
        
        <Toolbar />

        <main className={styles.content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;