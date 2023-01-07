enum routes {
  LOADING = 'loading',
  INTRO = 'intro',
  HOME = 'home',
  RATING = 'rating',
  PROFILE = 'profile',
  ADMIN = 'admin'
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
  MODERATION = 0,
  TIME = 1,
  TOP_ALL = 2,
  TOP_WEEK = 3,
  TOP_DAY= 4
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
  load
}