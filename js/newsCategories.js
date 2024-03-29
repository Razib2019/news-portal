const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('nav-item');
        categoryLi.innerHTML = `
        <a class="nav-link fs-6 fw-semibold text-dark" aria-current="page" onclick="loadCategoryDetails(${category.category_id})" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryLi);
    });
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("spinner");
    if (isLoading) {
        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add("d-none");
    }
}

const loadCategoryDetails = (category_id) => {

    // start loader
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryDetails(data.data))
        .catch(error => console.log(error))
}

const displayCategoryDetails = categories => {
    // console.log(categories);
    const totalItemFound = document.getElementById('totalItemFound');
    const itemsDiv = document.createElement('div');
    itemsDiv.classList.add = ('card-body');
    totalItemFound.innerHTML = `
        <span class="p-2">${categories.length} items found</span>
    `;
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    categories.forEach(category => {
        // console.log(category);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-5">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${category.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h4 class="card-title fw-bold">${category.title}</h4>
                            <p class="card-text">${category.details.slice(0, 250)}...</p>
                            <div class="row g-2">
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="p-3 ">
                                        <div class="d-flex align-items-center">
                                            <img style="height: 50px;width: 50px;" class="img-fluid" src="${category.author.img}" alt="">
                                            <div class="ps-3">
                                                <h6>${category.author.name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="p-3">
                                        <div>
                                            <p><span><i class="fa-regular fa-eye pe-2"></i></span>${category.total_view}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="p-3">
                                        <div>
                                            <a onclick="loadNewsDetails('${category._id}')" href="#"><span><i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#newsDetailsModal"></i></span></a>
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

    // stop loader
    toggleSpinner(false);
}

const loadNewsDetails = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(error => console.log(error))
}

const displayNewsDetails = news => {
    // console.log(news);
    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText = news.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <div class="text-center">
    <img class="pb-2" src="${news.thumbnail_url}" alt="">
    <p>Author Name: ${news.author.name ? news.author.name : 'No Author Name Found'}</p>
    <p>Published Data: ${news.author.published_date ? news.author.published_date : 'No Published Date Found'}</p>
    <p><span>Badge: ${news.rating.badge ? news.rating.badge : 'No Badge Found'}</span> || <span>Rating: ${news.rating.number ? news.rating.number : 'No Rating Found'}</span></p>
    <p>Total View: ${news.total_view ? news.total_view : 'Total View Not Found'}</p>
    </div>
    `;
}

loadCategories();