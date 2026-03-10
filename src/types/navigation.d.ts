export type RootParamList = {
  home: undefined
  login: undefined
  register: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList {}
  }
}