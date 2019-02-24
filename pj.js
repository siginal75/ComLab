var student_list = [[],[],[]];
var code_list = [[],[],[]];
var pw_list = [[],[],[]];
var current_part = 0;
var maxSeats = 40; // 나중에 실시간 로딩으로 수정

function part_set(part){

  // current_part의 값이 id="part_n"의 part_set(k=n-1)의 인자인 k이므로 k+1을 해야 n이 됨
  document.getElementById("part_"+String(current_part+1)).style.color = "#bfbfbf";
  for(var i=0;i<student_list[current_part].length;i++){
    document.getElementById("booker").removeChild(document.getElementById(String(student_list[current_part][i])+"-"+String(code_list[current_part][i])));
  }

  current_part = part;
  document.getElementById("part_"+String(current_part+1)).style.color = "#000000";
  for(var i=0;i<student_list[current_part].length;i++){
    var lst = document.createElement("li");
    lst.id = String(student_list[current_part][i]) + "-" + String(code_list[current_part][i]);
    lst.textContent = String(student_list[current_part][i])+" - "+String(code_list[current_part][i])
    lst.style.border = "1px solid rgba(0,0,0,0.125)";
    lst.style.margin = "0 0 0.3em 0";
    document.getElementById("booker").appendChild(lst);
  }

  document.getElementById("booker_num").innerHTML = "("+student_list[current_part].length+")";

  if(student_list[current_part].length != 0){
    document.getElementById("cancel").style.color = "#000000fe";
  }
  else{
    document.getElementById("cancel").style.color = "#00000040";
  }

}

var cancel = document.getElementById("cancel");
cancel.addEventListener("click",function cancel(event){

  if(student_list[current_part].length < 1) return 'Empty List';

  who_cancel = prompt("취소할 사람의 이름이나 학생코드를 입력하십시오.");
  password_cancel = prompt("취소할 사람의 패스워드를 입력하십시오.");
  if(who_cancel.length < 6){
    index = student_list[current_part].indexOf(who_cancel);

    if(pw_list[current_part][index] != password_cancel){
      alert("패스워드가 일치하지 않습니다.");
      return 'Wrong PW';
    }

    if(index == -1){
      alert(who_cancel+"은(는) "+String(current_part+1)+"부에 신청이 되어있지 않습니다.");
      return 'NE';
    }

    document.getElementById("booker").removeChild(document.getElementById(String(student_list[current_part][index])+"-"+String(code_list[current_part][index])));

    student_list[current_part].splice(index,1);
    code_list[current_part].splice(index,1);
  }
  else if(who_cancel.length == 8){
    index = code_list[current_part].indexOf(who_cancel);

    if(pw_list[current_part][index] != password_cancel){
      alert("패스워드가 일치하지 않습니다.");
      return 'Wrong PW';
    }

    document.getElementById("booker").removeChild(document.getElementById(String(student_list[current_part][index])+"-"+String(code_list[current_part][index])));

    student_list[current_part].splice(index,1);
    code_list[current_part].splice(index,1);
  }
  if(student_list[current_part].length != 0){
    document.getElementById("cancel").style.color = "#000000fe";
  }
  else{
    document.getElementById("cancel").style.color = "#00000040";
  }

  document.getElementById("booker_num").innerHTML = "("+student_list[current_part].length+")";
  document.getElementById("term-"+String(current_part+1)).innerText = Number(document.getElementById("term-"+String(current_part+1)).innerText)-1;
  if(Number(document.getElementById("term-"+String(current_part+1)).innerText)>maxSeats) document.getElementById("term-"+String(current_part+1)).style.color = "red";
  else document.getElementById("term-"+(current_part+1)).style.color = "black";
});

var booker = document.getElementById("booker");

function register(name,code,pw){

  if(!name){
    alert("이름을 입력한 후 신청을 하십시오.");
    document.getElementById("student-name").focus();
    return 'Empty Name';
  }
  if(!code){
    alert("학생코드를 입력한 후 신청을 하십시오.");
    document.getElementById("student-code").focus();
    return 'Empty Code';
  }
  if(!pw){
    alert("패스워드를 입력한 후 신청을 하십시오.");
    document.getElementById("pw").focus();
    return 'Empty PW';
  }
  if(name.length<2){
    alert("이름을 올바르게 입력한 후 신청을 하십시오.");
    document.getElementById("student-name").focus();
    return 'Invalid Name';
  }
  if(code.length != 8){
    alert("학생코드를 올바르게 입력한 후 신청을 하십시오.");
    document.getElementById("student-code").focus();
    return 'Invalid Code';
  }
  if(pw.length < 4){
    alert("패스워드를 올바르게 입력한 후 신청을 하십시오.");
    document.getElementById("pw").focus();
    return 'Invalid PW';
  }

  for(var k=0;k<3;k++){
    if(student_list[k].indexOf(name) != -1){
      document.getElementById("student-name").value = "";
      document.getElementById("student-code").value = "";
      document.getElementById("pw").value = "";
      alert(String(k+1)+"부에 이미 신청하셨습니다.");
      return 'Overlap';
    }
  }
  for(var k=0;k<3;k++){// 왠지 없어도 될 것 같지만 확실한 이중신청 차단용임
    if(code_list[k].indexOf(code) != -1){
      document.getElementById("student-name").value = "";
      document.getElementById("student-code").value = "";
      document.getElementById("pw").value = "";
      alert(String(k+1)+"부에 이미 신청하셨습니다.");
      return 'Overlap';
    }
  }

  var index_a = student_list[current_part].push(name);
  var index_b = code_list[current_part].push(code);
  var index_c = pw_list[current_part].push(pw);

  var booker_new = document.createElement("li");
  booker_new.id = name+"-"+code;

  booker_new.textContent = String(student_list[current_part][index_a-1])+ " - " + String(code_list[current_part][index_b-1]);
  booker_new.style.border = "1px solid rgba(0,0,0,0.125)";
  booker_new.style.margin = "0 0 0.3em 0";

  booker.appendChild(booker_new);
  document.getElementById("student-name").value = "";
  document.getElementById("student-code").value = "";

  if(student_list.length != 0){
    document.getElementById("cancel").style.color = "#000000fe";
  }
  else{
    document.getElementById("cancel").style.color = "#00000040";
  }

  document.getElementById("booker_num").innerHTML = "("+student_list[current_part].length+")";

  document.getElementById("term-"+String(current_part+1)).innerText = Number(document.getElementById("term-"+String(current_part+1)).innerText)+1;
  if(Number(document.getElementById("term-"+String(current_part+1)).innerText)>40) document.getElementById("term-"+(current_part+1)).style.color = "red";
  else document.getElementById("term-"+(current_part+1)).style.color = "black";

}

function submission(events){
  if(events.keyCode === 13){
    register(document.getElementById('student-name').value,document.getElementById('student-code').value,document.getElementById('pw').value);
    document.getElementById("student-name").focus();
  }//if end
}//function end

var lists = [[],[],[]];
function getValue(){
  var term = jQuery("input[name='term-choice']:checked").val();
  if(!term){
    alert("아무것도 선택하지 않았습니다.");
    return 0;
  }
  var r=[];
  switch (term) {
    case "1":
      if(Number(document.getElementById("term-1").innerText)<=maxSeats){
        alert("추첨을 하려면 신청자가 "+String(maxSeats)+"명을 초과해야 합니다.");
        break;
      }
      if(document.getElementById("list-user-3").childElementCount>=maxSeats){
        alert("이미 추첨하셨습니다!");
        break;
      }
      for(var i=0; i<maxSeats; i++){
        var n;
        do{
          n = Math.floor(Math.random()*student_list[0].length);
        }while(r.includes(n));
        r.push(n);
        console.log(r);
      }
      for(var i=0; i<r.length; i++){
        ul = document.getElementById("list-user-1");
        new_li = document.createElement("li");
        new_li.id = String(student_list[0][r[i]]);
        new_li.style.width = "100%";
        new_li.style.border = "1px solid rgba(0,0,0,0.125)";
        new_li.style.margin = "0 0 0.3em 0";
        new_li.style.padding = "0 0 0 0";
        new_li.style.fontsize = "0.8em";
        new_li.textContent = String(student_list[0][r[i]]) + " - " + String(code_list[0][r[i]]);
        console.log(new_li);
        ul.appendChild(new_li);
      }
      break;
    case "2":
      if(Number(document.getElementById("term-2").innerText)<=maxSeats){
        alert("추첨을 하려면 신청자가 "+String(maxSeats)+"명을 초과해야 합니다.");
        break;
      }
      if(document.getElementById("list-user-3").childElementCount>=maxSeats){
        alert("이미 추첨하셨습니다!");
        break;
      }
      for(var i=0; i<maxSeats; i++){
        var n;
        do{
          n = Math.floor(Math.random()*student_list[1].length);
        }while(r.includes(n));
        r.push(n);
        console.log(r);
      }
      for(var i=0; i<r.length; i++){
        ul = document.getElementById("list-user-2");
        new_li = document.createElement("li");
        new_li.id = String(student_list[1][r[i]]);
        new_li.style.width = "100%";
        new_li.style.border = "1px solid rgba(0,0,0,0.125)";
        new_li.style.margin = "0 0 0.3em 0";
        new_li.style.padding = "0 0 0 0";
        new_li.style.fontsize = "0.8em";
        new_li.textContent = String(student_list[1][r[i]]) + " - " + String(code_list[1][r[i]]);
        console.log(new_li);
        ul.appendChild(new_li);
      }
      break;
    case "3":
      if(Number(document.getElementById("term-3").innerText)<=maxSeats){
        alert("추첨을 하려면 신청자가 "+String(maxSeats)+"명을 초과해야 합니다.");
        break;
      }
      if(document.getElementById("list-user-3").childElementCount>=maxSeats){
        alert("이미 추첨하셨습니다!");
        break;
      }
      for(var i=0; i<maxSeats; i++){
        var n;
        do{
          n = Math.floor(Math.random()*student_list[2].length);
        }while(r.includes(n));
        r.push(n);
        console.log(r);
      }
      for(var i=0; i<r.length; i++){
        ul = document.getElementById("list-user-3");
        new_li = document.createElement("li");
        new_li.id = String(student_list[2][r[i]]);
        new_li.style.width = "100%";
        new_li.style.border = "1px solid rgba(0,0,0,0.125)";
        new_li.style.margin = "0 0 0.3em 0";
        new_li.style.padding = "0 0 0 0";
        new_li.style.fontSize = "14px";
        new_li.textContent = String(student_list[2][r[i]]) + " - " + String(code_list[2][r[i]]);
        console.log(new_li);
        ul.appendChild(new_li);
      }
      break;
    default:
      break;
  }
}

var searcher = document.getElementById("search-content");
searcher.addEventListener("keydown",function search(event){
  if(event.keyCode != 13) return 0;
  var st_name,st_code,st_when;
  var random_users = [];
  var user_searched;
  user_searched = document.getElementById("search-content").value;
  if(!user_searched) return 0;
  random_users.push(document.getElementById("list-user-1").children);
  random_users.push(document.getElementById("list-user-2").children);
  random_users.push(document.getElementById("list-user-3").children);
  if(random_users[0].length < maxSeats&&random_users[1].length < maxSeats&&random_users[2].length < maxSeats){
    alert("추첨을 하지 않아 검색을 할 수 없습니다.");
    document.getElementById("search-content").value = "";
    return "Not Begin";
  }
  search:{
    for(var i=0;i<3;i++){
      if(random_users[i].length < maxSeats) continue;
      for(var j=0;j<maxSeats;j++){
        if(random_users[i][j].textContent.search(user_searched) != -1){
          var result = random_users[i][j].textContent.split(" ");
          st_name = result[0];
          st_code = result[2];
          st_when = i;
          console.log("Found "+String(st_name)+"-"+String(st_code)+" in part "+String(st_when+1));
          break search;
        }//if
      }
    }//for
    st_name = "NotFound";
    st_code = "00000000";
    st_when = -1;
    break search;
  }
  switch (st_when) {
    case -1:
      alert(user_searched+"은(는) 추첨에 당첨되지 않았습니다.");
      break;
    case 0:
    case 1:
    case 2:
      alert(String(st_name)+"은(는) "+String(st_when+1)+"부에 당첨되었습니다.");
      break;
  }
  document.getElementById("search-content").value = "";
});
var search_submit = document.getElementById("search-submit");
search_submit.addEventListener("click",function search(event){
  var st_name,st_code,st_when;
  var random_users = [];
  var user_searched;
  user_searched = document.getElementById("search-content").value;
  if(!user_searched) return 0;
  random_users.push(document.getElementById("list-user-1").children);
  random_users.push(document.getElementById("list-user-2").children);
  random_users.push(document.getElementById("list-user-3").children);
  if(random_users[0].length < maxSeats&&random_users[1].length < maxSeats&&random_users[2].length < maxSeats){
    alert("추첨을 하지 않아 검색을 할 수 없습니다.");
    document.getElementById("search-content").value = "";
    return "Not Begin";
  }
  search:{
    for(var i=0;i<3;i++){
      if(random_users[i].length < maxSeats) continue;
      for(var j=0;j<maxSeats;j++){
        if(random_users[i][j].textContent.search(user_searched) != -1){
          var result = random_users[i][j].textContent.split(" ");
          st_name = result[0];
          st_code = result[2];
          st_when = i;
          console.log("Found "+String(st_name)+"-"+String(st_code)+" in part "+String(st_when+1));
          break search;
        }//if
      }
    }//for
    st_name = "NotFound";
    st_code = "00000000";
    st_when = -1;
    break search;
  }
  switch (st_when) {
    case -1:
      alert(user_searched+"은(는) 추첨에 당첨되지 않았습니다.");
      break;
    case 0:
    case 1:
    case 2:
      alert(String(st_name)+"은(는) "+String(st_when+1)+"부에 당첨되었습니다.");
      break;
  }
  document.getElementById("search-content").value = "";
});

var searcher_e = document.getElementById("entire-searcher");
searcher_e.addEventListener("keydown",function search_all(event){
  if(event.keyCode != 13) return 0;
  var st_name, st_code, st_when;
  var student_searched;
  student_searched = document.getElementById("entire-searcher").value;
  searcher:{
    for(var i=0;i<3;i++){
      for(var j=0;j<student_list[i].length;j++){
        if(String(student_list[i][j]) == student_searched){
          st_name = student_list[i][j];
          st_code = code_list[i][j];
          st_when = String(i+1);
          console.log(st_name+"-"+st_code+" is found in "+st_when);
          break searcher;
        }
      }
    }
    st_name = "NotFound";
    st_code = "00000000";
    st_when = "-1";
    break searcher;
  }//searcher label
  switch (st_when) {
    case "-1":
      alert(student_searched+"은(는) 멀티미디어실을 신청하지 않았습니다.");
      break;
    case "1":
    case "2":
    case "3":
      alert(student_searched+"은(는) "+st_when+"부에 신청했습니다.");
      break;
  }
  document.getElementById("entire-searcher").value = "";
});
var searcher_e_submit = document.getElementById("entire-searcher-submit");
searcher_e_submit.addEventListener("click",function search_all(event){
  var st_name, st_code, st_when;
  var student_searched;
  student_searched = document.getElementById("entire-searcher").value;
  searcher:{
    for(var i=0;i<3;i++){
      for(var j=0;j<student_list[i].length;j++){
        if(String(student_list[i][j]) == student_searched){
          st_name = student_list[i][j];
          st_code = code_list[i][j];
          st_when = String(i+1);
          console.log(st_name+"-"+st_code+" is found in "+st_when);
          break searcher;
        }
      }
    }
    st_name = "NotFound";
    st_code = "00000000";
    st_when = "-1";
    break searcher;
  }//searcher label
  switch (st_when) {
    case "-1":
      alert(student_searched+"은(는) 멀티미디어실을 신청하지 않았습니다.");
      break;
    case "1":
    case "2":
    case "3":
      alert(student_searched+"은(는) "+st_when+"부에 신청했습니다.");
      break;
  }
  document.getElementById("entire-searcher").value = "";
});
