const fetchProducts = async () => {
  return await axios.get("https://pnv-team.onrender.com/posts");
};

(async () => {
  const products = await fetchProducts();

  document.getElementById("product").innerHTML = products.data
    .map((product) => {
      const discountPrice = (product.price * (100 - product.discount)) / 100;
      console.log(discountPrice);
      return `
        <div class="col-md-6 col-lg-4 col-xl-3"> 
            <div id="product-1" class="single-product">
                <div class="product-image">
                    <img src=${product.img} alt="Product Image" />
                </div>
                ${
                  product.discount
                    ? `<span class="discount">${product.discount}% off</span>`
                    : ""
                }
                ${product.new ? `<span class="new">New</span>` : ""}
                
                <div class="part-1">
                <ul>
                    <li>
                    <a href="#"><i class="bi bi-cart-fill"></i></a>
                    </li>
                    <li>
                    <a href="#"><i class="bi bi-heart-fill"></i></a>
                    </li>
                    <li>
                    <a href="#"><i class="bi bi-chat-fill"></i></a>
                    </li>
                </ul>
                </div>
                <div class="part-2">
                    <h3 class="product-title">${product.title}</h3>
                    ${
                      product.discount
                        ? `
                        <h4 class="product-old-price"> $${product.price.toFixed(
                          2
                        )}</h4>
                        `
                        : ""
                    }
               
                    <h4 class="product-price">$${discountPrice.toFixed(2)}</h4>
                </div>
            </div>
        </div>
      `;
    })
    .join("");
})();

const fileInput = document.getElementById("fileInput");
const uploading_text = document.getElementById("uploading_text");

// replace with your data 👇
const cloud_name = "dvjyivpcf";
const upload_preset = "uploadpnv";
// replace with your data 👆

fileInput.addEventListener("change", (e) => {
  uploading_text.innerText = "uploading...";
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);
  const options = {
    method: "POST",
    body: formData,
  };

  return fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.secure_url);

      uploading_text.innerHTML = `
      <span>upload complete.</span>
      <br />
      <img style="max-width:300px" src="${data.secure_url}" alt="">
      <a href="${data.secure_url}">${data.secure_url}</a>
      `;
    })
    .catch((err) => console.log(err));
});
