// incSuffix는 받은 문자열의 뒤의 숫자나 문자를 하나 올려 반환한다.
//
// 숫자의 경우 패딩은 유지되고 패딩이 없을때는 그냥 올린다.
// 문자의 경우는 마지막 글자만 검사해 하나 올리고,
// z는 a로 Z는 A로 변환된다.
//
// 예)
//
//   A001 => A002
//   A009 => A010
//   A099 => A100
//   A999 => A1000
//   D31c => D31d
//   1A => 1B
//   1Z => 1A
//
// 마지막 1Z 가 2A가 되는것이 아니라는 것에 주의.
export function incSuffix(s) {
  if (s == "") {
    return s
  }
  if (isNaN(parseInt(s[s.length-1]))) {
    return incAlphabet(s);
  }
  return incNumber(s);
}

function incAlphabet(s) {
  if (s == "") {
    return s
  }
  var newLast = "";
  var last = s[s.length-1];
  if (last.match(/^[A-Z]$/i)) {
    if (last == "z") {
      newLast = "a";
    } else if (last == "Z") {
      newLast = "A";
    } else {
      newLast = String.fromCharCode(last.charCodeAt(0)+1);
    }
    return s.slice(0, s.length-1) + newLast;
  }
  return s;
}

function incNumber(s) {
  var m = s.match(/^(.*?)(\d+)$/);
  var pre = m[1];
  var post = m[2];
  var incPost = String(parseInt(post)+1);
  var padZero = "0".repeat(Math.max(post.length - incPost.length, 0));
  return pre + padZero + incPost;
}

