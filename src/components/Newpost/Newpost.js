import React from 'react';
import {Button,TextArea,Modal,Input} from 'semantic-ui-react';
const newPost=(props)=>{
    return(
            <>
                <Modal trigger={<Button >New post</Button>}>
                    <Modal.Header>Add the post</Modal.Header>
                    <Modal.Content>
                    <Modal.Description>
                        <label><span style={{color: "red"}}>*</span>TITLE:</label><br></br>
                        <Input name="title" onChange={props.onInputChange} /><br></br><br></br>
                        <label><span style={{color: "red"}} >*</span>CONTENT:</label><br></br>
                        <TextArea rows="4" onChange={props.onInputChange} name="content" /><br></br><br></br>
                        <label><span style={{color: "red"}}>*</span>AUTHOR:</label><br></br>
                        <Input name="author" onChange={props.onInputChange} /><br></br><br></br>
                        <label>AGE:</label><br></br>
                        <Input name="age" onChange={props.onInputChange} /><br></br><br></br>
                        <Button color="grey" onClick={props.savedDataToServer}>Add</Button> 
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
            </>
    )
}

export default newPost;