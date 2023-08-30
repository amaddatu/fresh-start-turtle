const isLoggedIn = (context) => {
  if(context && context.hasOwnProperty('user') && context.user.hasOwnProperty('_id')){
    return true;
  }
  return false;
}
module.exports = {
  isLoggedIn
}