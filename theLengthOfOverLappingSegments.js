function solution(lines) {
  let count = {}; // 숫자별로 몇 번 나왔는지 저장
  let answer = 0; // 겹치는 길이를 저장한 변수

  // 1️⃣ 선분 하나씩 처리
  for (let i = 0; i < lines.length; i++) {
    //lines 배열을 처음부터 끝까지 순회
    let start = lines[i][0]; //선분 시작
    let end = lines[i][1]; // 선분 끝

    // 2️⃣ 선분 안의 숫자 하나씩 확인
    for (let x = start; x < end; x++) {
      //선분 안의 모든 구간을 하나씩 확인 , 끝점 구간은 길이가 없음 그래서 x<end
      if (count[x] === undefined) {
        //아직 한 번도 이 구간을 지난 선분이 없다
        count[x] = 1; //그러면 한번 지나감
      } else {
        count[x]++; // 이미 지나간 구간이라 값이 있음
      }
    }
  }

  // 3️⃣ 2번 이상 겹친 구간 세기
  for (let key in count) {
    if (count[key] > 1) {
      //2번 이상 겹쳤는지
      answer++; //겹쳤으면 +1
    }
  }

  return answer; //겹친 구간의 총 길이
}
