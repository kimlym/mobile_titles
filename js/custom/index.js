var categories = [];
var subCategories = [];
var toLoad = [];

$(document).one('ready',function(){
  loadJson();
  $("#panels").sortable({
    revert: true
  });
});

$(document).ready(function() {
  $("#config").click(function(){
    loadChecked();
    $("#form").fadeOut("slow");
  });
  $("#option").click(function(){
    $("#form").fadeIn("slow");
  });

});

// make the ajax call in here
function loadJson(){
  $.ajax({
    url: "js/json/tiles.json",
    method: "GET",
    dataType: 'json',
    success: function(data) {
      loadForm(data);
    },
    error: function(error) {
      console.log(error);
    }
  });
};

function loadForm(data){
  //load form
  var count =0;
  toLoad=[];
  for (x of data.Tiles) {
      categories.push(x);

      if(x.SubCategory!=undefined){
        for(y of x.SubCategory){
          subCategories.push(y.Id);
        }
      }
  }
  for(x of categories){
    if(subCategories.indexOf(x.Id)!=-1){
      delete categories[categories.indexOf(x)];
    }
  }

  for(x of categories){
    if(x!=undefined){
      $("#panels").append("<div class='panel-body'><div class='checkbox-inline'><input type='checkbox' id='checkbox"+count+"' value='"+x.Caption+"'><label for=''>"+x.Caption+"</label><div class='glyphicon glyphicon-align-justify drag'></div></div></div>");
    }
    count++;
  }
  console.log(categories);
  console.log(count);

  $("input[type=checkbox]").prop('checked',true);
  loadChecked();
};

//determine which checkbox are checked
function loadChecked(){
  toLoad=[];
  $("input[type=checkbox]").each(function(i,obj){
    var str = obj.id.substring(8,obj.id.length);
    var id = Number(str);
    if(obj.checked==true){
      toLoad.push(categories[id]);
    }
  });
  loadPictures();
};

function loadPictures(){
  //load pictures
  $("#content").empty();
  for (x of toLoad) {
      if(x!=undefined){
        var ext = x.TileProperties.HomeURL.split('.').pop();
        if(ext=="html"){
          $("#content").append("<div class='gallery'><iframe src="+x.TileProperties.HomeURL +"></iframe><p class='caption'>"+x.Caption+"</p></div>");
        }else{
          $("#content").append("<div class='gallery'><img src="+x.TileProperties.HomeURL +"><p class='caption'>"+x.Caption+"</p></div>");
        }
      }
  }
};
