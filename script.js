let posts = [{
    'author': 'Nordbayern',
    'image': 'img/Feuerwehr.jpg',
    'description': 'Hochhaus in Nürnberg wegen Brand evakuiert - fünf Personen verletzt.',
    'location': 'Nürnberg:',
    'text': 'Die Einsatzkräfte hatten die Flammen schnell unter Kontrolle... '
},

{
    'author': 'Die Welt',
    'image': 'img/Schnellladepark.jpg',
    'description': 'Stress an der Ladesäule? Diese Details sollten E-Auto-Fahrer beachten.',
    'location': 'Deutschland:',
    'text': 'Die vielleicht größte Umstellung vom Verbrenner auf ein Elektroauto ist das Aufladen...'
},

{
    'author': 'Computerworld',
    'image': 'img/Security.jpg',
    'description': 'Mehr als 50 Behörden wollen Cyberangriff simulieren.',
    'location': 'Germany:',
    'text': 'Was passiert, wenn Hacker versuchen, Regierung und Verwaltung in Deutschland lahmzulegen...'
}
];

let comments = JSON.parse(localStorage.getItem("comments")) || [];

for (let i = 0; i < posts.length; i++) {

    comments.push([]);
}


function saveCommentsToLocalStorage() {
    localStorage.setItem("comments", JSON.stringify(comments));
}


function show() {
    document.getElementById('postcontainer').innerHTML = ``;

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        document.getElementById('postcontainer').innerHTML += `
    <div class="postBox">
        <div><h3>${post['author']}</h3></div>
        <div><h4>${post['location']}</h4></div>
        <img src="${post['image']}">
        <div><h4>${post['description']}</h4></div>
        <div><p>${post['text']}</p></div>
        <div class="like-icon" id="like${i}" onclick="changeLikeColor(${i})">👍</div> 
        <textarea class="add" name="Kommentar" id="comment${i}" placeholder="Kommentar"></textarea>
        <button class="comentButton" onclick="addComment(${i})">Speichern</button>
        <p>Meine Komentare:</p>
        <div class="comment" id="commentSection${i}"></div>
    </div>
    `;
    }
}


function reloadPage() {
    location.reload();
}


function changeLikeColor(i) {
    const heart = document.getElementById(`like${i}`);
    const currentColor = heart.style.backgroundColor;

    if (currentColor === 'red' || currentColor === '') {
        heart.style.backgroundColor = 'green';
    } else if (currentColor === 'green') {
        heart.style.backgroundColor = 'red';
    }
}


function addComment(postIndex) {

    const commentField = document.getElementById(`comment${postIndex}`);
    const commentText = commentField.value;

    if (commentText.trim() !== '') {
        const comment = {
            id: Date.now(),
            text: commentText
        };

        comments[postIndex].push(comment);

        commentField.value = '';

        showComments(postIndex);

        saveCommentsToLocalStorage();
    }
}


function deleteComment(postIndex, commentId) {

    const commentIndex = comments[postIndex].findIndex(comment => comment.id === commentId);

    if (commentIndex !== -1) {
        comments[postIndex].splice(commentIndex, 1);

        saveCommentsToLocalStorage();

        showComments(postIndex);
    }

}


function showComments(postIndex) {

    const commentSection = document.getElementById(`commentSection${postIndex}`);

    commentSection.innerHTML = '';

    for (let i = 0; i < comments[postIndex].length; i++) {
        const comment = comments[postIndex][i];

        commentSection.innerHTML += `
        <p>${comment.text} <br> <button class="comentButton" onclick="deleteComment(${postIndex}, ${comment.id})">Löschen</button></p>
         `;
    }
}


function showSearchBar() {

    let searchBar = document.getElementById("searchBar");
    searchBar.style.display = "block";

    let searchButton = document.querySelector(".search-button");
    searchButton.style.display = "none";
}


function showAllComments() {

    for (let i = 0; i < posts.length; i++) {
        showComments(i);
    }
}


window.onload = function () {
    show();
    showAllComments();
};