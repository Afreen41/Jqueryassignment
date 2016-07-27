$(document).ready(function(){

$.ajax({
	 url: "http://localhost:8080/users",
	dataType:'json',
	success:function(data){
		for(var i=0;i<data.length;i++)
		{
			var temp='<tr><td>'+data[i].id+
			          '</td><td>'+data[i].name+
			          '</td><td>'+data[i].gender+
                '</td><td>'+data[i].company+
                '</td><td>'+data[i].email+
                '</td><td>'+data[i].phone+

   			          '</td><td>'+'<button class= "btn btn-danger" type="submit" id="btn1"> delete</button>' + ' ' +
   			          '<a href="#myModal1" role="button" class="btn btn-warning" id="btn2" data-toggle="modal">edit</a>'+'</td></tr>';
   			 $('table').append(temp);         
        }
       }
   });

//delete record

$("#ta1").on('click','#btn1',function(){
  var a= $('td:first',$(this).parents('tr')).text();
  var obj = $(this);
  console.log(a.trim());
$.ajax({
  type:"delete",
  url:'http://localhost:8080/users/'+a.trim(),
  dataType:"json", 
  success:function(list){
      alert("user has been deleted ");
      obj.closest('tr').remove();

    }
    
       });

   });

//adding data in modal

$("#row2").on('click','#add', function(){
  $("#savebtn").click(function(){
    var user = {
            
               "name": $('#name1').val(),
               "gender": $('#gender1').val(),
               "company": $('#company1').val(),
               "email": $('#email1').val(),
               "phone": $('#phone1').val()
           }    

  
$.ajax({
  method:"post",
  url:'http://localhost:8080/users',
  data:JSON.stringify(user),
  contentType:'application/json',
  success:function(data){
    alert("added successfully");
    location.reload();
  }
})

});
});

//Editing data
 $("#ta1").on('click','#btn2',function(){
         var a = $('td:first', $(this).parents('tr')).text();
          $.ajax({
                method: "GET",
                url: 'http://localhost:8080/users/'+ a.trim(),
                //type: 'post',
                dataType: 'json',
                success: function(data) {
                  $('#id2').val(data.id),
                  $('#name2').val(data.name),
                  $('#gender2').val(data.gender),
                  $('#company2').val(data.company),
                    $('#email2').val(data.email),
                    $('#phone2').val(data.phone)
                                    },
                                    
            });
      
      });

        $("#savebtn1").click(function() {
            
            var user = {
                "id":$('#id2').val(),
                "name": $('#name2').val(),
                "gender": $('#gender2').val(),
                "company":$('#company2').val(),
                "email":$('#email2').val(),
                "phone":$('#phone2').val()
            }
            $.ajax({
                method: "PATCH",
                url: 'http://localhost:8080/users/'+$('#id2').val(),
                //type: 'post',
                data: JSON.stringify(user),
                contentType: 'application/json',
                success: function(data) {
                    alert("updated successfully");
                    location.reload();
                }
            })
            


        });

});

