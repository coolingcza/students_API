var req = new XMLHttpRequest;
req.open("get","/students/16");
req.send();

var student = JSON.parse(req.response);
student.name = "Andrew Y";

var student_json_string = JSON.stringify(student);
var student_uri_comp = encodeURIComponent(student_json_string);

var set = new XMLHttpRequest;
set.open("get","/students/edit/?options="+student_uri_comp);
