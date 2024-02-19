let SERVER = process.env.REACT_APP_SERVER || '.';

if(SERVER === '.'){
    SERVER = window.location.origin
}

export default SERVER
