const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj); //optionsobject defines the kind of request
        if (!response.ok) throw Error('Please reload the app'); //state of application may not be in sync with DB cause we may have failed to update or get data we need
    } catch (err) {
        errMsg = err.message;
    } finally {
        //will either be null or with a message
        return errMsg;
    }
}

export default apiRequest;