// প্রথমে আমরা সব id গুলোকে ক্যাচ করবো।  (১ম ধাপ)

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more  = document.getElementById("more");  

// এখন আমাদের api এর লিংক টি নিতে হবে ।

const apiUrl = 'https://api.lyrics.ovh';

// serachTerm নিচে আমরা নিয়েছি।এখন searchTerm কে আমরা searchSongs ফাংশন এ নিবো আর fetch অথবা async করে api থেকে data নিবো। (৩য় ধাপ)

async function searchSongs(term) {
    // fetch(`${apiUrl}/suggest/${term}`)
    // .then(res => res.json())
    // .then (data => console.log(data))

    // আমরা async ব্যবহার করেও api থেকে data নিতে পারি।এটি আরো ক্লিন ভাবে কাজ করে। শুধু মাত্র আমাদের function এর আগে async লিখতে হবে।
    const res = await fetch(`${apiUrl}/suggest/${term}`);
    const data = await res.json();
    // console.log(data); এখন আমরা data কে showData নামে ফাংশনে রাখবো (৪ র্থ ধাপ)

    showData(data);
}

// ৪ র্থ ধাপ

function showData(data) {
    // let output = '';

    // data.data.forEach(song => {
    //     output +=  `
    //     <li>
    //         <span><strong> ${song.artist.name}</strong> - ${song.title} </span>
    //         <button class = "btn" data-artist = "${song.artist.name}" data-songtitle = "${song.title}">Get Lyrics</button>
        
    //     </li>
    // `;
    // });

    // result.innerHTML =`
    //     <ul class ="songs">
    //     ${output}
    //     </ul>
    // `;

    // একি কাজটি আমরা আরো সহজে করতে পারি map দিয়ে

    result.innerHTML = `
        <ul class = "songs">
        ${data.data.map(song => `
        <li>
        <span><strong> ${song.artist.name}</strong> - ${song.title} </span>
        <button class = "btn" data-artist = "${song.artist.name}" data-songtitle = "${song.title}">Get Lyrics</button>
    
    </li>
        `)
        .join('')}
        </ul>
    `;

    // ৫ম ধাপ for pagination

    if (data.prev || data.next) {
        more.innerHTML =   `
            ${data.prev ?  `<button class = "btn" onclick = "getMoreSongs('${data.prev}')">prev</button>` : ''};
            ${data.next ?  `<button class = "btn" onclick = "getMoreSongs('${data.next}')">next</button>` : ''};
        `
    } else {
        more.innerHTML = '';
    }


};

// ৬ ষ্ঠ  ধাপ 

async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

// event listner (২য় ধাপ)

form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();
    // console.log(searchTerm); প্রথমে আমরা console.log করে দেখলাম ।এতে করে যেই ভ্যালু আমরা input এ দিবো তা console এ দেখা যাবে।

    if (!searchTerm) {
        alert('please type in a search term');
    }
    else {
        searchSongs(searchTerm);
    }
})

