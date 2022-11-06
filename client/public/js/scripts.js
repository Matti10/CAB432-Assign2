/*
    CAB432 Assignment 2

    Author: Mattias Winsen
    Date: 20/10/2022

    References:
        Start Bootstrap - Grayscale v7.0.5 (https://startbootstrap.com/theme/graysca
        Copyright 2013-2022 Start Bootst
        Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICEN
*/

// Globals
var files;
var serverAddress = 'http://n9995846-assign2-server-128342326.ap-southeast-2.elb.amazonaws.com/';


// modified from: https://stackoverflow.com/questions/34492637/how-to-calculate-md5-checksum-of-blob-using-cryptojs
function calculateMd5(blob) {
    var reader = new FileReader();
    reader.readAsBinaryString(blob);
    reader.onloadend;

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

// process data when submit button is clicked
 $("#submit").on('click',async function() {
    console.log('submit clicked');
    console.log(files);

    var convFiles;

    //generate a unique sessionID
    const d = new Date();
    sessionID = d.getTime().toString() + "-" + calculateMd5(files[0])

    files.forEach(file => {
        
        try {
            // collect img info
            var img = new Object();
            img.resize = new Object();
            img.resize.height = checkIfNull(parseInt(document.getElementById("imgHeight").value));
            img.resize.width = checkIfNull(parseInt(document.getElementById("imgWidth").value));
            img.type = checkIfNull(document.getElementById("fileType").value);
            img.rotate = checkIfNull(parseInt(document.getElementById("imgRotation").value.toIn));
            img.flip = checkIfBoolean(document.getElementById("vFlip").value);
            img.flop = checkIfBoolean(document.getElementById("hFlip").value);
            

            var req = new Object();
            req.sessionID = sessionID;
            req.key = calculateMd5(file);
            req.params = img;

            // convert to json 
            var reqJSON = JSON.stringify(req);
            
            console.log(reqJSON)

            // set button to "loading"
            document.getElementById("submit").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Converting...'

            //get S3 presigned link and upload img blob_
            console.log(reqJSON)
            convFiles += getS3Link(req.key)
            .then(uploadLink => {
                res = uploadToS3(uploadLink, file)
                console.log(res)
                console.log(uploadLink);
            })
            
            // send img config JSON to server
            downlink = uploadImgData(reqJSON).then((res) => {
                if (!res.ok){
                    console.log("Serverside error:" + res.statusText);
                    throw new Error('HTTP ' + res.status);
                } else {
                    console.log(res)
                    return res.json();
                }
                
            }).then((downloadLink) => {
                console.log(downloadLink.url)
                //download files and reset form
                document.getElementById("buttonDiv").innerHTML = '<a href ="' + downloadLink.url + '" style="background-color: green" class="btn btn-green btn-lg btn-block mt-25" id="download">Conversion Complete, Click here to download images</a><a  style="background-color: green" class="btn btn-red btn-lg btn-block mt-25" id="reset" onclick="location.reload()">Click here to restart</a>'

                return downloadLink

            })
        }
        catch(err){
            document.getElementById("buttonDiv").innerHTML = '<a  style="background-color: green" class="btn btn-red btn-lg btn-block mt-25" id="reset" onclick="location.reload()">Something went wrong! Click here to restart</a>'
        }
        

    });

});

function checkIfNull(value)
{
    if (value == "")
    {
        return null
    }
    return value
}

function checkIfBoolean(value)
{
    if (value == "on")
    {
        return true;
    }
    return false;
}

// get a presigned s3 link to send the image blob too
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

// uploads the image 'blob' to the backend
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

// uploads the image transformation to the backend
async function uploadImgData(data)
{
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const response = await fetch(serverAddress + "/transform", {
        method: 'POST',
        headers: headers,
        body: data
    });

    return response
}


// Hits the backend's download endpoint to download a converted image
async function getProcessedImg(id)
{
    const headers = new Headers({ 'Accept': '*/*' });
    address = serverAddress + "/download/signedUrl/" + id;
    response = await fetch(address, {
        method: 'GET',
        headers: headers,
    })
    .then((res) => {
        return res.text()
    })
    
   return response
}
