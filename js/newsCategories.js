const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}

const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        // console.log(category);
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('nav-item');
        categoryLi.innerHTML = `
        <a class="nav-link fs-6 fw-semibold text-dark" aria-current="page" onclick="loadCategoryDetails(${category.category_id})" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryLi);
    });
}

const loadCategoryDetails = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryDetails(data.data))
}

const displayCategoryDetails = categories => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    categories.forEach(category => {
        console.log(category);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-5">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${category.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-7 d-flex align-items-center ">
                        <div class="card-body">
                            <h4 class="card-title fw-bold">${category.title}</h4>
                            <p class="card-text">${category.details.slice(0, 250)}...</p>
                            <div class="row g-2">
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="p-3 ">
                                        <div class=" d-flex">
                                            <img style="height: 50px;width: 50px;" class="img-fluid" src="${category.author.img}" alt="">
                                            <div class="ps-3">
                                                <h6>${category.author.name}</h4>
                                                    <p>${category.author.published_date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="p-3">
                                        <div class=" text-center">
                                            <p><span><i class="fa-regular fa-eye pe-2"></i></span>${category.total_view}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="p-3">
                                        <div class=" text-center">
                                            <span><i class="fa-solid fa-arrow-right"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}

loadCategories();