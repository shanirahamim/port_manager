
import React, { useEffect, useState } from 'react';
import './VesselArrivedForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container, Form } from 'reactstrap';
import * as actions from '../../actions/vessels.actions';
import { useDispatch, useSelector } from 'react-redux';

const VesselArrivedForm = ({  }) => {
    const [veeselArrivedForm, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const vessels = useSelector(state => state.vessels);    
    const dispatch = useDispatch();

    const submitArrived = (e) => {
        e.preventDefault();
        dispatch(actions.registerArrived(veeselArrivedForm));       
    }

    useEffect(() => {
        console.log(vessels);
        if(vessels.waiting){
            setLoading(true);
        }else{
            setLoading(false);
            if(vessels.updated && vessels.veessel){
                setForm({});
            }
        }
    }, [vessels]);


    let content;

    if(loading){
        content = (<div >loading...</div>);
    }else{
        content = (<Form onSubmit={submitArrived}>
        
            <input type="text" onChange={(e) => {
                setForm({ ...veeselArrivedForm, name: e.target.value})
            }}></input>
            <Button >arrived</Button>
        </Form>)
    }

    return (<div className="form-arrived">        
        {content}
    </div>);
};


export default VesselArrivedForm;