let SERVER = process.env.REACT_APP_SERVER || '.';

if(SERVER === '.'){
    console.log(window.location.origin)
    SERVER = window.location.origin
}

export default SERVER
