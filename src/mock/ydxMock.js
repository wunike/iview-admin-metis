
export const ydxMock = function (Mock) {
  // Mock.mock('/spoc-jw/a/ws/jw/jwClassCourse/listPage', 'post', {
  //   "status": "success", "statusCode": 200, "message": "获取课程包列表成功", "location": null,
  //   // "data":{"pageNum":1,"pageSize":10,"size":10,"startRow":1,"endRow":10,"total":29,"pages":3,"list":[{"id":"00b62963fd634b2993dcef496c7fc259","name":"CRT11111大师大多所","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12,16","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp1","gradeLabel":"LWP1","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"0184cd064a1d4127ab6f6f5bf5e81849","name":"夏令营-2","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12,14","officeNames":"上海松江校区、上海浦东塘桥校区","type":"summer camp","typeLabel":"夏令营","grade":"summer rising athena","gradeLabel":"Rising Athena","status":"0","saleEndDate":"2019-06-19","indate":"12"},{"id":"073e9d81ea194372b30f9fe973b47bd9","name":"CRT49","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp3","gradeLabel":"LWP3","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"160aef5abdc74798bdd4d63fd26f2223","name":"CRT21","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp3","gradeLabel":"LWP3","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"22b6d081a36a420cb2e1138dd9ee9c06","name":"CRT75","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp3","gradeLabel":"LWP3","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"3791eb368ed845058114342852e66178","name":"CRT100-副本","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",3,12,14","officeNames":"深圳华侨城校区1、上海松江校区、上海浦东塘桥校区","type":"ggr","typeLabel":"GGR","grade":"2a","gradeLabel":"2A","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"400ac7692e0f42458c94ef8b92e60323","name":"CRT53","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp3","gradeLabel":"LWP3","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"433a8c0b9e0949b5924cac45d0d175bf","name":"夏令营-1","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12,13,14","officeNames":"上海松江校区、上海静安校区、上海浦东塘桥校区","type":"summer camp","typeLabel":"夏令营","grade":"summer rising athena","gradeLabel":"Rising Athena","status":"0","saleEndDate":"2019-04-28","indate":"12"},{"id":"6027f0d10913441e8193d70415e3d4fd","name":"CRT57","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",3,7","officeNames":"深圳华侨城校区1、宁波鄞州校区","type":"ee","typeLabel":"EE","grade":"ee3","gradeLabel":"EE3","status":"1","saleEndDate":"2019-06-30","indate":"4"},{"id":"63726ad259c2488583751e46675f8727","name":"CRT65","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp3","gradeLabel":"LWP3","status":"1","saleEndDate":"2019-06-30","indate":"12"}],"prePage":0,"nextPage":2,"isFirstPage":true,"isLastPage":false,"hasPreviousPage":false,"hasNextPage":true,"navigatePages":8,"navigatepageNums":[1,2,3],"navigateFirstPage":1,"navigateLastPage":3,"firstPage":1,"lastPage":3}
  //   "data": {
  //     "endRow": 0,
  //     "firstPage": 0,
  //     "hasNextPage": true,
  //     "hasPreviousPage": true,
  //     "isFirstPage": true,
  //     "isLastPage": true,
  //     "lastPage": 0,
  //     "list": [
  //       {
  //         "arrangeDate": "",
  //         "arrangerName": "昂",
  //         "assistName": "奥迪",
  //         "beginDate": "2018-1-1",
  //         "classProgress": "1",
  //         "classTeacherName": "1",
  //         "classroomName": "1",
  //         "courseName": "好学英语",
  //         "grade": "3年级",
  //         "gradeType": "类型1",
  //         "id": "1212",
  //         "lessonProgress": "111",
  //         "memberRatio": "11",
  //         "name": "武松1",
  //         "officeName": "教室201",
  //         "attendanceFlag": "0",
  //         "status": "ready",
  //         "teacherName": "王刚"
  //       },
  //       {
  //         "arrangeDate": "sdf",
  //         "arrangerName": "sdd",
  //         "assistName": "dd",
  //         "beginDate": "2019-1-10",
  //         "classProgress": "1",
  //         "classTeacherName": "1",
  //         "classroomName": "sdf",
  //         "courseName": "dsf",
  //         "grade": "2",
  //         "gradeType": "111",
  //         "id": "1212",
  //         "lessonProgress": "1",
  //         "memberRatio": "1",
  //         "name": "1",
  //         "officeName": "1",
  //         "attendanceFlag": "1",
  //         "status": "doing",
  //         "teacherName": "1"
  //       },
  //       {
  //         "arrangeDate": "sdf",
  //         "arrangerName": "sdd",
  //         "assistName": "dd",
  //         "beginDate": "2019-1-10",
  //         "classProgress": "1",
  //         "classTeacherName": "1",
  //         "classroomName": "sdf",
  //         "courseName": "dsf",
  //         "grade": "2",
  //         "gradeType": "111",
  //         "id": "1212",
  //         "lessonProgress": "1",
  //         "memberRatio": "1",
  //         "name": "1",
  //         "officeName": "1",
  //         "attendanceFlag": "1",
  //         "status": "finish",
  //         "teacherName": "1"
  //       },
  //       {
  //         "arrangeDate": "sdf",
  //         "arrangerName": "sdd",
  //         "assistName": "dd",
  //         "beginDate": "2019-1-10",
  //         "classProgress": "1",
  //         "classTeacherName": "1",
  //         "classroomName": "sdf",
  //         "courseName": "dsf",
  //         "grade": "2",
  //         "gradeType": "111",
  //         "id": "1212",
  //         "lessonProgress": "1",
  //         "memberRatio": "1",
  //         "name": "1",
  //         "officeName": "1",
  //         "attendanceFlag": "1",
  //         "status": "lose",
  //         "teacherName": "1"
  //       }
  //     ],
  //     "navigateFirstPage": 0,
  //     "navigateLastPage": 0,
  //     "navigatePages": 0,
  //     "navigatepageNums": [],
  //     "nextPage": 0,
  //     "pageNum": 0,
  //     "pageSize": 0,
  //     "pages": 0,
  //     "prePage": 0,
  //     "size": 0,
  //     "startRow": 0,
  //     "total": 0
  //   },
  //   "location": "",
  //   "message": "",
  //   // "status": "",
  //   "statusCode": 0
  // });
/*   Mock.mock('/spoc-jw/a/ws/jw/jwClassShare/listPage', 'get', {
    "status": "success", "statusCode": 200, "message": "获取课程包列表成功", "location": null,
    // "data":{"pageNum":1,"pageSize":10,"size":10,"startRow":1,"endRow":10,"total":29,"pages":3,"list":[{"id":"00b62963fd634b2993dcef496c7fc259","name":"CRT11111大师大多所","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12,16","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp1","gradeLabel":"LWP1","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"0184cd064a1d4127ab6f6f5bf5e81849","name":"夏令营-2","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12,14","officeNames":"上海松江校区、上海浦东塘桥校区","type":"summer camp","typeLabel":"夏令营","grade":"summer rising athena","gradeLabel":"Rising Athena","status":"0","saleEndDate":"2019-06-19","indate":"12"},{"id":"073e9d81ea194372b30f9fe973b47bd9","name":"CRT49","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp3","gradeLabel":"LWP3","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"160aef5abdc74798bdd4d63fd26f2223","name":"CRT21","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp3","gradeLabel":"LWP3","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"22b6d081a36a420cb2e1138dd9ee9c06","name":"CRT75","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp3","gradeLabel":"LWP3","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"3791eb368ed845058114342852e66178","name":"CRT100-副本","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",3,12,14","officeNames":"深圳华侨城校区1、上海松江校区、上海浦东塘桥校区","type":"ggr","typeLabel":"GGR","grade":"2a","gradeLabel":"2A","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"400ac7692e0f42458c94ef8b92e60323","name":"CRT53","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp3","gradeLabel":"LWP3","status":"1","saleEndDate":"2019-06-30","indate":"12"},{"id":"433a8c0b9e0949b5924cac45d0d175bf","name":"夏令营-1","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12,13,14","officeNames":"上海松江校区、上海静安校区、上海浦东塘桥校区","type":"summer camp","typeLabel":"夏令营","grade":"summer rising athena","gradeLabel":"Rising Athena","status":"0","saleEndDate":"2019-04-28","indate":"12"},{"id":"6027f0d10913441e8193d70415e3d4fd","name":"CRT57","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",3,7","officeNames":"深圳华侨城校区1、宁波鄞州校区","type":"ee","typeLabel":"EE","grade":"ee3","gradeLabel":"EE3","status":"1","saleEndDate":"2019-06-30","indate":"4"},{"id":"63726ad259c2488583751e46675f8727","name":"CRT65","officeId":"1","officeName":"Athena Academy知慧学院","officeIds":",12","officeNames":"上海松江校区","type":"lwp","typeLabel":"LWP","grade":"lwp3","gradeLabel":"LWP3","status":"1","saleEndDate":"2019-06-30","indate":"12"}],"prePage":0,"nextPage":2,"isFirstPage":true,"isLastPage":false,"hasPreviousPage":false,"hasNextPage":true,"navigatePages":8,"navigatepageNums":[1,2,3],"navigateFirstPage":1,"navigateLastPage":3,"firstPage":1,"lastPage":3}
    "data": {
      "endRow": 0,
      "firstPage": 0,
      "hasNextPage": true,
      "hasPreviousPage": true,
      "isFirstPage": true,
      "isLastPage": true,
      "lastPage": 0,
      "list": [
        {
          "arrangeDate": "",
          "arrangerName": "昂",
          "assistName": "奥迪",
          "beginDate": "2018-1-1",
          "classProgress": "1",
          "classTeacherName": "1",
          "classroomName": "1",
          "courseName": "好学英语",
          "grade": "3年级",
          "gradeType": "类型1",
          "id": "1212",
          "lessonProgress": "111",
          "memberRatio": "11",
          "name": "武松",
          "officeName": "教室201",
          "attendanceFlag": "0",
          "status": "1",
          "joinStatus": "111",
          "teacherName": "王刚"
        },
        {
          "arrangeDate": "sdf",
          "arrangerName": "sdd",
          "assistName": "dd",
          "beginDate": "2019-1-10",
          "classProgress": "1",
          "classTeacherName": "1",
          "classroomName": "sdf",
          "courseName": "dsf",
          "grade": "2",
          "gradeType": "111",
          "id": "1212",
          "lessonProgress": "1",
          "memberRatio": "1",
          "name": "1",
          "officeName": "1",
          "attendanceFlag": "1",
          "status": "2",
          "joinStatus": "121",
          "teacherName": "1"
        }
      ],
      "navigateFirstPage": 0,
      "navigateLastPage": 0,
      "navigatePages": 0,
      "navigatepageNums": [],
      "nextPage": 0,
      "pageNum": 0,
      "pageSize": 0,
      "pages": 0,
      "prePage": 0,
      "size": 0,
      "startRow": 0,
      "total": 0
    },
    "location": "",
    "message": "",
    // "status": "",
    "statusCode": 0
  }); */
  /* 
     ClassData: {
        classTeacherName: "", //服务OO
        teacherName: "", //授课老师
        assistName: "", //助教
        grade: "", //年级
        memberCount: "", //满课人数
        actualMemberCount: "", //已报人数
        name: "", //课程名字
        arrangedHour: "", //已排课时
        attendanceHour: "", //已考勤课时
        startDate: "", //上课时间
        type: "", //课程分类：关联字典表：jw_course_type
        jwCourse: {
          status: ""
        }
      }, */
  /* Mock.mock('/spoc-jw/a/ws/jw/jwClassCourse/form?id=1212', 'get', {
    "status": "success", "statusCode": 200, "message": "获取课程包列表成功", "location": null,
    "data": {
      "actualMemberCount": "1",
      "allocType": "",
      "arrangedHour": "99",
      "assistId": "",
      "assistName": "小刚",
      "attendanceHour": "55",
      "beginDate": "",
      "classTeacherId": "",
      "classTeacherName": "小红帽",
      "classroomId": "",
      "courseHour": "100",
      "courseId": "",
      "courseUnitHour": "",
      "courseUnitMinute": "",
      "createDate": "",
      "endDate": "",
      "finishCourseHour": "15",
      "grade": "2年级",
      "id": "",
      "isShare": "",
      "jwClassShareList": [
        {
          "classId": "asdsad",
          "classTeacherId": "",
          "createDate": "",
          "id": "",
          "isJoin": "",
          "office": {
            "address": "",
            "belongType": "",
            "belongTypeName": "",
            "childDeptList": [],
            "city": {
              "areaCode": "",
              "code": "",
              "createDate": "",
              "enName": "",
              "id": "",
              "level": "",
              "name": "",
              "pId": "",
              "pIds": "",
              "remarks": "",
              "typeLevel": "",
              "updateDate": ""
            },
            "cityLevel": "",
            "code": "",
            "createDate": "",
            "cutName": "",
            "email": "",
            "fax": "",
            "grade": "",
            "grades": "",
            "id": "",
            "isUs": "",
            "latitude": "",
            "longitude": "",
            "master": "",
            "name": "",
            "parent": {},
            "parentId": "",
            "parentIds": "",
            "parentName": "",
            "phone": "",
            "province": {
              "areaCode": "",
              "code": "",
              "createDate": "",
              "enName": "",
              "id": "",
              "level": "",
              "name": "",
              "pId": "",
              "pIds": "",
              "remarks": "",
              "typeLevel": "",
              "updateDate": ""
            },
            "region": {
              "areaCode": "",
              "code": "",
              "createDate": "",
              "enName": "",
              "id": "",
              "level": "",
              "name": "",
              "pId": "",
              "pIds": "",
              "remarks": "",
              "typeLevel": "",
              "updateDate": ""
            },
            "remarks": "",
            "sort": 0,
            "type": "150课时课程",
            "typeName": "",
            "types": "",
            "updateDate": "",
            "useable": "",
            "xqIds": "",
            "zipCode": ""
          },
          "remarks": "",
          "updateDate": ""
        }
      ],
      "jwCourse": {
        "addYhzcIdList": [],
        "createDate": "",
        "delYhzcIdList": [],
        "grade": "",
        "id": "",
        "indate": "",
        "isDelayed": "",
        "jwProductPriceList": [
          {
            "createDate": "",
            "discountAmount": "",
            "duration": "",
            "endTime": "",
            "groupPrice": "",
            "id": "",
            "indate": "",
            "itemId": "",
            "num": "",
            "officeId": "",
            "officeName": "",
            "price": "",
            "remarks": "",
            "singleNum": "",
            "startTime": "",
            "totalPrice": "",
            "updateDate": ""
          }
        ],
        "name": "",
        "officeId": "",
        "officeIds": "",
        "remarks": "",
        "saleEndDate": "",
        "saleStartDate": "",
        "status": "已开课",
        "type": "150课时课程",
        "updateDate": "",
        "yhzcIds": ""
      },
      "memberCount": 12,
      "name": "SH03GGR3B-190125A",
      "office": {},
      "regular": "",
      "regularJson": "",
      "remarks": "",
      "startDate": "2018-1-1",
      "teacherId": "",
      "teacherName": "张泽涛",
      "updateDate": ""
    },
    "location": "",
    "message": "",
    // "status": "",
    "statusCode": 0
  }); */
 /*  Mock.mock('/spoc-jw/a/ws/jw/jwClassCourse/listPageClassStudent?pageNo=1&pageSize=10', 'get', {
    "status": "success", "statusCode": 200, "message": "获取课程包列表成功", "location": null,
    "data": {
      "endRow": 0,
      "firstPage": 0,
      "hasNextPage": true,
      "hasPreviousPage": true,
      "isFirstPage": true,
      "isLastPage": true,
      "lastPage": 0,
      "list": [
        {
          "age": "121",
          "deductHoursRatio": "23123",
          "entryDate": "2019-10-10",
          "expiredDate": "2019-11-10",
          "grade": "3",
          "id": "33大神",
          "officeName": "33",
          "phone": "33",
          "remainCourseHour": 0,
          "schoolName": "33",
          "startDate": "2019-10-01",
          "status": "1",
          "studentCourseId": "1",
          "studentId": "1",
          "studentName": "1"
        },
        {
          "age": "121",
          "deductHoursRatio": "23123",
          "entryDate": "2019-10-10",
          "expiredDate": "2019-11-10",
          "grade": "3",
          "id": "33",
          "officeName": "33",
          "phone": "33",
          "remainCourseHour": 0,
          "schoolName": "33",
          "startDate": "2019-10-09",
          "status": "1",
          "studentCourseId": "1",
          "studentId": "1",
          "studentName": "1"
        },
      ],
      "navigateFirstPage": 0,
      "navigateLastPage": 0,
      "navigatePages": 0,
      "navigatepageNums": [],
      "nextPage": 0,
      "pageNum": 0,
      "pageSize": 0,
      "pages": 0,
      "prePage": 0,
      "size": 0,
      "startRow": 0,
      "total": 10
    },
    "location": "",
    "message": "",
    // "status": "",
    "statusCode": 0
  }); */
 /*  Mock.mock('/spoc-jw/a/ws/jw/jwClassCourse/listPageClassStudent', 'get', {
    "status": "success", "statusCode": 200, "message": "获取课程包列表成功", "location": null,
    "data": {
      "endRow": 0,
      "firstPage": 0,
      "hasNextPage": true,
      "hasPreviousPage": true,
      "isFirstPage": true,
      "isLastPage": true,
      "lastPage": 0,
      "list": [
        {
          "age": "12",
          "classId": "12",
          "deductHoursRatio": "1",
          "entryDate": "1",
          "expiredDate": "1",
          "grade": "1",
          "id": "111",
          "officeName": "111",
          "phone": "11",
          "remainCourseHour": 10,
          "schoolName": "我",
          "startDate": "2018-10-09",
          "status": 1,
          "studentCourseId": "1",
          "studentId": "姓名1",
          "studentName": "姓名1"
        },
        {
          "age": "12",
          "classId": "12",
          "deductHoursRatio": "1",
          "entryDate": "1",
          "expiredDate": "1",
          "grade": "1",
          "id": "111",
          "officeName": "111",
          "phone": "11",
          "remainCourseHour": 10,
          "schoolName": "我",
          "startDate": "2019-10-11",
          "status": 0,
          "studentCourseId": "1",
          "studentId": "姓名2",
          "studentName":'姓名2'
        },
      ],
      "navigateFirstPage": 0,
      "navigateLastPage": 0,
      "navigatePages": 0,
      "navigatepageNums": [],
      "nextPage": 0,
      "pageNum": 0,
      "pageSize": 0,
      "pages": 0,
      "prePage": 0,
      "size": 0,
      "startRow": 0,
      "total": 0
    },
    "location": "",
    "message": "",
    // "status": "200",
    "statusCode": 0
  }); */
  /* Mock.mock('/spoc-jw/a/ws/common/student/comStudentCourseRel/listPage', 'get', {
    "status": "success", "statusCode": 200, "message": "获取课程包列表成功", "location": null,
    "data": {
      "endRow": 0,
      "firstPage": 0,
      "hasNextPage": true,
      "hasPreviousPage": true,
      "isFirstPage": true,
      "isLastPage": true,
      "lastPage": 0,
      "list": [
        {
          "courseId": "sdf",
          "courseName": "sdfa",
          "id": "sdfsd",
          "name": "sdffd111",
          "remainCourseHour": 10,
          "studentId": "sfsadf111"
        },
        {
          "courseId": "sdf",
          "courseName": "sdfa",
          "id": "sdfsd",
          "name": "sdffdww2222",
          "remainCourseHour": 10,
          "studentId": "sfsadf222"
        },
      ],
      "navigateFirstPage": 0,
      "navigateLastPage": 0,
      "navigatePages": 0,
      "navigatepageNums": [],
      "nextPage": 0,
      "pageNum": 0,
      "pageSize": 0,
      "pages": 0,
      "prePage": 0,
      "size": 0,
      "startRow": 0,
      "total": 0
    },
    "location": "",
    "message": "",
    // "status": "",
    "statusCode": 0
  }); */
 
}

