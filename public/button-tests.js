// var edit = document.getElementById("edit-Andrew");
//
// // alert(edit);
//
// edit.onclick = editclick;
//
// function editclick() {
//   var req = new XMLHttpRequest;
//   req.open("get","/students/edit/id/16/name/Andrew Something/age/550/github/Ayolland");
//   req.send();
//
//   console.log(req.response);
// }
//
//
// var drink = document.getElementById("Andrew-drink?");
//
// drink.onclick = drinkclick;
//
// function drinkclick() {
//   var req = new XMLHttpRequest;
//   req.open("get","/students/can_drink/16");
//   req.send();
//
//   console.log(req.response);
// }

window.onload = function(){
  
  document.getElementById("allStudents").onclick = all_students;
  function all_students() {
    var js_req = new XMLHttpRequest;
    js_req.addEventListener("load", function() {
      document.getElementById("results").innerHTML = js_req.response;
    });
    js_req.open("get","http://localhost:4567/students");
    js_req.send();
  }
  
  document.getElementById("student-drink?").onclick = student_drink;
  function student_drink() {
    var js_req = new XMLHttpRequest;
    var id = prompt("Enter student ID:")
    js_req.addEventListener("load", function() {
      document.getElementById("results").innerHTML = js_req.response;
    });
    js_req.open("get","http://localhost:4567/students/can_drink/"+id);
    js_req.send();
  }
  
  document.getElementById("student-wise?").onclick = student_wise;
  function student_wise() {
    var js_req = new XMLHttpRequest;
    var id = prompt("Enter student ID:")
    js_req.addEventListener("load", function() {
      document.getElementById("results").innerHTML = js_req.response;
    });
    js_req.open("get","http://localhost:4567/students/ultra_wise/"+id);
    js_req.send();
  }
}