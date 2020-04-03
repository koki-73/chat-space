$(function(){
  
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__info">
                      <div class="sender-name">
                        ${message.user_name}
                      </div>
                      <div class="send-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      <p>${message.content}</p>
                      <img src=${message.image} class="message__image">
                    </div>
                  </div>`
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__info">
                      <div class="sender-name">
                        ${message.user_name}
                      </div>
                      <div class="send-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      <p>${message.content}</p>
                    </div>
                  </div>`
    }
    return html
  }

  function reloadMessages() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-body').append(insertHTML);
        $('.main-body').animate({ scrollTop: $('.main-body')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-body').append(html);
      $('form')[0].reset();
      $('.main-body').animate({ scrollTop: $('.main-body')[0].scrollHeight});
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});