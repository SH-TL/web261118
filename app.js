// app.js : 영화 배열을 다루는 함수 6개 / 정승현(25) / 12주차 
// average : 영화 배열 ⇒ 평균 평점(숫자) 

//입력
function average(list) {
    let sum = 0;
    for (const m of list) {
        sum += m.rating;
    }
    return sum / list.length;
}
//출력   
console.log("평균:", average(movies));

//입력
function best(list) {
    let top = list[0];
    for (const m of list) {
        if (m.rating > top.rating) {
            top = m;
        }
    }
    return top;
}
//출력
console.log("최고", best(movies).title);

//입력
const filterByRating = (list, min) => {
    return list.filter(m => m.rating >= min);
}
//출력
console.log("8점 이상:", filterByRating(movies, 8).length + "편");

// sortBy : 영화 배열, 키 이름, 내림차순 여부 ⇒ 정렬한 새 배열(원본은 그대로) 
const sortBy = (list, key, desc) => {
    const copy = [...list];
    copy.sort((a, b) => {
        if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
        return a[key] - b[key];
    });
    if (desc) copy.reverse();
    return copy;
}
// applySort : 선택 상자 값으로 정렬해서 다시 그리기(반환값 없음) 
const applySort = () => {
    renderCards(getView());
}

//입력
function yearsSince(dateStr) {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
}
//출력
console.log(yearsSince(movies[0].date) + "년 전 개봉");

//입력
function posterUrl(path, size) {
    return "https://image.tmdb.org/t/p/" + size + path;
}
//출력
console.log(posterUrl(movies[0].poster, "w342"));

// renderCards : 영화 배열 ⇒ 보드에 카드 생성(반환값 없음) 
const renderCards = (list) => {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        if (m.rating >= 8) {
            card.classList.add("hot");
        }
        card.innerHTML = ` 
      <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터"> 
      <span class="badge">${m.rating}</span> 
      <div class="info"> 
        <h2>${m.title}</h2> 
        <p class="year">${m.year}</p> 
        <button class="like" type="button">♥</button>
      </div>`;
        board.appendChild(card);

        document.querySelector("#count").textContent = list.length + "편";
        updateLikeCount();
        if (list.length === 0) { 
            board.classList.add("is-empty"); 
        } 
        else { 
            board.classList.remove("is-empty");
        }
    }
}
applySort();

document.getElementById("q").addEventListener("input", (e) => {
    renderCards(getView());
});

document.getElementById("sort").addEventListener("change", applySort);

function getView() {
    const keyword = document.getElementById("q").value.trim().toLowerCase();
    const found = movies.filter(m => m.title.toLowerCase().includes(keyword));
    const key = document.getElementById("sort").value;
    return sortBy(found, key, key !== "title");
}

//function (e)는 this가 보드 섹션, e.target은 실제로 누른 하트
//화살표는 this가 window객체, e.target은 하트 버튼
document.querySelector(".board").addEventListener("click", (e) => {
    if (e.target.classList.contains("like")) { e.target.classList.toggle("liked"); updateLikeCount(); }
})

function updateLikeCount() {
    document.getElementById("likeCount").textContent =
        document.querySelectorAll(".liked").length;
}

document.getElementById("q").addEventListener("keydown", (e) => { if (e.key === "Escape")
{ e.target.value = ""; renderCards(getView()); } });
