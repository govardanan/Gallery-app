
 var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    
    function onDeviceReady() {

       StatusBar.overlaysWebView(true);

       StatusBar.show();


        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

   
    
    // Called when a photo is successfully retrieved
    
    function onPhotoURISuccess(imageURI) {
     
var a=imageURI;
     //alert(a);


db.transaction(function (tx) {

 tx.executeSql('INSERT INTO LOGS (log) VALUES (?)',[a]);

});
      
      retdb();
     
   
    }


   
 


   

    

    // A button will call this function
    
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail,{ quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });


    }
      

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }





function createdb()
{
  db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id integer primary key autoincrement, log TEXT)');

});
}

function retdb()
{

  db.transaction(function (tx) {

  tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
   var len = results.rows.length, i;

   //msg = "<p>Found rows: " + len + "</p>";

   imagemsg = "";
   for (i = 0; i < len; i++){       
     //msg = msg + "<p><b>" + results.rows.item(i).log + "</b></p>";
    sample=results.rows.item(i).log;
    id=results.rows.item(i).id;
     
   
     imagemsg = imagemsg + '<img id="'+id+'" src="'+sample+'" style="height:150px;width:120px;padding:4px">';
     
   }

   //$('#status').html(msg);
  $("#imgdiv").html(imagemsg);


});
});

}




 $(document).bind('pageinit', function() {
       // alert("-- lets start db --");
        createdb();
        retdb();
        
      
        

      });





