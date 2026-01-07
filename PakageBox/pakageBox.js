function solution(n, w, num) {
  let res = 1;
  const total = Math.ceil(n / w); //총 몇층인지
  const target = Math.ceil(num / w); //상자가 몇 번째 줄에 있는지
  const nRemain = n % w || n; // 마지막 줄에 남아있는 상자 개수
  const numRemain = num % w || num; // num이 줄에서 서 있는 위치

  if (total % 2 === target % 2 && nRemain < numRemain) res -= 1;
  if (total % 2 !== target % 2 && nRemain + numRemain <= w) res -= 1;

  return total - target + res;
}
