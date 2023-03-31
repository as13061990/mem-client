enum routes {
  LOADING = 'loading',
  INTROFIRST = 'introfirst',
  INTROSECOND = 'introsecond',
  HOME = 'home',
  RATING = 'rating',
  MYPROFILE = 'myprofile',
  USERPROFILE = 'userprofile',
  ADMIN = 'admin',
  RULES = 'rules'
}
enum modals {
  RULES = 'rules',
  REPORT = 'report',
  REPORTINFO = 'reportinfo'
}
enum upload {
  INPUT,
  BUTTONS,
  LOADING,
  FINISH,
  ERROR,
  AD
}
enum memes {
  TIME = 1,
  TOP_ALL = 2,
  TOP_WEEK = 3,
  TOP_DAY = 4,
  FAVORITE = 5,
  MY = 6
}
enum ratings {
  TOP_ALL = 1,
  TOP_WEEK = 2,
}
enum admins {
  MEMES = 1,
  USERS = 2,
  COMMENTS = 3
}
enum load {
  LAZY,
  LOADING,
  END
}
enum reports {
  SPAM = 1,
  VIOLENCE = 2,
  SCAM = 3,
  FORBIDDEN = 4,
  PORNO = 5,
}

export {
  routes,
  upload,
  memes,
  ratings,
  modals,
  load,
  admins,
  reports
}