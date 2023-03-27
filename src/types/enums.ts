enum routes {
  LOADING = 'loading',
  INTRO = 'intro',
  HOME = 'home',
  RATING = 'rating',
  PROFILE = 'profile',
  ADMIN = 'admin',
  RULES = 'rules'
}
enum modals {
  RULES = 'rules',
  REPORT = 'report'
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
enum load {
  LAZY,
  LOADING,
  END
}

export {
  routes,
  upload,
  memes,
  ratings,
  modals,
  load
}