const validation=(postdata)=>{
    let isValid = true;
    console.log(postdata);
    if (postdata.title !== '' && postdata.content !== '' && postdata.author !== '' ) {
        return isValid;
    }

  
}
export default validation
