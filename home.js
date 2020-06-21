if(sessionStorage.getItem('high-score')!==null){
  document.getElementById('high-score').innerHTML = `High Score: ${sessionStorage.getItem('high-score')}`
}
else{
  document.getElementById('high-score').innerHTML = ''
}