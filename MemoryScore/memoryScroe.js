function solution(name, yearning, photo) {
  let answer = []; // 점수 배열
  const map = new Map(); // 이름과 그리움 점수를 합쳐서 만든 배열

  for (i = 0; i < name.length; i++) {
    map.set(name[i], yearning[i]); //이름과 그리움 점수 저장
  }

  for (i = 0; i < photo.length; i++) {
    let score = 0;
    for (j = 0; j < photo[i].length; j++) {
      let person = photo[i][j]; // photo배열 하나씩 확인

      if (map.has(person)) {
        //이름이 있는지 확인
        score += map.get(person); // 있으면 이름에 해당하는 value를 불러와서 점수에 더함
      }
    }
    answer.push(score);
  }
  return answer;
}
