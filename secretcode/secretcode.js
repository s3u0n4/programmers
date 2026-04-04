// 1~n 중 5개 조합 생성
function generateCombinations(n) {
  const results = []; //모든 조합을 저장할 배열
  const current = []; // 현재 만들고 있는 조합
  dfs(0, 0, n, current, results); //조합 생성 시작
  return results; //완성된 조합 배열 반환
}
//재귀로 조합을 만드는 함수
function dfs(start, depth, n, current, results) {
  if (depth === 5) {
    //숫자 5개를 다 뽑았으면
    results.push([...current]); // 현재 조합을 복사해서 저장
    return; //더 이상 진행하지 않고 종료
  }

  for (let i = start + 1; i <= n; i++) {
    //다음 숫자 후보 탐색
    current.push(i); //숫자 하나 추가
    dfs(i, depth + 1, n, current, results); //다음 단계 재귀 호출
  }
}

// 두 배열이 몇 개 겹치는지 세는 함수
function countMatch(arr, query) {
  let count = 0; //겹치는 숫자 개수 저장

  for (let i = 0; i < arr.length; i++) {
    //후보 조합 반복
    for (let j = 0; j < query.length; j++) {
      //질문 배열 반복
      if (arr[i] === query[j]) {
        //숫자가 같으면
        count++; //겹치는 개수 증가
      }
    }
  }

  return count; //총 겹치는 개수 반환
}

// 최종 실행 함수
function solution(n, q, ans) {
  let combinations = generateCombinations(n); //가능한 모든 조합 생성

  for (let i = 0; i < q.length; i++) {
    //모든 질문에 대한 반복
    combinations = combinations.filter(function (arr) {
      //조건 맞는 조합만 남김
      return countMatch(arr, q[i]) === ans[i]; //겹치는 개수가 정답과 같으면 통과
    });
  }

  return combinations.length; //남은 조합 개수 반환
}
