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


window.onload = function(){
  
  var see_all_students = document.getElementById("allStudents");
  see_all_students.addEventListener("click", all_students);
  function all_students() {
    var js_req = new XMLHttpRequest;
    js_req.addEventListener("load", function() {
      document.getElementById("results").innerHTML = this.response;
    });
    js_req.open("get","http://localhost:4567/students");
    js_req.send();
  }
  
  var create_new_student = document.getElementById("newStudent");
  create_new_student.addEventListener("click", new_student_form);
  function new_student_form() {
    var 
      l1 = "<form id='new_student_form' action='javascript:void(0)' method='post'>";
      l2 = "<label for 'student_name'>Enter student information:</label><br>";
      l3 = "<input id='student_name' name='name' value='Name'><br>";
      l4 = "<input id='student_age' name='age' value='Age'><br>";
      l5 = "<input id='student_github' name='github' value='Github Username'><br>";
      l6 = "<input type='submit' value='Submit'>";
      l7 = "</form>";
      full_form = l1+l2+l3+l4+l5+l6+l7;
    document.getElementById("results").innerHTML = full_form;
    var form = document.getElementById("new_student_form");
    form.addEventListener("submit", new_student_info);
    
    function new_student_info() {
      var new_s_req = new XMLHttpRequest;
      new_s_req.open("post", "/students/new");

      var formElement = document.getElementById("new_student_form");

      var formdata = new FormData(formElement);
      new_s_req.send(formdata);
      
      new_s_req.addEventListener("load", function() {
        console.log(formdata);
        document.getElementById("results").innerHTML = new_s_req.response;
      });
      
    }
  }
  
  var edit_student_info = document.getElementById("editStudent");
  edit_student_info.addEventListener("click", edit_student);
  function edit_student() {
    var list = student_list();
    function student_list() {
      var js_req = new XMLHttpRequest;
      var tr = ""

      js_req.open("get","http://localhost:4567/students");
      js_req.send();
      js_req.addEventListener("load", function() {
        console.log(this.response);
        list = JSON.parse(this.response);
        console.log(tr);
        return tr;
      });
      
      console.log(tr);
      return tr;
    };
    console.log(list);
    var drop_list = ["<form id='select_edit_student' action='javascript:void(0)', method='post'>"];
    drop_list.push("<select name='student'>");
    console.log(drop_list);
    //list.forEach
    //var numbers = [1, 4, 9];
    // var drop_list = list.map(function(s_hash) {
    //   var nom = "<option value="+s_hash.id+">"+s_hash.name+"</option>";
    //   console.log(nom);
    // });
  };
  
// <form action="/set_state" method="post">
//     <select name="state">
//     <% @state_list.each do |s| %>
//       <option value= <%= s %> > <%= s %> </option>
//     <% end %>
//     </select>
//     <% if params["surfeit"] %>
//       <input type="hidden" name="surfeit" value="yes">
//     <% end %>
//     <input type="submit" value="Submit">
// </form>
  
  var drink_check = document.getElementById("student-drink?");
  drink_check.addEventListener("click", student_drink);
  function student_drink() {
    var js_req = new XMLHttpRequest;
    var id = prompt("Enter student ID:")
    js_req.addEventListener("load", function() {
      document.getElementById("results").innerHTML = display_one(JSON.parse(this.response));
    });
    js_req.open("get","http://localhost:4567/students/can_drink/"+id);
    js_req.send();
  }
  
  var wise_student = document.getElementById("student-wise?");
  wise_student.addEventListener("click", student_wise);
  function student_wise() {
    var js_req = new XMLHttpRequest;
    var id = prompt("Enter student ID:")
    js_req.addEventListener("load", function() {
      document.getElementById("results").innerHTML = display_one(JSON.parse(this.response));
    });
    js_req.open("get","http://localhost:4567/students/ultra_wise/"+id);
    js_req.send();
  }
  
  function display_one(r) {
    var array = ["<ul list-style='none'>"];
    array.push("<li><b>ID: </b>"+r["id"]+"</li>");
    array.push("<li><b>Name: </b>"+r["name"]+"</li>");
    array.push("<li><b>Age: </b>"+r["age"]+"</li>");
    array.push("<li><b>Github: </b>"+r["github"]+"</li>");
    if (r["can_drink"]) {
      var drink = "<li>"+r["name"]+" can drink.</li>";
    } else {
      var drink = "<li>"+r["name"]+" can't drink.</li>";
    }
    array.push(drink);
    if (r["is_wise"]) {
      array.push("<li>"+r["name"]+" is wise.</li>");
    } else {
      array.push("<li>"+r["name"]+" is not yet wise.</li>");
    }
    array.push("</ul>")
    var ret = array.join(" ");
    return ret;
  };

}

// }
//
// function display_many(r) {
//   // r is an array of hashes
//   // {"id":1,
//   // "name":"Skyler Sidner",
//   // "age":2345,
//   // "github":"http://github.com/MalevolentDragon",
//   // "can_drink":true,
//   // "is_wise":true}
// }