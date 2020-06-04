import React from 'react';
import {Card,Button,Segment, Container} from 'semantic-ui-react';
import Editpost from '../Editpost/Editpost';
const allPosts=(props)=>{
        let post=<Container textAlign="center">
        <p>No posts yet</p>
        <p>Please Add The post</p></Container>;
        if(props.posts.length>0){
        post=props.posts.map(post=>(
            <>
            <Card color="black">
                <Card.Content>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Description>{post.content}</Card.Description><br></br>
                    <Button onClick={()=>props.deletepost(post.id)} 
                        basic color='red'>
                           Delete
                    </Button >
                    <Editpost title={post.title}
                    content={post.content}
                    id={post.id}
                    onEditInput={props.editpost}
                    update={props.edit}
                    />
                </Card.Content>
            </Card><br></br>
            </>
        ));
    }
    return(
        <>
            <Segment >
            <Card.Group>
                {post}
            </Card.Group>    
            </Segment>
        </>
    )
}
export default allPosts;