import React from 'react';
import {Button,TextArea,Modal,Input} from 'semantic-ui-react';
const editPost=(props)=>{
    return(
            <>
                <Modal trigger={<Button basic color='green'>Edit</Button>}>
                    <Modal.Header>Edit the post</Modal.Header>
                    <Modal.Content>
                    <Modal.Description>
                        <label>TITLE:</label><br></br>
                        <Input name="title" onChange={(event)=>props.onEditInput(props.id,event)} value={props.title}/><br></br><br></br>
                        <label>CONTENT:</label><br></br>
                        <TextArea rows="4" onChange={(event)=>props.onEditInput(props.id,event)} name="content" value={props.content}/><br></br><br></br>
                        <Button color="grey" onClick={()=>props.update(props.id)}>UPDATE</Button> 
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
            </>
    )
}

export default editPost;