document.getElementById('form').addEventListener('submit',saveBookmark);

function saveBookmark(e){
  //get the values
  var siteName = document.getElementById('sitename').value;
  var siteUrl = document.getElementById('siteurl').value;

  //bokmark object
  var bookmark = {
      name: siteName,
      url: siteUrl
  }

  if(!validate(siteName,siteUrl)){
      return;
  }
  if(localStorage.getItem('bookmarks') === null){
      var bookmarks = [];//JSON array of bookmarks
      bookmarks.push(bookmark);
      //string formatting of the JSON array
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  else{
      //get the string formatted array from LS and store is a JSON in a var
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      //add json object
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }

  //Reset form
  document.getElementById("form").reset();
    //Real time showing resuts after submitting 
    fetchResults();

e.preventDefault();
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<bookmarks.length;i++){
       if(bookmarks[i].url == url)
          bookmarks.splice(i,1);
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));   

    //Fetch the bookmarks again for real time deletion n showing
    fetchResults();
}

function fetchResults(){
     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
     
     var results = document.getElementById('bookmarkResults');
     results.innerHTML = '';
     for(var i=0; i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        results.innerHTML += '<div class="well">'+
                             '<h3>'+name+
                             '<a class="btn-visit" target ="_blank" href="'+url+'">Visit</a>'+
                             '<a onclick="deleteBookmark(\''+url+'\')" class="btn-delete" href="#">Delete</a>'+
                             '</h3>'+
                             '</div>';
     }
}

function validate(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert("Please enter the details");
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert("Enter a valid URL!");
        return false;
    }
    return true;
}