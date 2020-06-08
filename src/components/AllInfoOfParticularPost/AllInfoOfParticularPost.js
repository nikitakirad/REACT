import React from 'react';
import {Button,TextArea,Modal,Input} from 'semantic-ui-react';
const allinfoofparticularpost=(props)=>{
    return(
            <>
                <Modal trigger={<Button basic color='blue'>More details...</Button>}>
                    <Modal.Header>Blog</Modal.Header>
                    <Modal.Content>
                    <Modal.Description>
                        <label>TITLE:</label>
                        {props.title}<br></br><br></br>
                        <label>CONTENT:</label>
                        {props.content}<br></br><br></br>
                        <label>AUTHOR:</label>
                        {props.author}<br></br><br></br>
                        <label>AGE:</label>
                        {props.age}<br></br><br></br>
                        <Button onClick={()=>props.clicked(props.id)} basic color='green'>Edit</Button>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
            </>
    )
}

export default allinfoofparticularpost;