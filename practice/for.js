const letter = ['a', 'b', 'c', 'd']

//기본적인 for문
for (let i=0; i<letter.length; i++) {
    console.log(letter[i]);
}

//forEach
letter.forEach(function(f) {
    console.log(f);
});

//익명 함수로 줄이기
letter.forEach(f => console.log(f));

//for ... of
for(const f of letter) {
    console.log(f)
}