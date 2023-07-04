fetch('http://13.125.111.160:8000/dbTest')
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('요청 실패');
    }
  })
  .then(function(data) {
    // 응답 데이터 처리
    console.log(data)
    //[{"information":"ddddd","id":1},{"information":"a","id":2},
    //{"information":"b","id":3},{"information":"c","id":4},
    //{"information":"d","id":5}]
    console.log(data[0]);
    
  })
  .catch(function(error) {
    console.error(error);
  });
