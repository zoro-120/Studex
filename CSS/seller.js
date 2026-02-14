document.addEventListener("DOMContentLoaded", function(){

let books = JSON.parse(localStorage.getItem("books")) || [];

const uploadBtn = document.getElementById("uploadBtn");
const sellerList = document.getElementById("sellerList");

function normalize(text){
  return text.toLowerCase().trim();
}

uploadBtn.addEventListener("click", function(){

  
  let year = document.getElementById("year").value;
  let sem = document.getElementById("sem").value;
  let subject = document.getElementById("subject").value.trim();
  let price = document.getElementById("price").value;
  let imagesInput = document.getElementById("images");
  let videoInput = document.getElementById("video");

  if( !year || !sem || !subject || !price){
    alert("Fill all fields");
    return;
  }

  if(imagesInput.files.length < 3){
    alert("Upload at least 3 images");
    return;
  }

  if(videoInput.files.length < 1){
    alert("Upload 1 video");
    return;
  }

  let imagePromises = [];
  for(let i=0; i<imagesInput.files.length; i++){
    imagePromises.push(convertToBase64(imagesInput.files[i]));
  }

  Promise.all(imagePromises).then(imageResults => {

    convertToBase64(videoInput.files[0]).then(videoResult => {

      let key = normalize(title) + year + sem + normalize(subject);

      let newBook = {
        key,
        title,
        year,
        sem,
        subject,
        price,
        stock: 1,
        images: imageResults,
        video: videoResult
      };

      books.push(newBook);

      localStorage.setItem("books", JSON.stringify(books));

      alert("Book Uploaded Successfully");

      displaySellerBooks();
    });

  });

});

function convertToBase64(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

function displaySellerBooks(){
  sellerList.innerHTML = "";

  books.forEach(book=>{
    sellerList.innerHTML += `
      <div class="seller-card">
        <h3>${book.title}</h3>
        <p>${book.year} - Sem ${book.sem}</p>
        <p>₹ ${book.price}</p>
      </div>
    `;
  });
}

displaySellerBooks();

});
