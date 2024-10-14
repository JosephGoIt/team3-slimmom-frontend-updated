export const getProfileUser = state => state.profile?.user;
export const getProfileLoading = state => state.profile.isLoading;
export const getProfileError = state => state.profile.error;
export const getDailyCalorie = state =>
  state.profile?.user?.data?.dailyCalories;