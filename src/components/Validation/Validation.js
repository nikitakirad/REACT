const validation=(postdata)=>{
    let isValid = true;
    if (postdata.title !== '' && postdata.content !== '' && postdata.author !== '' ) {
        return isValid;
    }

  
}
export default validation
