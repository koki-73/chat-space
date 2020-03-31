$(function(){
  function addUser(user) {
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>
                `;
    $("#user-search-result").append(html)
  }

  function  noUser(){
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
    $("#user-search-result").append(html)
  }

  function  addUserToMember(user_name, user_id){
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value=${user_id}>
              <p class='chat-group-user__name'>${user_name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $('#chat-group-users').append(html)
  }

  $("#user-search-field").on('keyup', function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input },
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach( function( user ) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        noUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    })
  })
  $(document).on('click', ".chat-group-user__btn--add", function(){
    var user_name = $(this).data('user-name');
    var user_id = $(this).data('user-id');
    $(this).parent().remove();
    addUserToMember(user_name, user_id)
  })
  $(document).on('click', ".js-remove-btn", function(){
    $(this).parent().remove();
  })

  
})