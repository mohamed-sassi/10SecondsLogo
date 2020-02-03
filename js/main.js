var logo;
document.getElementById('imagesInput').addEventListener('change',function(){
    LoadImages(this)
})

document.getElementById('logoInput').addEventListener('change',function(){
    previewLogo(this)
})

function LoadImages(input){
    document.getElementById('addlogo').style.display="block"
    var files = [...input.files]
    files.forEach(im => {
        var img = document.createElement('img')
        img.src = URL.createObjectURL(im);
        img.onload = function(){
            var canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            canvas.id = im.name
            canvas.getContext('2d').drawImage(img,0,0)
            document.getElementById('images').append(canvas)
        };
        img.onerror = function(){console.log('error');}
    })
};

function previewLogo(input){
    var img = document.getElementById('logoPreview')
    img.src = URL.createObjectURL(input.files[0])
    img.onload = function(){
        logo = img
    }
}


function addLogo(){
    var canvases = document.querySelectorAll('canvas')
    for(canvas of canvases){
        canvas.getContext('2d').drawImage(logo,canvas.width - logo.width,canvas.height-logo.height)
        logo.crossOrigin="anonymous"
    }
    document.getElementById("download").style.display = "block"
}


function download(){
    var canvases = document.querySelectorAll('canvas')
    for(canvas of canvases){
        var link = document.createElement('a')
        link.download = canvas.id
        link.href = canvas.toDataURL("image/jpeg")
        link.click()
    }
}