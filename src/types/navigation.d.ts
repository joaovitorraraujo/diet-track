export type RootParamList = {
  home: undefined
  login: undefined
  register: undefined
  meta: undefined
  alimentos: undefined
  dieta: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList {}
  }
}