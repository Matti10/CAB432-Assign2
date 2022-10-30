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

// modified from: https://stackoverflow.com/questions/34492637/how-to-calculate-md5-checksum-of-blob-using-cryptojs
function calculateMd5(blob) {
    var reader = new FileReader();
    reader.readAsBinaryString(blob);
    reader.onloadend = function () {
      var  hash = CryptoJS.MD5(reader.result).toString();
      console.log("MD5 Checksum", hash);
      return hash;
    };
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
    

    files.forEach(file => {
        
        console.log(file);
        console.log("test",calculateMd5(file));
        
        var img = new Object();
        img.id = calculateMd5(file);
        img.height = document.getElementById("imgHeight").value;
        img.width = document.getElementById("imgWidth").value;
        img.type = document.getElementById("fileType").value;
        img.rotation = document.getElementById("imgRotation").value;
        img.vFlip = document.getElementById("vFlip").value
        img.hFlip = document.getElementById("hFlip").value;
        
        var json = JSON.stringify(img);
        
        console.log(json)

    });




});