
  var getLocationPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.LOCATION);
    if(status!=='granted'){
      console.log("PERMISSIONS NOT GRANTED!");
      setErrorMsg('PERMISSIONS NOT GRANTED')
    }
    else{
      console.log("PERMSION GRANTED")
    }
  }
  export {getLocationPermissions}
