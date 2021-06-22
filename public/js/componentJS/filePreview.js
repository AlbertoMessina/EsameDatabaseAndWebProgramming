window.onload = function(){
        
    //Check File API support
    if(window.File && window.FileList && window.FileReader)
    {
        let filesInput = document.querySelector("#inputImgs");
        
        filesInput.addEventListener("change", function(event){
            
            filePreview(event, '#imgThumbnailPreview');

        });

        //preview for update
        let filesUpdate = document.querySelector('#updateImgs');

        filesUpdate.addEventListener("change", function(event){

            filePreview(event, '#imgThumbnailPreviewUpdate');

        });
    }
    else
    {
        alert("Your browser does not support File API");
    }
}

function filePreview(event ,idElement){
    let files = event.target.files; //FileList object
    let output = document.querySelector(idElement);
    output.innerHTML = "";
    if(files.length > 4){
        alert("Max 4 file");
        return;

    } 
    for(let i = 0; i< files.length; i++)
    {
        let file = files[i];
        
        //Only pics
        if(!file.type.match('image'))
          continue;
        
        let picReader = new FileReader();
        
        picReader.addEventListener("load",function(event){
            
            let picSrc = event.target.result;
            
            let imgThumbnailElem = "<div class='imgThumbContainer'><div class='IMGthumbnail' ><img  src='" + picSrc + "'" +
                    "title='"+file.name + "'/>";
            
            output.innerHTML = output.innerHTML + imgThumbnailElem;            
       
        });                
         //Read the image
        picReader.readAsDataURL(file);
    }                               
   
} 