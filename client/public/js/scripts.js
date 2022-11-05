/*!
* Start Bootstrap - Grayscale v7.0.5 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

// Globals
var files;
var serverAddress = 'http://127.0.0.1:3001';
var someString = 'some string';


// modified from: https://stackoverflow.com/questions/34492637/how-to-calculate-md5-checksum-of-blob-using-cryptojs
function calculateMd5(blob) {
    var reader = new FileReader();
    reader.readAsBinaryString(blob);
    reader.onloadend = function() { };

    return CryptoJS.MD5(reader.result).toString();
}



window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };
 
    // Shrink the navbar 
    navbarShrink();

    console.log("navbar changed");

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

$(document).on('change', '.file-input', function() {
    //update input feild
    var filesCount = $(this)[0].files.length;
    var textbox = $(this).prev();
    
  
    if (filesCount === 1) {
      var fileName = $(this).val().split('\\').pop();
      textbox.text(fileName);
      console.log("File uploaded: ");
    } else {
      textbox.text(filesCount + ' files selected');
    }
    
    files = $(this)[0].files;

});

$("#submit").on('click',function() {
    console.log('submit clicked');
    console.log(files);

    const d = new Date();
    sessionID = d.getTime().toString() + "-" + calculateMd5(files[0])

    files.forEach(file => {
        
        console.log(file);

        // collect img info
        var img = new Object();
        img.sessionID = sessionID;
        img.id = calculateMd5(file);
        img.height = document.getElementById("imgHeight").value;
        img.width = document.getElementById("imgWidth").value;
        img.type = document.getElementById("fileType").value;
        img.rotation = document.getElementById("imgRotation").value;
        img.vFlip = document.getElementById("vFlip").value
        img.hFlip = document.getElementById("hFlip").value;
       
        // convert to json 
        var ImgJSON = JSON.stringify(img);
        
        

        // set buttoin to "loading"
        document.getElementById("submit").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Converting...'

        var downloadLink = 
        
        
        //get S3 presigned link and upload img blob
        console.log(ImgJSON)
        var uploadLink = getS3Link(img.id)
        .then(uploadLink => {
            res = uploadToS3(uploadLink, file)
            console.log(res)
            console.log(uploadLink);
        })
        // .then(
        //     // send JSON to server
        //     uploadImgData(ImgJSON)
        //     .then((res) => {
        //         if (!res.ok){
        //             console.log("Serverside error:" + res.statusText);
        //             throw new Error('HTTP ' + res.status);
        //         } else {
        //             console.log(res.json())
        //         }
                
        //     })
        // )
        .then(() => {            
            return getProcessedImg(img.id)
        })
        .then((downloadLink) => {
            console.log(downloadLink)
            //download files and reset form
            document.getElementById("buttonDiv").innerHTML = '<a href ="' + downloadLink + '" style="background-color: green" class="btn btn-primary btn-lg btn-block mt-25" id="download" <!--target=”_blank” onclick="location.reload()"-->>Conversion Complete, Click here to download images</a>'

        })

    });

});


async function getS3Link(checksum)
{
    address = serverAddress + "/upload/signedUrl/" + checksum;
    headers = new Headers({ 'Accept': '*/*'});
    const response = await fetch(address)
        .then((res) => {
            if (!res.ok){
                console.log("Serverside error:" + res.statusText);
                throw new Error('HTTP ' + res.status);
            } else {
                return res.json()
            }
        })

    console.log(response)

    return response.url
}

async function uploadToS3(URL, file)
{
    const headers = new Headers({ 'Content-Type': 'image/*' });
    const response = await fetch(URL, {
        method: 'PUT',
        headers: headers,
        body: file
    });

    return response
}

async function uploadImgData(data)
{
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const response = await fetch(serverAddress + "/upload", {
        method: 'PUT',
        headers: headers,
        body: data
    });

    return response
}

async function getProcessedImg(sessionID)
{
    const headers = new Headers({ 'Accept': '*/*' });
    address = serverAddress + "/download/signedUrl/" + sessionID;
    response = await fetch(address, {
        method: 'GET',
        headers: headers,
    })
    .then((res) => {
        return res.text()
    })
    
   return response
}
