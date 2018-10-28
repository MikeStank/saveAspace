// Below code is for the Login/Sign Up Modal
// Gets the modal
var modal = document.getElementById('id01');
// When user clicks outside of modal it will close
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}